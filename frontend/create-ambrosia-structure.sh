#!/bin/bash

echo "========================================"
echo "      CREANDO ESTRUCTURA AMBROSIA"
echo "========================================"
echo

# Crear estructura principal src/
echo "Creando estructura src/..."
mkdir -p src/database/{config,schema,query,services}

# Crear estructura components/ (Atomic Design)
echo "Creando estructura components/..."
mkdir -p src/components/atoms/{effects,typography,buttons,inputs,images}
mkdir -p src/components/molecules/{menu,recipe-card,image-picker,search-bar,cauldron}
mkdir -p src/components/organisms/{AppHeader,CauldronSection,MenuGrid,RecipeForm,RecipeList,AppFooter}
mkdir -p src/components/templates/{PageLayout,FormLayout,ListLayout}

# Crear estructura features/ (Feature Architecture)
echo "Creando estructura features/..."
mkdir -p src/features/home/{pages,components,hooks,types}
mkdir -p src/features/recipes/{pages,components,hooks,services,types}
mkdir -p src/features/ingredients/{pages,components,hooks,services,types}
mkdir -p src/features/categories/{pages,components,hooks,types}
mkdir -p src/features/profile/{pages,components,hooks,types}

# Crear estructura shared/ (Clean Architecture)
echo "Creando estructura shared/..."
mkdir -p src/shared/{hooks,services,utils,constants}

# Crear estructura types/ (Global)
echo "Creando estructura types/..."
mkdir -p src/types/{database,app}

# Crear estructura navigation/
echo "Creando estructura navigation/..."
mkdir -p src/navigation

# Crear estructura app/
echo "Creando estructura app/..."
mkdir -p src/app

# Crear estructura assets/
echo "Creando estructura assets/..."
mkdir -p assets/images/{icons,placeholders,backgrounds}
mkdir -p assets/{fonts,animations}

# Crear estructura data/
echo "Creando estructura data/..."
mkdir -p data/{config,dummy,schemas}

# Crear estructura storage/
echo "Creando estructura storage/..."
mkdir -p storage/database/backups
mkdir -p storage/user-data/recipes/recipe-images
mkdir -p storage/user-data/ingredients/ingredient-images
mkdir -p storage/user-data/profile
mkdir -p storage/cache/{images,data}
mkdir -p storage/temp/{uploads,processing}

# Crear archivos .gitkeep para mantener estructura en Git
echo "Creando archivos .gitkeep..."
touch storage/database/backups/.gitkeep
touch storage/user-data/recipes/recipe-images/.gitkeep
touch storage/user-data/ingredients/ingredient-images/.gitkeep
touch storage/user-data/profile/.gitkeep
touch storage/cache/images/.gitkeep
touch storage/cache/data/.gitkeep
touch storage/temp/uploads/.gitkeep
touch storage/temp/processing/.gitkeep

echo
echo "========================================"
echo "     ESTRUCTURA CREADA EXITOSAMENTE!"
echo "========================================"
echo
echo "Estructura creada en:"
echo "  - src/ (codigo fuente)"
echo "  - assets/ (recursos estaticos)"
echo "  - data/ (configuracion y datos)"
echo "  - storage/ (datos dinamicos)"
echo
echo "Ejecuta 'tree' para ver la estructura completa"
echo "O 'find . -type d | sort' para ver todas las carpetas"
echo