/**
 * Configuración de la base de datos SQLite para Ambrosía
 * 
 * Configuraciones centralizadas para:
 * - Parámetros de conexión
 * - Configuraciones de SQLite
 * - Paths y ubicaciones
 * - Configuraciones de performance
 */

export const DATABASE_CONFIG = {
  // Configuración básica
  name: 'ambrosiaDB.sqlite',
  version: '1.0.0',
  displayName: 'Ambrosía Recipe Database',
  
  // Configuraciones de SQLite
  settings: {
    // Habilitar foreign keys
    enableForeignKeys: true,
    
    // Modo de journal para mejor performance
    journalMode: 'WAL', // Write-Ahead Logging
    
    // Configuración de sincronización
    synchronous: 'NORMAL', // FULL, NORMAL, OFF
    
    // Configuración de cache
    cacheSize: 2000, // Páginas en cache
    
    // Timeout para operaciones
    busyTimeout: 30000, // 30 segundos
  },
  
  // Configuraciones de migración
  migrations: {
    // Ejecutar migraciones automáticamente al inicializar
    autoRun: true,
    
    // Crear backup antes de migraciones
    backupBeforeMigration: true,
    
    // Validar integridad después de migraciones
    validateAfterMigration: true,
  },
  
  // Configuraciones de desarrollo
  development: {
    // Mostrar logs de SQL (solo desarrollo)
    logQueries: __DEV__,
    
    // Verificar integridad en cada inicio (solo desarrollo)
    checkIntegrityOnStart: __DEV__,
    
    // Recrear BD en caso de error de schema (solo desarrollo)
    recreateOnSchemaError: __DEV__,
  },
  
  // Configuraciones de performance
  performance: {
    // Tamaño de batch para inserciones masivas
    batchSize: 100,
    
    // Timeout para queries complejas
    queryTimeout: 10000, // 10 segundos
    
    // Cache de queries preparadas
    enablePreparedStatementCache: true,
  },
  
  // Configuraciones de backup
  backup: {
    // Habilitar backups automáticos
    enabled: true,
    
    // Frecuencia de backups (días)
    frequency: 7,
    
    // Número máximo de backups a mantener
    maxBackups: 5,
    
    // Comprimir backups
    compress: true,
  },
  
  // Paths de archivos
  paths: {
    // Directorio base de la BD
    databaseDir: 'SQLite',
    
    // Directorio de backups
    backupDir: 'storage/database/backups',
    
    // Archivo de configuración de schema
    schemaFile: 'config/schema.json',
    
    // Directorio de migraciones
    migrationsDir: 'database/migrations',
    
    // Directorio de datos iniciales
    dataDir: 'data/dummy',
  },
  
  // Configuraciones de validación
  validation: {
    // Validar foreign keys en cada operación
    strictForeignKeys: true,
    
    // Validar tipos de datos
    strictTypes: true,
    
    // Verificar constraints
    enforceConstraints: true,
  },
  
  // Configuraciones de logging
  logging: {
    // Nivel de logging (error, warn, info, debug)
    level: __DEV__ ? 'debug' : 'warn',
    
    // Incluir timestamps en logs
    includeTimestamps: true,
    
    // Incluir duración de queries
    includeQueryDuration: __DEV__,
    
    // Logear migraciones
    logMigrations: true,
  },
  
  // Configuraciones de seguridad
  security: {
    // Habilitar modo de solo lectura para ciertas operaciones
    enableReadOnlyMode: false,
    
    // Validar queries peligrosas
    validateDangerousQueries: true,
    
    // Prevenir SQL injection básico
    preventSQLInjection: true,
  },
  
  // Configuraciones específicas de Ambrosía
  app: {
    // Versión inicial con datos
    initialDataVersion: '1.0.0',
    
    // Número de recetas iniciales esperadas
    expectedInitialRecipes: 300,
    
    // Número de ingredientes iniciales esperados
    expectedInitialIngredients: 150,
    
    // Número de categorías iniciales esperadas
    expectedInitialCategories: 10,
  }
} as const;

// Tipos derivados de la configuración
export type DatabaseSettings = typeof DATABASE_CONFIG.settings;
export type MigrationConfig = typeof DATABASE_CONFIG.migrations;
export type PerformanceConfig = typeof DATABASE_CONFIG.performance;
export type BackupConfig = typeof DATABASE_CONFIG.backup;
export type ValidationConfig = typeof DATABASE_CONFIG.validation;
export type LoggingConfig = typeof DATABASE_CONFIG.logging;
export type SecurityConfig = typeof DATABASE_CONFIG.security;
export type AppConfig = typeof DATABASE_CONFIG.app;

// Funciones helper para configuración
export const getDatabasePath = (): string => {
  return `${DATABASE_CONFIG.paths.databaseDir}/${DATABASE_CONFIG.name}`;
};

export const getBackupPath = (timestamp: string): string => {
  const basename = DATABASE_CONFIG.name.replace('.sqlite', '');
  return `${DATABASE_CONFIG.paths.backupDir}/${basename}-backup-${timestamp}.sqlite`;
};

export const getMigrationPath = (version: string): string => {
  return `${DATABASE_CONFIG.paths.migrationsDir}/v${version}`;
};

export const getSchemaPath = (): string => {
  return DATABASE_CONFIG.paths.schemaFile;
};

export const getInitialDataPath = (filename: string): string => {
  return `${DATABASE_CONFIG.paths.dataDir}/${filename}`;
};

// Validación de configuración
export const validateConfig = (): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Validar configuraciones críticas
  if (!DATABASE_CONFIG.name || !DATABASE_CONFIG.name.endsWith('.sqlite')) {
    errors.push('Nombre de BD debe terminar en .sqlite');
  }
  
  if (DATABASE_CONFIG.performance.batchSize <= 0) {
    errors.push('Batch size debe ser mayor a 0');
  }
  
  if (DATABASE_CONFIG.backup.maxBackups <= 0) {
    errors.push('Número máximo de backups debe ser mayor a 0');
  }
  
  return {
    valid: errors.length === 0,
    errors
  };
};

// Configuración para diferentes entornos
export const getEnvironmentConfig = () => {
  const baseConfig = { ...DATABASE_CONFIG };
  
  if (__DEV__) {
    // Configuraciones específicas para desarrollo
    baseConfig.settings.journalMode = 'DELETE'; // Más simple para debugging
    baseConfig.logging.level = 'debug';
    baseConfig.development.logQueries = true;
  } else {
    // Configuraciones específicas para producción
    baseConfig.settings.journalMode = 'WAL'; // Mejor performance
    baseConfig.logging.level = 'warn';
    baseConfig.development.logQueries = false;
  }
  
  return baseConfig;
};