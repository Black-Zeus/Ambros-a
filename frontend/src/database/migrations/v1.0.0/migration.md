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