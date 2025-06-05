# 🌿 Manual de Identidad Visual - Ambrosía

> **"Enciende el fuego, respira hondo... Aquí comienza la magia ancestral."**

---

## 🎨 1. Paleta de Colores Principal

### Colores Base
| Variable CSS/Tailwind | Código HEX | Descripción | Uso Principal |
|----------------------|------------|-------------|---------------|
| `amber-400` | #f59e0b | Dorado Principal | Acentos, botones primarios |
| `amber-500` | #d97706 | Dorado Intenso | Hover states, énfasis |
| `amber-300` | #fcd34d | Dorado Claro | Textos destacados, borders |
| `yellow-200` | #fef3c7 | Crema Dorada | Textos principales sobre fondo oscuro |
| `amber-600` | #b45309 | Bronce | Textos secundarios, labels |

### Fondos
| Variable | Código HEX | Descripción | Uso |
|----------|------------|-------------|-----|
| `stone-900` | #1c1917 | Oscuro Principal | Fondo base de la aplicación |
| `stone-800` | #292524 | Oscuro Medio | Containers, cards |
| `stone-700` | #44403c | Oscuro Claro | Elementos hover, borders |

### Transparencias y Overlays
| Variable | Valor | Descripción |
|----------|-------|-------------|
| `bg-amber-400/5` | rgba(245, 158, 11, 0.05) | Overlay muy sutil |
| `bg-amber-400/10` | rgba(245, 158, 11, 0.10) | Overlay para containers |
| `bg-amber-400/15` | rgba(245, 158, 11, 0.15) | Elementos destacados |
| `border-amber-400/20` | rgba(245, 158, 11, 0.20) | Bordes suaves |
| `border-amber-400/30` | rgba(245, 158, 11, 0.30) | Bordes más visibles |

---

## 🖋️ 2. Tipografías

### Fuentes
- **Display/Títulos:** `Cinzel` (serif decorativa) - Para títulos principales y elementos mágicos
- **Cuerpo:** `Crimson Text` (serif legible) - Para texto de contenido y descripciones

### Jerarquía Tipográfica (Tailwind)
```css
/* Títulos Principales */
.titulo-principal { @apply font-cinzel text-4xl text-yellow-200; }

/* Títulos Secundarios */
.titulo-seccion { @apply font-cinzel text-2xl text-amber-400; }

/* Subtítulos */
.subtitulo { @apply font-crimson text-base text-amber-500 italic; }

/* Texto Base */
.texto-base { @apply font-crimson text-base text-yellow-200; }

/* Texto Secundario */
.texto-secundario { @apply font-crimson text-sm text-amber-600; }

/* Labels y Metadatos */
.texto-label { @apply font-crimson text-xs text-amber-600 font-bold uppercase; }
```

---

## 🧿 3. Componentes Base

### Containers y Cards
```css
/* Container Principal */
.container-principal {
  @apply max-w-4xl mx-auto bg-amber-400/3 border border-amber-400/15 rounded-3xl p-8;
}

/* Card Receta */
.card-receta {
  @apply bg-amber-400/5 border border-amber-400/20 rounded-xl p-6;
}

/* Card Destacada */
.card-destacada {
  @apply bg-amber-400/8 border-2 border-amber-400/25 rounded-xl p-6;
}
```

### Botones
```css
/* Botón Primario */
.btn-primario {
  @apply px-6 py-3 bg-gradient-to-br from-amber-400/20 to-amber-600/15 
         border-2 border-amber-400/40 rounded-xl text-amber-400 
         font-cinzel transition-all duration-300 
         hover:from-amber-400/30 hover:to-amber-600/20 
         hover:border-amber-400/60 hover:-translate-y-0.5 
         hover:shadow-lg hover:shadow-amber-400/20;
}

/* Botón Secundario */
.btn-secundario {
  @apply px-4 py-2 bg-amber-400/10 border border-amber-400/30 
         rounded-lg text-amber-500 font-crimson text-sm
         hover:bg-amber-400/15 hover:border-amber-400/40;
}
```

### Elementos de Lista
```css
/* Lista de Ingredientes */
.lista-ingredientes {
  @apply bg-amber-400/5 border border-amber-400/20 rounded-lg p-5;
}

.ingrediente-item {
  @apply py-2 border-b border-dotted border-amber-400/30 
         flex items-start gap-4 last:border-b-0;
}

.ingrediente-cantidad {
  @apply min-w-20 font-bold text-amber-600 flex-shrink-0;
}

.ingrediente-nombre {
  @apply text-yellow-200 flex-1;
}
```

### Instrucciones
```css
/* Paso de Instrucción */
.instruccion-paso {
  @apply relative pl-16 mb-5 p-4 bg-amber-400/5 border border-amber-400/20 rounded-lg;
}

.instruccion-numero {
  @apply absolute left-4 top-4 w-8 h-8 bg-amber-400 text-stone-900 
         rounded-full flex items-center justify-center 
         font-bold text-sm;
}
```

---

## 🎭 4. Estados y Interacciones

### Estados de Hover
```css
.hover-magico {
  @apply transition-all duration-300 hover:-translate-y-1 
         hover:shadow-lg hover:shadow-amber-400/20;
}
```

### Animaciones
```css
.fade-in {
  @apply animate-in fade-in duration-500;
}

.slide-up {
  @apply animate-in slide-in-from-bottom-4 duration-300;
}
```

---

## 🏷️ 5. Sistema de Tags y Badges

```css
/* Tag Base */
.tag {
  @apply inline-block bg-amber-400/15 text-amber-400 
         px-3 py-1 mx-1 my-0.5 rounded-full text-xs 
         border border-amber-400/30;
}

/* Tag Categoría */
.tag-categoria {
  @apply bg-amber-500/20 text-amber-300 border-amber-500/40;
}

/* Badge Dificultad */
.badge-dificultad {
  @apply bg-gradient-to-r from-amber-400/20 to-amber-600/15 
         text-amber-400 px-2 py-1 rounded text-xs font-bold;
}
```

---

## 📐 6. Espaciado y Layout

### Grid System
- **Container máximo:** `max-w-4xl` (896px)
- **Breakpoints:** Usar sistema Tailwind estándar
- **Gaps principales:** `gap-4`, `gap-6`, `gap-8`

### Spacing Scale
- **Micro:** `space-y-1` (4px)
- **Pequeño:** `space-y-2` (8px)
- **Normal:** `space-y-4` (16px)
- **Medio:** `space-y-6` (24px)
- **Grande:** `space-y-8` (32px)
- **Extra Grande:** `space-y-12` (48px)

---

## 🌙 7. Configuración Tailwind

### Colores Personalizados
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ambrosia: {
          gold: '#d4af37',
          'gold-light': '#f3e5ab',
          'gold-dark': '#8b4513',
          'dark-primary': '#2d1810',
          'dark-secondary': '#1a0f0a',
          'dark-accent': '#0f0604'
        }
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
        'crimson': ['Crimson Text', 'serif']
      },
      backgroundImage: {
        'gradient-ambrosia': 'linear-gradient(135deg, #2d1810, #1a0f0a, #0f0604)'
      }
    }
  }
}
```

---

## ✨ 8. Principios de Diseño

### Filosofía Visual
- **Elegancia ancestral:** Cada elemento debe evocar sabiduría y tradición
- **Jerarquía clara:** Uso de tamaños, colores y espaciado para guiar la atención
- **Consistencia mágica:** Mantener la temática dorada/bronce en todos los elementos
- **Legibilidad suprema:** El contenido debe ser fácil de leer sobre fondos oscuros

### Elementos Recurrentes
- **Bordes redondeados:** Preferir `rounded-xl` o `rounded-2xl`
- **Sombras sutiles:** Usar sombras con color amber para mantener coherencia
- **Transparencias:** Aprovechar overlays con opacity para crear profundidad
- **Gradientes suaves:** Combinaciones de amber con diferentes opacidades

---

## 🎯 9. Casos de Uso Específicos

### Páginas Principales
- **Home:** Fondo gradient-ambrosia, containers con bg-amber-400/3
- **Receta Detail:** Container principal con máximo contraste para legibilidad
- **Lista de Recetas:** Cards uniformes con hover effects

### Estados Especiales
- **Loading:** Usar animaciones con amber-400
- **Error:** Mantener paleta pero con mayor contraste
- **Success:** Intensificar el amber para feedback positivo

---

## 🧙‍♂️ 10. Notas Adicionales

### Iconografía y Assets
- **Estilo:** Íconos outline o filled que complementen la temática ancestral
- **Colores:** Usar la paleta amber para íconos principales
- **Tamaños:** `w-4 h-4`, `w-6 h-6`, `w-8 h-8` como estándares

### Responsive Design
- **Mobile First:** Diseñar primero para móvil
- **Breakpoints clave:** `sm:`, `md:`, `lg:` de Tailwind
- **Espaciado adaptivo:** Reducir padding/margin en pantallas pequeñas

### Accesibilidad
- **Contraste:** Mínimo 4.5:1 para texto normal
- **Foco:** Usar `focus:ring-amber-400` para elementos interactivos
- **Semántica:** Usar etiquetas HTML correctas

---

*Este manual debe ser la referencia única para mantener coherencia visual en toda la aplicación Ambrosía.*