======================================
🐛 DEBUG RUNNER - GUÍA DE INICIO
======================================

INICIO RÁPIDO (30 segundos)
1. Abre index.html en tu navegador
2. Presiona "🎮 Iniciar Juego"
3. ¡A jugar!

NO necesitas instalar nada. Funciona en cualquier navegador moderno.

======================================
🎮 CÓMO JUGAR
======================================

TOQUE/CLICK RÁPIDO
→ SALTA sobre bugs rojos 🔴 (Null Error)

MANTÉN PRESIONADO
→ AGÁCHATE bajo bugs naranjas 🟠 (Overflow)

DOBLE TOQUE/CLICK RÁPIDO
→ GOLPEA bugs amarillos 🟡 (Syntax Error)

======================================
📁 ARCHIVOS DEL PROYECTO
======================================

index.html          ← Abre esto en el navegador (PRINCIPAL)
game.js             ← Lógica del juego en JavaScript vanilla
styles.css          ← Estilos y animaciones CSS
README.txt          ← Este archivo

======================================
🔧 CAMBIAR DIFICULTAD
======================================

Archivo: game.js (línea ~15)

FÁCIL:
    INITIAL_LIVES: 5
    BUG_SPEED: 4
    SPAWN_RATE: 150

NORMAL (por defecto):
    INITIAL_LIVES: 3
    BUG_SPEED: 8
    SPAWN_RATE: 100

DIFÍCIL:
    INITIAL_LIVES: 1
    BUG_SPEED: 12
    SPAWN_RATE: 60

======================================
🎨 PERSONALIZAR APARIENCIA
======================================

CAMBIAR COLOR DEL JUGADOR:
Archivo: styles.css (línea ~315)
Busca: .runner-body { background: #FF6B6B; }
Cambia el color #FF6B6B por otro

CAMBIAR COLOR DEL BOTÓN:
Archivo: styles.css (línea ~450)
Busca: .control-button { background: linear-gradient(...) }
Cambia los colores

CAMBIAR TAMAÑOS:
Archivo: styles.css
.runner { width: 40px; height: 60px; }
.bug { width: 50px; height: 50px; }

======================================
🆕 AGREGAR NUEVOS TIPOS DE BUGS
======================================

Archivo: game.js (línea ~50)

Agrega en el array BUG_TYPES:

{
    type: 'mi_nuevo_bug',
    icon: '🆕',
    label: 'Mi Bug',
    requiredAction: 'jump',    // 'jump', 'duck' o 'hit'
    color: '#00FFFF'
}

======================================
🛠️ SOLUCIONAR PROBLEMAS
======================================

PROBLEMA: El botón no responde
SOLUCIÓN: Recarga la página (F5)

PROBLEMA: El juego va muy lento
SOLUCIÓN: En game.js, aumenta SPAWN_RATE a 150 o más

PROBLEMA: El juego va muy rápido
SOLUCIÓN: En game.js, reduce BUG_SPEED a 5 o menos

PROBLEMA: No aparecen los bugs
SOLUCIÓN: Verifica que SPAWN_RATE sea menor que 150

======================================
📱 DISPOSITIVOS COMPATIBLES
======================================

✅ Desktop (Firefox, Chrome, Safari, Edge)
✅ Tablet (iPad, Android)
✅ Móvil (iPhone, Android)
✅ Táctil, ratón y teclado (Espacio)

======================================
🔑 PARÁMETROS IMPORTANTES (game.js)
======================================

Línea ~15 - CONFIGURACIÓN DEL JUEGO:

INITIAL_LIVES: 3               // Vidas iniciales
BUG_SPEED: 8                   // Velocidad de bugs (px/frame)
BUG_SPEED_VARIANCE: 2          // Variación de velocidad
SPAWN_RATE: 100                // Frecuencia de spawn (frames)
POINTS_PER_BUG_HIT: 50         // Puntos por golpear bug
POINTS_PER_DISTANCE: 10        // Puntos por distancia
CRASH_ANIMATION_DURATION: 500  // Tiempo de invulnerabilidad (ms)
PLAYER_HEIGHT: 60              // Alto del jugador
PLAYER_WIDTH: 40               // Ancho del jugador
BUG_SIZE: 50                   // Tamaño de los bugs

Línea ~180 - SENSIBILIDAD DE GESTOS:

HOLD_DURATION: 300             // ms para activar "hold" (agacharse)
DOUBLE_TAP_WINDOW: 300         // ms para detectar doble-tap
ACTION_COOLDOWN: 100           // ms de debouncing

======================================
🎓 CONCEPTOS EDUCATIVOS
======================================

✅ Errores de Programación:
   - Null Error: referencias nulas
   - Overflow: desbordamiento
   - Syntax Error: errores de sintaxis

✅ Debugging: identificación y corrección de problemas

✅ Programación en Videojuegos:
   - Game loop (requestAnimationFrame)
   - Detección de colisiones (bounding boxes)
   - Manejo de eventos (mouse, touch, keyboard)
   - Animaciones CSS

======================================
🚀 FLUJO DE JUEGO
======================================

1. Abre index.html
2. Ve el menú con instrucciones
3. Presiona "Iniciar Juego"
4. Aparecen bugs aleatorios
5. Usas gestos para evitarlos o corregirlos
6. Ganas puntos por distancia y bugs corregidos
7. Pierdes vidas por colisiones
8. Game Over cuando llega a 0 vidas
9. Opción de reintentar o volver al menú

======================================
💡 CONSEJOS PARA JUGAR
======================================

- Los bugs vienen a diferentes velocidades (impredecibles)
- Usa gestos correctos o fallarás (acción errada = colisión)
- Los puntos aumentan a medida que corres más
- Cada bug corregido suma puntos extra
- En móvil, el botón es más grande para mejor control
- En versiones difíciles, necesitas reflejos rápidos

======================================
🎯 MEJORAS FUTURAS (OPCIONAL)
======================================

Puedes agregar fácilmente:
- Sonidos (Web Audio API)
- High scores (localStorage)
- Niveles progresivos
- Power-ups especiales
- Modo multijugador

======================================
📊 SISTEMA DE PUNTUACIÓN
======================================

- +1 punto cada 10 frames por distancia
- +50 puntos por golpear un bug
- -1 vida por colisionar
- Game Over cuando vidas = 0

======================================
🌐 EJECUTAR CON SERVIDOR LOCAL (OPCIONAL)
======================================

Si necesitas ejecutar con servidor:

Python 3:
python -m http.server 8000

Node.js:
npx http-server

Luego abre: http://localhost:8000

(Pero normalmente puedes abrir index.html directamente)

======================================
📞 PREGUNTAS FRECUENTES
======================================

¿Necesito instalar dependencias?
NO. HTML, CSS, JavaScript vanilla. Solo abre index.html.

¿Qué navegadores funciona?
Cualquiera moderno: Chrome, Firefox, Safari, Edge

¿Funciona en móvil?
SÍ. iOS y Android, con soporte táctil.

¿Cómo cambio la dificultad?
Edita game.js línea ~15 (GAME_CONFIG)

¿Cómo agrego nuevos bugs?
Edita game.js línea ~50 (BUG_TYPES)

¿Es educativo?
SÍ. Enseña sobre debugging, errores de programación y videojuegos.

======================================
✨ CARACTERÍSTICAS PRINCIPALES
======================================

🎮 Jugabilidad Divertida
   - 3 gestos diferentes
   - 3 tipos de bugs
   - Puntuación progresiva

🎨 Visual Atractivo
   - Gradientes y animaciones suaves
   - Efectos de colisión
   - Interfaz responsive (desktop/tablet/móvil)

📱 Accesible
   - Funciona en cualquier navegador
   - Soporte táctil, ratón y teclado
   - Etiquetas ARIA para accesibilidad

🚀 Educativo
   - Enseña sobre errores de programación
   - Desarrolla reflejos y reacción rápida
   - Perfecto para aprender conceptos de game dev

======================================
¡LISTO PARA JUGAR!
======================================

Abre index.html en tu navegador y ¡que comience la diversión! 🚀

Ver README.txt para más detalles.
