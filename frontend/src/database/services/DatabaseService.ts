import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';
import { DATABASE_CONFIG } from '../config/database.config';

/**
 * DatabaseService - Gestor principal de conexión SQLite
 * 
 * Responsabilidades:
 * - Manejo de conexión singleton
 * - Inicialización de la aplicación
 * - Verificaciones básicas de BD
 * - Operaciones de desarrollo (reset, close)
 */
export class DatabaseService {
  private static instance: SQLite.SQLiteDatabase | null = null;
  private static readonly DB_NAME = DATABASE_CONFIG.name;
  private static readonly DB_PATH = `${FileSystem.documentDirectory}SQLite/${DatabaseService.DB_NAME}`;

  /**
   * Obtener instancia singleton de la base de datos
   */
  static async getInstance(): Promise<SQLite.SQLiteDatabase> {
    if (!this.instance) {
      await this.createConnection();
    }
    return this.instance!;
  }

  /**
   * Crear conexión a la base de datos
   */
  private static async createConnection(): Promise<void> {
    try {
      this.instance = await SQLite.openDatabaseAsync(this.DB_NAME);
      
      // Configurar opciones de SQLite
      await this.instance.execAsync('PRAGMA foreign_keys = ON;');
      await this.instance.execAsync('PRAGMA journal_mode = WAL;');
      
      console.log('✅ Conexión a base de datos establecida');
    } catch (error) {
      console.error('❌ Error al conectar con la base de datos:', error);
      throw error;
    }
  }

  /**
   * Inicializar la aplicación y base de datos
   */
  static async initialize(): Promise<void> {
    try {
      console.log('🔄 Inicializando base de datos...');
      
      // Verificar si la BD existe
      const exists = await this.exists();
      
      if (!exists) {
        console.log('📦 Primera instalación - creando base de datos...');
        // La lógica de creación se maneja en SchemaService
      } else {
        console.log('🔍 Base de datos existente - verificando migraciones...');
        // La lógica de migraciones se maneja en MigrationService
      }
      
      // Asegurar conexión
      await this.getInstance();
      
      console.log('✅ Base de datos inicializada correctamente');
    } catch (error) {
      console.error('❌ Error al inicializar base de datos:', error);
      throw error;
    }
  }

  /**
   * Verificar si la base de datos existe
   */
  static async exists(): Promise<boolean> {
    try {
      const fileInfo = await FileSystem.getInfoAsync(this.DB_PATH);
      return fileInfo.exists;
    } catch (error) {
      console.error('❌ Error al verificar existencia de BD:', error);
      return false;
    }
  }

  /**
   * Obtener versión actual de la base de datos
   */
  static async getVersion(): Promise<string> {
    try {
      const db = await this.getInstance();
      const result = await db.getFirstAsync<{ value: string }>(
        'SELECT value FROM app_metadata WHERE key = ?',
        ['schema_version']
      );
      return result?.value || '1.0.0';
    } catch (error) {
      console.error('❌ Error al obtener versión de BD:', error);
      return '1.0.0';
    }
  }

  /**
   * Establecer versión de la base de datos
   */
  static async setVersion(version: string): Promise<void> {
    try {
      const db = await this.getInstance();
      await db.runAsync(
        'INSERT OR REPLACE INTO app_metadata (key, value) VALUES (?, ?)',
        ['schema_version', version]
      );
      console.log(`✅ Versión de BD actualizada a: ${version}`);
    } catch (error) {
      console.error('❌ Error al establecer versión de BD:', error);
      throw error;
    }
  }

  /**
   * Ejecutar script SQL (para migraciones y schemas)
   */
  static async executeSQL(sql: string): Promise<void> {
    try {
      const db = await this.getInstance();
      await db.execAsync(sql);
    } catch (error) {
      console.error('❌ Error al ejecutar SQL:', error);
      throw error;
    }
  }

  /**
   * Verificar integridad de la base de datos
   */
  static async checkIntegrity(): Promise<boolean> {
    try {
      const db = await this.getInstance();
      const result = await db.getFirstAsync<{ integrity_check: string }>(
        'PRAGMA integrity_check'
      );
      return result?.integrity_check === 'ok';
    } catch (error) {
      console.error('❌ Error al verificar integridad:', error);
      return false;
    }
  }

  /**
   * Obtener información de la base de datos
   */
  static async getDatabaseInfo(): Promise<{
    version: string;
    size: number;
    tables: string[];
    integrity: boolean;
  }> {
    try {
      const db = await this.getInstance();
      
      // Obtener versión
      const version = await this.getVersion();
      
      // Obtener tamaño del archivo
      const fileInfo = await FileSystem.getInfoAsync(this.DB_PATH);
      const size = fileInfo.exists ? fileInfo.size || 0 : 0;
      
      // Obtener lista de tablas
      const tablesResult = await db.getAllAsync<{ name: string }>(
        "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
      );
      const tables = tablesResult.map(row => row.name);
      
      // Verificar integridad
      const integrity = await this.checkIntegrity();
      
      return {
        version,
        size,
        tables,
        integrity
      };
    } catch (error) {
      console.error('❌ Error al obtener info de BD:', error);
      throw error;
    }
  }

  /**
   * Cerrar conexión de la base de datos
   */
  static async close(): Promise<void> {
    try {
      if (this.instance) {
        await this.instance.closeAsync();
        this.instance = null;
        console.log('✅ Conexión de BD cerrada correctamente');
      }
    } catch (error) {
      console.error('❌ Error al cerrar conexión de BD:', error);
      throw error;
    }
  }

  /**
   * Resetear base de datos completamente (solo desarrollo)
   */
  static async reset(): Promise<void> {
    try {
      console.log('🔄 Reseteando base de datos...');
      
      // Cerrar conexión existente
      await this.close();
      
      // Eliminar archivo de BD
      const exists = await this.exists();
      if (exists) {
        await FileSystem.deleteAsync(this.DB_PATH);
        console.log('🗑️ Archivo de BD eliminado');
      }
      
      console.log('✅ Base de datos reseteada correctamente');
    } catch (error) {
      console.error('❌ Error al resetear BD:', error);
      throw error;
    }
  }

  /**
   * Crear tabla de metadata si no existe
   */
  static async ensureMetadataTable(): Promise<void> {
    try {
      const db = await this.getInstance();
      await db.execAsync(`
        CREATE TABLE IF NOT EXISTS app_metadata (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
      `);
    } catch (error) {
      console.error('❌ Error al crear tabla de metadata:', error);
      throw error;
    }
  }
}