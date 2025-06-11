# 🗄️ Database Migrations - Ambrosía

Este directorio contiene todas las migraciones de la base de datos de Ambrosía, organizadas por versiones y siguiendo convenciones estrictas para mantener la integridad y trazabilidad de los cambios.

## 📁 Estructura de Directorios

```
src/database/migrations/
├── migration-registry.json          # Registro central de todas las migraciones
├── v1.0.0/                         # Versión inicial
│   ├── 20250611_01_create_initial_schema.sql
│   ├── 20250611_02_add_base_categories.sql
│   ├── 20250611_03_add_sample_recipes.sql
│   └── migration.md
├── v1.1.0/                         # Primera actualización
│   ├── 20250715_01_add_favorites_table.sql
│   ├── 20250715_02_add_ratings_system.sql
│   ├── 20250715_03_alter_recipes_add_rating_column.sql
│   ├── 20250715_04_create_performance_indexes.sql
│   └── migration.md
└── v1.2.0/                         # Segunda actualización
    ├── 20250820_01_add_recipe_variations_table.sql
    ├── 20250820_02_add_custom_tags_system.sql
    ├── 20250820_03_update_search_functionality.sql
    └── migration.md
```

---

## 📏 Convenciones de Nomenclatura

### **Formato de Archivos SQL**
```
vX.Y.Z/YYYYMMDD_NN_action_description.sql
```

**Componentes:**
- **vX.Y.Z**: Versión semántica (v1.0.0, v1.1.0, v1.2.0...)
- **YYYYMMDD**: Fecha de creación (20250611 = 11 de Junio 2025)
- **NN**: Número secuencial de la migración (01, 02, 03...)
- **action**: Tipo de operación (ver lista abajo)
- **description**: Descripción específica en snake_case

### **Acciones Estándar**
| Acción | Descripción | Ejemplo |
|--------|-------------|---------|
| `create` | Crear tablas, índices, triggers | `create_initial_schema.sql` |
| `add` | Agregar columnas, constraints, features | `add_favorites_table.sql` |
| `alter` | Modificar estructura existente | `alter_recipes_add_rating_column.sql` |
| `drop` | Eliminar tablas, columnas, índices | `drop_unused_indexes.sql` |
| `update` | Actualizar datos existentes | `update_recipe_categories.sql` |
| `fix` | Corregir problemas de datos | `fix_duplicate_ingredients.sql` |
| `rename` | Renombrar tablas o columnas | `rename_category_to_categories.sql` |

### **Ejemplos de Nomenclatura Correcta**
```
✅ 20250611_01_create_initial_schema.sql
✅ 20250715_02_add_favorites_table.sql
✅ 20250715_03_alter_recipes_add_rating_column.sql
✅ 20250820_01_update_search_functionality.sql

❌ 20250611_01_new_feature.sql          # Muy genérico
❌ 20250715_02_update_db.sql            # No especifica qué actualiza
❌ 20250820_01_AddFavoritesTable.sql    # No usar camelCase
❌ 20250820_migration.sql               # Falta número secuencial
```

---

## 🔧 Cómo Crear una Nueva Migración

### **Paso 1: Planificar la Migración**
1. **Definir la versión**: ¿Es major (v2.0.0), minor (v1.1.0) o patch (v1.0.1)?
2. **Documentar el propósito**: ¿Qué funcionalidad se agrega/modifica?
3. **Evaluar breaking changes**: ¿Rompe compatibilidad con versiones anteriores?

### **Paso 2: Crear la Estructura de Versión**
```bash
# Crear directorio para nueva versión
mkdir src/database/migrations/v1.1.0

# Crear archivo de documentación
touch src/database/migrations/v1.1.0/migration.md
```

### **Paso 3: Crear Archivos de Migración**
```bash
# Ejemplo para agregar sistema de favoritos
touch src/database/migrations/v1.1.0/20250715_01_add_favorites_table.sql
touch src/database/migrations/v1.1.0/20250715_02_add_ratings_system.sql
touch src/database/migrations/v1.1.0/20250715_03_alter_recipes_add_rating_column.sql
```

### **Paso 4: Escribir SQL de Migración**
```sql
-- src/database/migrations/v1.1.0/20250715_01_add_favorites_table.sql
-- Migración: Agregar sistema de favoritos
-- Fecha: 2025-07-15
-- Versión: v1.0.0 → v1.1.0

-- Crear tabla de favoritos
CREATE TABLE IF NOT EXISTS user_favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON DELETE CASCADE
);

-- Crear índices para performance
CREATE INDEX IF NOT EXISTS idx_favorites_recipe_id ON user_favorites(recipe_id);
CREATE INDEX IF NOT EXISTS idx_favorites_created_at ON user_favorites(created_at);

-- Actualizar metadata de versión
INSERT OR REPLACE INTO app_metadata (key, value) VALUES ('migration_v1.1.0_favorites', 'completed');
```

### **Paso 5: Documentar la Migración**
```markdown
# Migración v1.0.0 → v1.1.0

## 🎯 Funcionalidades Agregadas
- **Sistema de favoritos**: Usuarios pueden marcar recetas como favoritas
- **Sistema de calificaciones**: Rating de 1-5 estrellas por receta
- **Historial de visualización**: Tracking de recetas consultadas

## 🗄️ Cambios en Base de Datos
- **Nueva tabla**: `user_favorites`
- **Nueva tabla**: `recipe_ratings` 
- **Nueva tabla**: `recipe_history`
- **Nueva columna**: `recipes.avg_rating REAL`
- **Nuevos índices**: Performance para búsquedas por favoritos

## 📱 Impacto en la Aplicación
- Nueva sección "Mis Favoritos" en menú principal
- Estrellas de calificación en RecipeCard
- Historial de recetas en página de perfil

## 🔄 Proceso de Migración
1. Crear tablas de favoritos y ratings
2. Agregar columna avg_rating a recipes
3. Crear índices de performance
4. Poblar datos iniciales si es necesario

## ⚠️ Consideraciones
- **Breaking changes**: ❌ No rompe funcionalidad existente
- **Rollback**: ✅ Disponible mediante rollback.sql
- **Tiempo estimado**: ~2 segundos en BD con 300 recetas
```

### **Paso 6: Actualizar migration-registry.json**
```json
{
  "currentVersion": "1.1.0",
  "migrations": [
    {
      "version": "1.0.0",
      "date": "2025-06-11",
      "description": "Schema inicial con recetas, ingredientes y categorías",
      "features": ["recetas básicas", "herbolario", "categorías"],
      "breaking": false,
      "estimatedTime": "5 segundos"
    },
    {
      "version": "1.1.0",
      "date": "2025-07-15", 
      "description": "Sistema de favoritos y calificaciones",
      "features": ["favoritos", "ratings", "historial"],
      "breaking": false,
      "estimatedTime": "2 segundos"
    }
  ]
}
```

---

## 🔄 Proceso de Ejecución

### **Desarrollo (BD Nueva)**
```typescript
// Crear BD desde esquema más reciente
await SchemaService.createFromLatestSchema();
```

### **Producción (BD Existente)**
```typescript
// Migrar incrementalmente preservando datos
const currentVersion = await MigrationService.getCurrentVersion();
await MigrationService.migrateToVersion("1.1.0");
```

### **Testing (BD Específica)**
```typescript
// Crear BD base y migrar a versión específica
await SchemaService.createBase();                    // v1.0.0
await MigrationService.migrateToVersion("1.1.0");    // Solo hasta v1.1.0
```

---

## 📋 Checklist para Nueva Migración

### **Antes de Crear**
- [ ] ¿La funcionalidad está completamente definida?
- [ ] ¿Se evaluó el impacto en la BD existente?
- [ ] ¿Se definió si es breaking change o no?
- [ ] ¿Se planificó el rollback en caso necesario?

### **Durante la Creación**
- [ ] Nomenclatura correcta del archivo
- [ ] SQL bien comentado con propósito y fecha
- [ ] Uso de `IF NOT EXISTS` para evitar errores
- [ ] Índices de performance incluidos
- [ ] Documentación en migration.md completa

### **Después de Crear**
- [ ] Archivo migration-registry.json actualizado
- [ ] Migración probada en BD de desarrollo
- [ ] Rollback probado (si aplica)
- [ ] Performance evaluado con datos reales
- [ ] Documentación revisada por el equipo

---

## ⚠️ Reglas Importantes

### **❌ NO Hacer**
- No modificar migraciones ya aplicadas en producción
- No usar DROP TABLE sin verificar dependencias
- No olvidar crear índices para nuevas columnas consultadas
- No hacer migraciones sin documentación
- No usar datos hardcoded sin considerar diferentes entornos

### **✅ Siempre Hacer**
- Usar transacciones para migraciones complejas
- Incluir rollback para migraciones destructivas
- Probar migración en copia de BD de producción
- Documentar el propósito y impacto de cada cambio
- Actualizar migration-registry.json

---

## 🚨 Troubleshooting

### **Error: "Migration already applied"**
```bash
# Verificar estado actual
SELECT * FROM app_metadata WHERE key LIKE 'migration_%';

# Forzar re-ejecución (solo desarrollo)
DELETE FROM app_metadata WHERE key = 'migration_v1.1.0_favorites';
```

### **Error: "Table already exists"**
```sql
-- Usar siempre IF NOT EXISTS
CREATE TABLE IF NOT EXISTS user_favorites (...);
```

### **Error: "Foreign key constraint failed"**
```sql
-- Verificar que las tablas padre existan antes de crear FK
PRAGMA foreign_keys = ON;
```

---

## 📞 Contacto

Para dudas sobre migraciones o convenciones, consultar con el equipo de desarrollo o revisar la documentación en `src/database/README.md`.

---

**Última actualización**: 11 de Junio 2025  
**Versión actual**: v1.0.0