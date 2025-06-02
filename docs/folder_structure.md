# 📁 Estructura de Carpetas — Proyecto Ambrosía

Esta es la estructura propuesta para el proyecto **Ambrosía**, con una breve descripción del propósito de cada carpeta.

```
Ambrosia/
│
├── assets/                  # Archivos gráficos y multimedia
│   ├── icons/               # Iconos mágicos (SVG, PNG), ej: lechuza, caldero
│   ├── illustrations/       # Ilustraciones narrativas o splash
│   ├── fonts/               # Tipografías decorativas
│   ├── audio/               # Sonidos, efectos mágicos
│   └── raw/                 # Assets sin clasificar o sin uso aún
│
├── src/                     # Código fuente principal
│   ├── atomic/              # Componentes visuales reutilizables (Atomic Design)
│   │   ├── atoms/               # Elementos simples (Botón, Ícono, Input)
│   │   ├── molecules/           # Combinaciones pequeñas (SearchField, CardPreview)
│   │   └── organisms/           # Estructuras mayores (NavBar, Footer, RecipeList)
│
│   ├── features/            # Funcionalidades específicas por dominio
│   │   ├── recipes/             # Gestión de recetas mágicas
│   │   │   ├── components/      # Componentes propios del módulo
│   │   │   ├── services/        # Lógica de datos (carga, filtros, favoritos)
│   │   │   ├── hooks/           # Hooks como useRecipeForm, useIngredients
│   │   │   ├── types/           # Tipado exclusivo de recetas
│   │   │   └── index.ts
│   │   ├── herbolario/          # Plantas mágicas y efectos
│   │   └── ...                  # Nuevas features futuras
│
│   ├── shared/              # Recursos compartidos entre features
│   │   ├── hooks/               # Hooks globales reutilizables
│   │   ├── services/            # API, autenticación, almacenamiento
│   │   ├── utils/               # Funciones auxiliares (validaciones, formateos)
│   │   └── types/               # Tipos generales (User, Session, etc.)
│
│   ├── layout/              # Componentes estructurales persistentes
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── LayoutWrapper.tsx
│
│   ├── pages/               # Pantallas completas asociadas a rutas
│   │   ├── HomePage.tsx
│   │   ├── RecipeDetailPage.tsx
│   │   └── ...
│
│   ├── styles/              # Estilos globales, Tailwind config, tokens
│   ├── router/              # Definición de rutas, navegación
│   ├── config/              # Configuraciones generales, endpoints mágicos
│   └── app/                 # Punto de entrada, contextos globales, providers
│
├── templates/               # Plantillas visuales de recetas
│   ├── recipe_paper.html    # Estilo pergamino
│   └── recipe_card.html     # Estilo carta mágica
│
├── docs/                    # Documentación técnica y mágica
│   ├── folder_structure.md  # Este documento
│   ├── manual_identidad.md  # Identidad visual y elementos mágicos
│   ├── navigation_map.md    # Árbol de navegación del sistema
│   ├── roadmap.md           # Planificación general por hitos
│   ├── todo.md              # Lista de tareas e ideas
│   └── lore.md              # Narrativa y universo de Ambrosía
│
├── system/                  # Esquemas y configuraciones base
│   ├── config.json
│   └── schema/
│
├── tests/                   # Pruebas unitarias y funcionales
│
├── .gitignore               # Exclusiones de Git
├── LICENSE                  # Licencia del proyecto
├── README.md                # Presentación inicial
└── App.js                   # Entrada de la app (Expo)
```
