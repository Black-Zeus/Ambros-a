# 📖 Guía de Convención de Commits — Ambrosía

Este proyecto utiliza el estándar **Conventional Commits** para mantener un historial de cambios claro y semántico.

## 📌 Formato básico

```
<tipo>(<ámbito opcional>): <mensaje breve en minúsculas>
```

### ✅ Ejemplos válidos:

```
feat: agregar pantalla de creación de recetas
fix(home): corregir bug al compartir receta
docs(roadmap): actualizar módulo Árbol de Transmutación
refactor(components): mejorar estructura de botones mágicos
style: aplicar estilo oscuro a vista principal
test: añadir prueba para función de linaje
chore: actualizar dependencias de expo
```

---

## 🗂️ Tipos permitidos

| Tipo       | Descripción                                        |
|------------|----------------------------------------------------|
| feat       | Nueva funcionalidad o módulo                       |
| fix        | Corrección de errores                              |
| docs       | Cambios en documentación                           |
| style      | Cambios de formato, sin afectar funcionalidad      |
| refactor   | Reestructuración de código (sin cambio funcional)  |
| test       | Agregado o modificación de pruebas                 |
| chore      | Tareas de mantenimiento (scripts, configs, deps)   |

---

## 🎯 Recomendaciones

- Usa verbos en infinitivo: *agregar*, *actualizar*, *corregir*, etc.
- El mensaje debe ser claro, breve y consistente.
- Para cambios grandes, considera usar un ámbito (`(herbolario)`, `(home)`, etc.).

---

Más información: [ConventionalCommits.org](https://www.conventionalcommits.org/)
