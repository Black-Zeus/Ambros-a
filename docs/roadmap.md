# 🧭 Roadmap — Ambrosía (MVP y más allá)

> Estado del proyecto: Fase conceptual  
> Tecnología base: React Native + Expo  
> Modalidad: Offline-first, sin backend

---

## 🔥 Módulos MVP (mínimo viable)

1. **Splash / Ritual de Inicio**
   - Caldero animado con humo
   - Frase: *“Enciende el fuego, respira hondo...”*

2. **Página Principal (Hogar)**
   - Lista de recetas por categoría
   - Buscador básico

3. **Ver Receta**
   - Detalles: ingredientes, pasos, notas
   - Indicador de linaje (si es receta “de sangre”)
   - Imagen opcional
   - Botón compartir (lechuza)

4. **Crear / Modificar Receta**
   - Formulario con campos esenciales
   - Opción de marcar como receta original

5. **Herbolario**
   - Lista de ingredientes con nombres simbólicos
   - Agregado manual de ingredientes

---

## 🌿 Módulos para versión completa (v1.0)

6. **Árbol de Transmutación**
   - Visualización de recetas derivadas
   - Relación gráfica entre versiones

7. **Linaje / Recetas de Sangre**
   - Submódulo transversal para marcar recetas inmutables
   - Filtro de visualización especial

8. **Quién Soy**
   - Nombre místico / avatar del usuario
   - Rol dentro del grimorio (druida, aprendiz...)

9. **Acerca de / Manifiesto**
   - Descripción del origen y filosofía del proyecto
   - Credo mágico-narrativo

10. **Plantilla HTML / Vista estilo pergamino**
    - Estética para compartir recetas como imagen o PDF

---

## ☁️ Módulos opcionales (futuros)

11. **Compartir**
    - Generación de imagen con receta o texto para compartir
    - Iconografía narrativa (lechuza como mensajera)

12. **Backup con Google**
    - Sincronización opcional para usuarios con Google Drive

13. **Configuración**
    - Preferencias visuales (modo oscuro/pergamino)
    - Idioma, restauración, exportación

---

## ❌ Módulos descartados explícitamente

- Ranking o sistema de likes
- Comentarios y concursos
- Geolocalización, mapas o delivery
- Backend, cuentas de usuario, redes sociales

---


## 🧪 MVP — Funcionalidades mínimas

- [ ] Ver listado de recetas.
- [ ] Crear y guardar receta.
- [ ] Ver receta con detalles.
- [ ] Herbolario básico.
- [ ] Guardado offline.
- [ ] Splash screen con ambientación mágica.
- [ ] Interfaz coherente con narrativa del grimorio.
- [ ] Atribución a recetas originales (marcadas como “de sangre”).

---

## 🌿 Post-MVP (futuras versiones)

- [ ] Compartir receta por imagen o texto plano.
- [ ] Sincronizar con Google Drive (modo backup).
- [ ] Crear “colecciones mágicas” de recetas.
- [ ] Funcionalidad de búsqueda avanzada.
- [ ] Animaciones (caldero burbujeando, fuego, partículas).
- [ ] Generar PDF estilo pergamino.
- [ ] Navegación por símbolos y no solo texto.

----
## 🗺️ Mapa Visual de Navegación (Árbol de Pantallas)

```text
🌿 Ambrosía
└── 🔮 Splash / Ritual de Inicio
    └── 🏠 Home (Página Principal)
        ├── 🔍 Buscador de recetas
        ├── 📖 Ver Receta
        │   └── 🦉 Compartir Receta (Lechuza)
        │       └── 📜 Plantilla HTML (Pergamino)
        ├── ✍️ Crear / Modificar Receta
        │   ├── 🧬 Marcar como receta de sangre (Linaje)
        │   └── 🌳 Árbol de Transmutación
        ├── 🌿 Herbolario
        ├── 🧙 Quién Soy
        ├── 📚 Acerca de / Manifiesto
        └── ⚙️ Configuración
            ├── 🎨 Modo visual (Oscuro / Pergamino)
            ├── ☁️ Backup con Google (Opcional)
            └── ♻️ Restaurar / Exportar
```

