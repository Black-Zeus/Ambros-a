import * as FileSystem from 'expo-file-system';
import { DatabaseService } from './DatabaseService';

interface Migration {
  version: string;
  description: string;
  features: string[];
  dependencies: string[];
  executed: boolean;
}

interface MigrationRegistry {
  currentVersion: string;
  installedVersion: string;
  migrations: Migration[];
}

/**
 * MigrationService - Gestor de migraciones y evolución de BD
 * 
 * Responsabilidades:
 * - Ejecutar migraciones pendientes
 * - Migrar a versión específica
 * - Gestionar dependencias entre versiones
 * - Validar rutas de migración
 * - Rollback (opcional)
 * - Tracking de migraciones ejecutadas
 */
export class MigrationService {
  private static readonly REGISTRY_PATH = 'database/migrations/migration-registry.json';
  private static readonly MIGRATIONS_DIR = 'database/migrations';

  /**
   * Ejecutar todas las migraciones pendientes
   */
  static async runPendingMigrations(): Promise<void> {
    try {
      console.log('🔄 Verificando migraciones pendientes...');
      
      const registry = await this.loadMigrationRegistry();
      const currentDbVersion = await DatabaseService.getVersion();
      
      // Encontrar migraciones pendientes
      const pendingMigrations = this.findPendingMigrations(registry, currentDbVersion);
      
      if (pendingMigrations.length === 0) {
        console.log('✅ No hay migraciones pendientes');
        return;
      }
      
      console.log(`📋 ${pendingMigrations.length} migraciones pendientes encontradas`);
      
      // Ejecutar migraciones en orden
      for (const migration of pendingMigrations) {
        await this.executeMigration(migration);
        await this.markMigrationAsExecuted(migration.version);
      }
      
      // Actualizar versión instalada
      await DatabaseService.setVersion(registry.currentVersion);
      await this.updateInstalledVersion(registry.currentVersion);
      
      console.log(`✅ Migraciones completadas - BD actualizada a v${registry.currentVersion}`);
    } catch (error) {
      console.error('❌ Error al ejecutar migraciones pendientes:', error);
      throw error;
    }
  }

  /**
   * Migrar a una versión específica
   */
  static async migrateToVersion(targetVersion: string): Promise<void> {
    try {
      console.log(`🎯 Migrando a versión ${targetVersion}...`);
      
      const registry = await this.loadMigrationRegistry();
      const currentDbVersion = await DatabaseService.getVersion();
      
      // Validar que la versión objetivo existe
      const targetMigration = registry.migrations.find(m => m.version === targetVersion);
      if (!targetMigration) {
        throw new Error(`Versión ${targetVersion} no encontrada en registry`);
      }
      
      // Encontrar ruta de migración
      const migrationPath = this.findMigrationPath(registry, currentDbVersion, targetVersion);
      
      if (migrationPath.length === 0) {
        console.log(`✅ BD ya está en versión ${targetVersion}`);
        return;
      }
      
      console.log(`📋 Ejecutando ${migrationPath.length} migraciones hasta v${targetVersion}`);
      
      // Ejecutar migraciones en secuencia
      for (const migration of migrationPath) {
        await this.executeMigration(migration);
        await this.markMigrationAsExecuted(migration.version);
      }
      
      // Actualizar versión
      await DatabaseService.setVersion(targetVersion);
      await this.updateInstalledVersion(targetVersion);
      
      console.log(`✅ Migración completada a v${targetVersion}`);
    } catch (error) {
      console.error(`❌ Error al migrar a v${targetVersion}:`, error);
      throw error;
    }
  }

  /**
   * Obtener versión actual de la BD
   */
  static async getCurrentVersion(): Promise<string> {
    return await DatabaseService.getVersion();
  }

  /**
   * Obtener lista de migraciones pendientes
   */
  static async getPendingMigrations(): Promise<Migration[]> {
    try {
      const registry = await this.loadMigrationRegistry();
      const currentDbVersion = await DatabaseService.getVersion();
      
      return this.findPendingMigrations(registry, currentDbVersion);
    } catch (error) {
      console.error('❌ Error al obtener migraciones pendientes:', error);
      return [];
    }
  }

  /**
   * Obtener información completa de migraciones
   */
  static async getMigrationInfo(): Promise<{
    currentVersion: string;
    latestVersion: string;
    pendingCount: number;
    migrations: Migration[];
  }> {
    try {
      const registry = await this.loadMigrationRegistry();
      const currentVersion = await DatabaseService.getVersion();
      const pendingMigrations = this.findPendingMigrations(registry, currentVersion);
      
      return {
        currentVersion,
        latestVersion: registry.currentVersion,
        pendingCount: pendingMigrations.length,
        migrations: registry.migrations
      };
    } catch (error) {
      console.error('❌ Error al obtener info de migraciones:', error);
      throw error;
    }
  }

  /**
   * Ejecutar una migración individual
   */
  static async executeMigration(migration: Migration): Promise<void> {
    try {
      console.log(`🔄 Ejecutando migración ${migration.version}...`);
      console.log(`📝 ${migration.description}`);
      
      // Verificar dependencias
      const dependenciesMet = await this.checkDependencies(migration.dependencies);
      if (!dependenciesMet) {
        throw new Error(`Dependencias no cumplidas para migración ${migration.version}`);
      }
      
      // Leer archivos SQL de la migración
      const migrationFiles = await this.getMigrationFiles(migration.version);
      
      if (migrationFiles.length === 0) {
        console.log(`⚠️ No se encontraron archivos SQL para migración ${migration.version}`);
        return;
      }
      
      // Ejecutar archivos en orden alfabético
      for (const file of migrationFiles) {
        console.log(`  📄 Ejecutando ${file}...`);
        await this.executeMigrationFile(migration.version, file);
      }
      
      console.log(`✅ Migración ${migration.version} completada`);
    } catch (error) {
      console.error(`❌ Error en migración ${migration.version}:`, error);
      throw error;
    }
  }

  /**
   * Validar ruta de migración
   */
  static async validateMigrationPath(fromVersion: string, toVersion: string): Promise<boolean> {
    try {
      const registry = await this.loadMigrationRegistry();
      const path = this.findMigrationPath(registry, fromVersion, toVersion);
      return path.length > 0 || fromVersion === toVersion;
    } catch (error) {
      console.error('❌ Error al validar ruta de migración:', error);
      return false;
    }
  }

  /**
   * Rollback a versión anterior (funcionalidad básica)
   */
  static async rollbackToVersion(targetVersion: string): Promise<void> {
    try {
      console.log(`⏪ Rollback a versión ${targetVersion}...`);
      console.log('⚠️ ADVERTENCIA: Esta operación puede causar pérdida de datos');
      
      // Por ahora, rollback simple: recrear BD en versión objetivo
      await DatabaseService.reset();
      
      // Crear BD base y migrar hasta versión objetivo
      const { SchemaService } = await import('./SchemaService');
      await SchemaService.createBase();
      
      if (targetVersion !== '1.0.0') {
        await this.migrateToVersion(targetVersion);
      }
      
      console.log(`✅ Rollback completado a v${targetVersion}`);
      console.log('⚠️ Nota: Datos de usuario perdidos - considere restaurar desde backup');
    } catch (error) {
      console.error(`❌ Error en rollback a v${targetVersion}:`, error);
      throw error;
    }
  }

  /**
   * Cargar registry de migraciones
   */
  private static async loadMigrationRegistry(): Promise<MigrationRegistry> {
    try {
      const registryPath = FileSystem.bundleDirectory + this.REGISTRY_PATH;
      const registryContent = await FileSystem.readAsStringAsync(registryPath);
      return JSON.parse(registryContent);
    } catch (error) {
      console.error('❌ Error al cargar migration registry:', error);
      throw error;
    }
  }

  /**
   * Actualizar versión instalada en registry
   */
  private static async updateInstalledVersion(version: string): Promise<void> {
    try {
      // En una implementación real, esto actualizaría el archivo registry
      // Por ahora solo almacenamos en metadata de BD
      const db = await DatabaseService.getInstance();
      await db.runAsync(
        'INSERT OR REPLACE INTO app_metadata (key, value) VALUES (?, ?)',
        ['installed_version', version]
      );
    } catch (error) {
      console.error('❌ Error al actualizar versión instalada:', error);
      throw error;
    }
  }

  /**
   * Marcar migración como ejecutada
   */
  private static async markMigrationAsExecuted(version: string): Promise<void> {
    try {
      const db = await DatabaseService.getInstance();
      await db.runAsync(
        'INSERT OR REPLACE INTO app_metadata (key, value) VALUES (?, ?)',
        [`migration_${version}_executed`, 'true']
      );
      
      console.log(`✅ Migración ${version} marcada como ejecutada`);
    } catch (error) {
      console.error(`❌ Error al marcar migración ${version} como ejecutada:`, error);
      throw error;
    }
  }

  /**
   * Verificar si una migración ya fue ejecutada
   */
  private static async isMigrationExecuted(version: string): Promise<boolean> {
    try {
      const db = await DatabaseService.getInstance();
      const result = await db.getFirstAsync<{ value: string }>(
        'SELECT value FROM app_metadata WHERE key = ?',
        [`migration_${version}_executed`]
      );
      return result?.value === 'true';
    } catch (error) {
      console.error(`❌ Error al verificar ejecución de migración ${version}:`, error);
      return false;
    }
  }

  /**
   * Encontrar migraciones pendientes
   */
  private static findPendingMigrations(registry: MigrationRegistry, currentVersion: string): Migration[] {
    const pendingMigrations: Migration[] = [];
    
    for (const migration of registry.migrations) {
      // Saltar migraciones anteriores o iguales a la versión actual
      if (this.compareVersions(migration.version, currentVersion) <= 0) {
        continue;
      }
      
      // Verificar dependencias
      const dependenciesMet = migration.dependencies.every(dep => 
        this.compareVersions(dep, currentVersion) <= 0
      );
      
      if (dependenciesMet) {
        pendingMigrations.push(migration);
      }
    }
    
    // Ordenar por versión
    return pendingMigrations.sort((a, b) => this.compareVersions(a.version, b.version));
  }

  /**
   * Encontrar ruta de migración entre dos versiones
   */
  private static findMigrationPath(registry: MigrationRegistry, fromVersion: string, toVersion: string): Migration[] {
    const path: Migration[] = [];
    
    for (const migration of registry.migrations) {
      // Solo incluir migraciones entre fromVersion y toVersion
      if (this.compareVersions(migration.version, fromVersion) > 0 && 
          this.compareVersions(migration.version, toVersion) <= 0) {
        path.push(migration);
      }
    }
    
    // Ordenar por versión
    return path.sort((a, b) => this.compareVersions(a.version, b.version));
  }

  /**
   * Verificar dependencias de una migración
   */
  private static async checkDependencies(dependencies: string[]): Promise<boolean> {
    const currentVersion = await DatabaseService.getVersion();
    
    return dependencies.every(dep => {
      return this.compareVersions(dep, currentVersion) <= 0;
    });
  }

  /**
   * Obtener archivos SQL de una migración
   */
  private static async getMigrationFiles(version: string): Promise<string[]> {
    try {
      const migrationDir = `${this.MIGRATIONS_DIR}/v${version}`;
      const migrationPath = FileSystem.bundleDirectory + migrationDir;
      
      // Verificar si el directorio existe
      const dirInfo = await FileSystem.getInfoAsync(migrationPath);
      if (!dirInfo.exists) {
        console.log(`⚠️ Directorio de migración no existe: ${migrationDir}`);
        return [];
      }
      
      // Leer archivos del directorio
      const files = await FileSystem.readDirectoryAsync(migrationPath);
      
      // Filtrar solo archivos .sql y ordenar alfabéticamente
      const sqlFiles = files
        .filter(file => file.endsWith('.sql'))
        .sort();
      
      return sqlFiles;
    } catch (error) {
      console.error(`❌ Error al leer archivos de migración v${version}:`, error);
      return [];
    }
  }

  /**
   * Ejecutar un archivo de migración específico
   */
  private static async executeMigrationFile(version: string, filename: string): Promise<void> {
    try {
      const filePath = FileSystem.bundleDirectory + `${this.MIGRATIONS_DIR}/v${version}/${filename}`;
      const sqlContent = await FileSystem.readAsStringAsync(filePath);
      
      // Dividir en statements individuales (básico)
      const statements = sqlContent
        .split(';')
        .map(stmt => stmt.trim())
        .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));
      
      const db = await DatabaseService.getInstance();
      
      // Ejecutar cada statement
      for (const statement of statements) {
        if (statement.trim()) {
          await db.execAsync(statement + ';');
        }
      }
      
    } catch (error) {
      console.error(`❌ Error al ejecutar archivo ${filename}:`, error);
      throw error;
    }
  }

  /**
   * Comparar versiones semánticas (básico)
   * Retorna: -1 si a < b, 0 si a = b, 1 si a > b
   */
  private static compareVersions(a: string, b: string): number {
    const parseVersion = (version: string) => {
      return version.split('.').map(num => parseInt(num, 10));
    };
    
    const versionA = parseVersion(a);
    const versionB = parseVersion(b);
    
    for (let i = 0; i < Math.max(versionA.length, versionB.length); i++) {
      const numA = versionA[i] || 0;
      const numB = versionB[i] || 0;
      
      if (numA < numB) return -1;
      if (numA > numB) return 1;
    }
    
    return 0;
  }

  /**
   * Obtener changelog entre dos versiones
   */
  static async getChangelog(fromVersion: string, toVersion: string): Promise<string[]> {
    try {
      const registry = await this.loadMigrationRegistry();
      const migrationPath = this.findMigrationPath(registry, fromVersion, toVersion);
      
      const changelog: string[] = [];
      for (const migration of migrationPath) {
        changelog.push(`v${migration.version}: ${migration.description}`);
        migration.features.forEach(feature => {
          changelog.push(`  + ${feature}`);
        });
      }
      
      return changelog;
    } catch (error) {
      console.error('❌ Error al generar changelog:', error);
      return [];
    }
  }

  /**
   * Verificar integridad del sistema de migraciones
   */
  static async validateMigrationSystem(): Promise<{
    valid: boolean;
    issues: string[];
  }> {
    const issues: string[] = [];
    
    try {
      // Verificar que registry existe
      const registry = await this.loadMigrationRegistry();
      
      // Verificar que todas las migraciones tienen archivos
      for (const migration of registry.migrations) {
        const files = await this.getMigrationFiles(migration.version);
        if (files.length === 0) {
          issues.push(`Migración v${migration.version} no tiene archivos SQL`);
        }
      }
      
      // Verificar dependencias
      for (const migration of registry.migrations) {
        for (const dep of migration.dependencies) {
          const depExists = registry.migrations.some(m => m.version === dep);
          if (!depExists) {
            issues.push(`Migración v${migration.version} depende de v${dep} que no existe`);
          }
        }
      }
      
      return {
        valid: issues.length === 0,
        issues
      };
    } catch (error) {
      issues.push(`Error al validar sistema de migraciones: ${error}`);
      return {
        valid: false,
        issues
      };
    }
  }
}