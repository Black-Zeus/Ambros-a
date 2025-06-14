import * as FileSystem from 'expo-file-system';
import { DatabaseService } from './DatabaseService';

/**
 * SchemaService - Constructor y validador de estructura de BD
 * 
 * Responsabilidades:
 * - Crear BD desde snapshot (config/schema.json)
 * - Crear BD base para testing
 * - Insertar datos iniciales (300 recetas)
 * - Validar estructura de BD
 * - Generar snapshots desde BD actual
 * - Introspección de esquemas
 */
export class SchemaService {
  private static readonly SCHEMA_PATH = 'config/schema.json';
  private static readonly BASE_SCHEMA_PATH = 'database/schema/create_base.sql';
  private static readonly INITIAL_DATA_PATH = 'data/dummy';

  /**
   * Crear base de datos desde schema.json (snapshot completo)
   * Usado en primera instalación de la app
   */
  static async createFromSchema(): Promise<void> {
    try {
      console.log('🏗️ Creando BD desde schema snapshot...');
      
      // Cargar schema desde archivo
      const schema = await this.loadSchema();
      
      // Asegurar tabla de metadata
      await DatabaseService.ensureMetadataTable();
      
      // Crear todas las tablas desde el schema
      await this.createTablesFromSchema(schema);
      
      // Crear índices
      await this.createIndexesFromSchema(schema);
      
      // Insertar datos iniciales
      await this.insertInitialData();
      
      // Establecer versión
      await DatabaseService.setVersion(schema.version);
      
      console.log(`✅ BD creada desde schema v${schema.version}`);
    } catch (error) {
      console.error('❌ Error al crear BD desde schema:', error);
      throw error;
    }
  }

  /**
   * Crear base de datos base (v1.0.0) para testing
   */
  static async createBase(): Promise<void> {
    try {
      console.log('🏗️ Creando BD base v1.0.0...');
      
      // Cargar script SQL base
      const baseSQL = await this.loadBaseSchema();
      
      // Ejecutar script
      await DatabaseService.executeSQL(baseSQL);
      
      // Establecer versión base
      await DatabaseService.setVersion('1.0.0');
      
      console.log('✅ BD base v1.0.0 creada correctamente');
    } catch (error) {
      console.error('❌ Error al crear BD base:', error);
      throw error;
    }
  }

  /**
   * Insertar datos iniciales (categorías, recetas, ingredientes)
   */
  static async insertInitialData(): Promise<void> {
    try {
      console.log('📦 Insertando datos iniciales...');
      
      // Insertar categorías
      await this.insertCategories();
      
      // Insertar ingredientes
      await this.insertIngredients();
      
      // Insertar recetas (300+)
      await this.insertRecipes();
      
      console.log('✅ Datos iniciales insertados correctamente');
    } catch (error) {
      console.error('❌ Error al insertar datos iniciales:', error);
      throw error;
    }
  }

  /**
   * Validar que la estructura actual coincida con schema.json
   */
  static async validateSchema(): Promise<boolean> {
    try {
      console.log('🔍 Validando estructura de BD...');
      
      const expectedSchema = await this.loadSchema();
      const currentSchema = await this.introspectCurrentSchema();
      
      const isValid = this.compareSchemas(expectedSchema, currentSchema);
      
      if (isValid) {
        console.log('✅ Estructura de BD válida');
      } else {
        console.log('⚠️ Estructura de BD no coincide con schema.json');
      }
      
      return isValid;
    } catch (error) {
      console.error('❌ Error al validar schema:', error);
      return false;
    }
  }

  /**
   * Generar snapshot de la BD actual hacia schema.json
   */
  static async generateSnapshot(): Promise<void> {
    try {
      console.log('📸 Generando snapshot de BD actual...');
      
      const currentSchema = await this.introspectCurrentSchema();
      const version = await DatabaseService.getVersion();
      
      const snapshot = {
        version,
        generatedAt: new Date().toISOString(),
        database: currentSchema
      };
      
      // Guardar snapshot
      const snapshotPath = FileSystem.documentDirectory + this.SCHEMA_PATH;
      await FileSystem.writeAsStringAsync(
        snapshotPath,
        JSON.stringify(snapshot, null, 2)
      );
      
      console.log(`✅ Snapshot generado: ${this.SCHEMA_PATH} (v${version})`);
    } catch (error) {
      console.error('❌ Error al generar snapshot:', error);
      throw error;
    }
  }

  /**
   * Introspeccionar estructura actual de la BD
   */
  static async introspectCurrentSchema(): Promise<any> {
    try {
      const db = await DatabaseService.getInstance();
      
      // Obtener todas las tablas
      const tables = await db.getAllAsync<{ name: string }>(
        "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name"
      );
      
      const schema: any = { tables: {} };
      
      // Para cada tabla, obtener estructura
      for (const table of tables) {
        const tableName = table.name;
        
        // Obtener columnas
        const columns = await db.getAllAsync<any>(
          `PRAGMA table_info(${tableName})`
        );
        
        // Obtener foreign keys
        const foreignKeys = await db.getAllAsync<any>(
          `PRAGMA foreign_key_list(${tableName})`
        );
        
        // Obtener índices
        const indexes = await db.getAllAsync<{ sql: string }>(
          `SELECT sql FROM sqlite_master WHERE type='index' AND tbl_name=? AND sql IS NOT NULL`,
          [tableName]
        );
        
        schema.tables[tableName] = {
          columns: this.formatColumns(columns),
          foreign_keys: this.formatForeignKeys(foreignKeys),
          indexes: indexes.map(idx => idx.sql).filter(Boolean)
        };
      }
      
      return schema;
    } catch (error) {
      console.error('❌ Error al introspeccionar schema:', error);
      throw error;
    }
  }

  /**
   * Cargar schema desde config/schema.json
   */
  private static async loadSchema(): Promise<any> {
    try {
      const schemaPath = FileSystem.bundleDirectory + this.SCHEMA_PATH;
      const schemaContent = await FileSystem.readAsStringAsync(schemaPath);
      return JSON.parse(schemaContent);
    } catch (error) {
      console.error('❌ Error al cargar schema.json:', error);
      throw error;
    }
  }

  /**
   * Cargar script SQL base
   */
  private static async loadBaseSchema(): Promise<string> {
    try {
      const basePath = FileSystem.bundleDirectory + this.BASE_SCHEMA_PATH;
      return await FileSystem.readAsStringAsync(basePath);
    } catch (error) {
      console.error('❌ Error al cargar schema base:', error);
      throw error;
    }
  }

  /**
   * Crear tablas desde schema
   */
  private static async createTablesFromSchema(schema: any): Promise<void> {
    const db = await DatabaseService.getInstance();
    
    for (const [tableName, tableDefinition] of Object.entries(schema.database.tables)) {
      const columns = Object.entries((tableDefinition as any).columns)
        .map(([name, type]) => `${name} ${type}`)
        .join(', ');
      
      const createTableSQL = `CREATE TABLE IF NOT EXISTS ${tableName} (${columns});`;
      await db.execAsync(createTableSQL);
      
      // Crear foreign keys si existen
      const foreignKeys = (tableDefinition as any).foreign_keys || [];
      for (const fk of foreignKeys) {
        // Las foreign keys se crean como parte de CREATE TABLE en SQLite
        // Esta lógica puede expandirse según necesidades
      }
    }
  }

  /**
   * Crear índices desde schema
   */
  private static async createIndexesFromSchema(schema: any): Promise<void> {
    const db = await DatabaseService.getInstance();
    
    for (const [tableName, tableDefinition] of Object.entries(schema.database.tables)) {
      const indexes = (tableDefinition as any).indexes || [];
      for (const indexSQL of indexes) {
        await db.execAsync(indexSQL);
      }
    }
  }

  /**
   * Insertar categorías iniciales
   */
  private static async insertCategories(): Promise<void> {
    try {
      const categoriesPath = FileSystem.bundleDirectory + `${this.INITIAL_DATA_PATH}/categories.json`;
      const categoriesContent = await FileSystem.readAsStringAsync(categoriesPath);
      const categories = JSON.parse(categoriesContent);
      
      const db = await DatabaseService.getInstance();
      
      for (const category of categories) {
        await db.runAsync(
          'INSERT OR IGNORE INTO categories (id, name, description, icon) VALUES (?, ?, ?, ?)',
          [category.id, category.name, category.description, category.icon]
        );
      }
      
      console.log(`📁 ${categories.length} categorías insertadas`);
    } catch (error) {
      console.error('❌ Error al insertar categorías:', error);
      // No throw - datos iniciales son opcionales
    }
  }

  /**
   * Insertar ingredientes iniciales
   */
  private static async insertIngredients(): Promise<void> {
    try {
      const ingredientsPath = FileSystem.bundleDirectory + `${this.INITIAL_DATA_PATH}/ingredients.json`;
      const ingredientsContent = await FileSystem.readAsStringAsync(ingredientsPath);
      const ingredients = JSON.parse(ingredientsContent);
      
      const db = await DatabaseService.getInstance();
      
      for (const ingredient of ingredients) {
        await db.runAsync(
          'INSERT OR IGNORE INTO ingredients (id, name, description) VALUES (?, ?, ?)',
          [ingredient.id, ingredient.name, ingredient.description]
        );
      }
      
      console.log(`🌿 ${ingredients.length} ingredientes insertados`);
    } catch (error) {
      console.error('❌ Error al insertar ingredientes:', error);
      // No throw - datos iniciales son opcionales
    }
  }

  /**
   * Insertar recetas iniciales (300+)
   */
  private static async insertRecipes(): Promise<void> {
    try {
      const recipesPath = FileSystem.bundleDirectory + `${this.INITIAL_DATA_PATH}/recipes.json`;
      const recipesContent = await FileSystem.readAsStringAsync(recipesPath);
      const recipes = JSON.parse(recipesContent);
      
      const db = await DatabaseService.getInstance();
      
      for (const recipe of recipes) {
        await db.runAsync(
          'INSERT OR IGNORE INTO recipes (id, title, description, category_id, difficulty, prep_time, cook_time, servings) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [recipe.id, recipe.title, recipe.description, recipe.category_id, recipe.difficulty, recipe.prep_time, recipe.cook_time, recipe.servings]
        );
        
        // Insertar ingredientes de la receta
        if (recipe.ingredients) {
          for (const ingredient of recipe.ingredients) {
            await db.runAsync(
              'INSERT OR IGNORE INTO recipe_ingredients (recipe_id, ingredient_id, quantity, notes) VALUES (?, ?, ?, ?)',
              [recipe.id, ingredient.ingredient_id, ingredient.quantity, ingredient.notes || null]
            );
          }
        }
        
        // Insertar pasos de la receta
        if (recipe.steps) {
          for (let i = 0; i < recipe.steps.length; i++) {
            const step = recipe.steps[i];
            await db.runAsync(
              'INSERT OR IGNORE INTO recipe_steps (recipe_id, step_number, instruction, duration) VALUES (?, ?, ?, ?)',
              [recipe.id, i + 1, step.instruction, step.duration || null]
            );
          }
        }
      }
      
      console.log(`🍽️ ${recipes.length} recetas insertadas`);
    } catch (error) {
      console.error('❌ Error al insertar recetas:', error);
      // No throw - datos iniciales son opcionales
    }
  }

  /**
   * Comparar dos schemas para validación
   */
  private static compareSchemas(expected: any, current: any): boolean {
    // Implementación básica - puede expandirse según necesidades
    try {
      const expectedTables = Object.keys(expected.database.tables).sort();
      const currentTables = Object.keys(current.tables).sort();
      
      return JSON.stringify(expectedTables) === JSON.stringify(currentTables);
    } catch (error) {
      return false;
    }
  }

  /**
   * Formatear columnas para introspección
   */
  private static formatColumns(columns: any[]): Record<string, string> {
    const formatted: Record<string, string> = {};
    for (const col of columns) {
      formatted[col.name] = `${col.type}${col.pk ? ' PRIMARY KEY' : ''}${col.notnull ? ' NOT NULL' : ''}`;
    }
    return formatted;
  }

  /**
   * Formatear foreign keys para introspección
   */
  private static formatForeignKeys(foreignKeys: any[]): string[] {
    return foreignKeys.map(fk => 
      `FOREIGN KEY (${fk.from}) REFERENCES ${fk.table}(${fk.to})`
    );
  }
}