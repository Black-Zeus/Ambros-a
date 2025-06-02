# 📁 Estructura de Carpetas — Proyecto Ambrosía

Esta es la estructura propuesta para el proyecto **Ambrosía**, con una breve descripción del propósito de cada carpeta.

```
Ambrosia/
│
├── assets/                  # Archivos gráficos y multimedia
│   ├── icons/               # Iconos (SVG, PNG), ejemplo: lechuza, caldero
│   ├── illustrations/       # Ilustraciones de ambientación y narrativa
│   ├── fonts/               # Tipografías mágicas o personalizadas
│   ├── audio/               # Sonidos mágicos, ambiente o efectos
│   └── raw/                 # Assets no clasificados o sin usar aún
│
├── src/                     # Código fuente principal
│   ├── components/          # Componentes reutilizables (Botones, Cards)
│   ├── screens/             # Vistas completas: Home, Receta, Herbolario...
│   ├── navigation/          # Lógica de navegación (React Navigation)
│   ├── hooks/               # Custom hooks de React
│   ├── context/             # Contextos globales (usuario, tema, recetas)
│   ├── data/                # Datos estáticos o ejemplos (JSONs, listas)
│   ├── utils/               # Funciones auxiliares, validaciones, helpers
│   └── styles/              # Estilos globales y temas visuales
│
├── templates/               # Plantillas HTML para exportar o compartir
│   ├── recipe_paper.html    # Plantilla estilo pergamino
│   └── recipe_card.html     # Plantilla de receta tipo tarjeta
│
├── docs/                    # Documentación técnica y narrativa
│   ├── roadmap.md           # Módulos y planificación general
│   ├── todo.md              # Lista de ideas, tareas y pendientes
│   ├── navigation_map.md    # Árbol de navegación visual
│   └── lore.md              # Narrativa y mundo mágico de Ambrosía
│
├── system/                  # Configuración y estructura lógica base
│   ├── config.json          # Configuraciones iniciales
│   └── schema/              # Esquemas de datos o tipos definidos
│
├── tests/                   # Pruebas unitarias y de integración
│
├── .gitignore               # Archivos a excluir del control de versiones
├── LICENSE                  # Licencia del proyecto
├── README.md                # Documentación inicial del proyecto
└── App.js                   # Punto de entrada de la app (Expo)
```
