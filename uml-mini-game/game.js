// ========================================
// CONFIGURACIÓN DEL JUEGO
// Modifica estos valores para cambiar dificultad
// ========================================
const GAME_CONFIG = {
    INITIAL_LIVES: 3,
    BUG_SPEED: 4,
    BUG_SPEED_VARIANCE: 2,
    SPAWN_RATE: 150,
    POINTS_PER_BUG_HIT: 50,
    POINTS_PER_DISTANCE: 10,
    CRASH_ANIMATION_DURATION: 500,
    PLAYER_HEIGHT: 60,
    PLAYER_WIDTH: 40,
    BUG_SIZE: 50
};

// ========================================
// TIPOS DE BUGS
// Estructura: {type, icon, label, requiredAction, color}
// ========================================
const BUG_TYPES = [
    {
        type: 'null_error',
        icon: '🔴',
        label: 'Null Error',
        requiredAction: 'jump',
        color: '#FF4444'
    },
    {
        type: 'overflow',
        icon: '🟠',
        label: 'Overflow',
        requiredAction: 'duck',
        color: '#FF9944'
    },
    {
        type: 'syntax_error',
        icon: '🟡',
        label: 'Syntax Error',
        requiredAction: 'hit',
        color: '#FFD700'
    }
];

// ========================================
// ESTADO DEL JUEGO
// ========================================
let gameState = {
    lives: GAME_CONFIG.INITIAL_LIVES,
    score: 0,
    distance: 0,
    bugs: [],
    playerAction: 'idle',
    isInvulnerable: false,
    gameActive: false,
    frameCount: 0
};

// Añadimos posición del jugador para permitir movimiento con teclas
gameState.playerX = 50; // posición horizontal (px desde la izquierda)
gameState.playerBottom = 100; // distancia desde el bottom (px)
gameState.moveLeft = false;
gameState.moveRight = false;
gameState.moveUp = false;
gameState.moveDown = false;

// Gestos
let gestureState = {
    isPressed: false,
    pressStartTime: null,
    tapCount: 0,
    lastTapTime: 0
};

// ========================================
// ELEMENTOS DEL DOM
// ========================================
const elements = {
    menuScreen: document.getElementById('menuScreen'),
    gameScreen: document.getElementById('gameScreen'),
    gameOverScreen: document.getElementById('gameOverScreen'),
    startGameBtn: document.getElementById('startGameBtn'),
    retryBtn: document.getElementById('retryBtn'),
    menuBtn: document.getElementById('menuBtn'),
    controlBtn: document.getElementById('controlBtn'),
    player: document.getElementById('player'),
    runnerContainer: document.querySelector('.runner-container'),
    gameArea: document.getElementById('gameArea'),
    bugsContainer: document.getElementById('bugsContainer'),
    livesDisplay: document.getElementById('livesDisplay'),
    distanceDisplay: document.getElementById('distanceDisplay'),
    scoreDisplay: document.getElementById('scoreDisplay'),
    finalScore: document.getElementById('finalScore'),
    finalDistance: document.getElementById('finalDistance'),
    gestureIndicator: document.getElementById('gestureIndicator')
};

// Elementos del cuestionario (se agregan dinámicamente en index.html)
// ---------- MOD: Preguntas (UI) ----------
// Los siguientes elementos corresponden al modal que aparece
// cuando el jugador choca con un bug. Si cambias la estructura
// del modal en `index.html`, actualiza aquí los selectores.
// - `questionModal` es el overlay/modal
// - `questionText` contendrá el texto de la pregunta
// - `choicesContainer` contendrá botones con las opciones
elements.questionModal = document.getElementById('questionModal');
elements.questionText = document.getElementById('questionText');
elements.choicesContainer = document.getElementById('choicesContainer');
// ---------- FIN MOD ----------

// ========================================
// PANTALLAS
// ========================================
function showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    
    if (screenName === 'menu') {
        elements.menuScreen.classList.add('active');
    } else if (screenName === 'game') {
        elements.gameScreen.classList.add('active');
    } else if (screenName === 'gameOver') {
        elements.gameOverScreen.classList.add('active');
    }
}

// ========================================
// INICIAR JUEGO
// ========================================
function startGame() {
    gameState = {
        lives: GAME_CONFIG.INITIAL_LIVES,
        score: 0,
        distance: 0,
        bugs: [],
        playerAction: 'idle',
        isInvulnerable: false,
        gameActive: true,
        frameCount: 0,
        // preservar e inicializar posición y controles del jugador
        playerX: 50,
        playerBottom: 100,
        moveLeft: false,
        moveRight: false,
        moveUp: false,
        moveDown: false,
        touchStartX: 0,
        touchStartY: 0,
        touchActive: false
    };
    
    elements.bugsContainer.innerHTML = '';
    updateUI();
    showScreen('game');
    gameLoop();
}

// ========================================
// GENERAR BUG
// ========================================
function generateBug() {
    const bugType = BUG_TYPES[Math.floor(Math.random() * BUG_TYPES.length)];
    const speed = GAME_CONFIG.BUG_SPEED + 
                  (Math.random() - 0.5) * 2 * GAME_CONFIG.BUG_SPEED_VARIANCE;
    
    return {
        id: Math.random(),
        type: bugType.type,
        x: window.innerWidth,
        y: Math.random() * (window.innerHeight - GAME_CONFIG.BUG_SIZE - 100) + 50,
        speed: speed,
        icon: bugType.icon,
        label: bugType.label,
        requiredAction: bugType.requiredAction,
        color: bugType.color,
        hit: false,
        element: null
    };
}

// ========================================
// CREAR ELEMENTO DEL BUG
// ========================================
function createBugElement(bug) {
    const bugDiv = document.createElement('div');
    bugDiv.className = 'bug';
    bugDiv.style.left = bug.x + 'px';
    bugDiv.style.top = bug.y + 'px';
    bugDiv.style.backgroundColor = bug.color;
    bugDiv.role = 'img';
    bugDiv.ariaLabel = bug.label;
    
    bugDiv.innerHTML = `
        <span class="bug-icon">${bug.icon}</span>
        <span class="bug-label">${bug.label.split(' ')[0]}</span>
    `;
    
    elements.bugsContainer.appendChild(bugDiv);
    return bugDiv;
}

// ========================================
// DETECTAR COLISIONES
// ========================================
function checkCollision(bugX, bugY, playerAction) {
    // Usar posición dinámica del jugador (gameState.playerX, gameState.playerBottom)
    const playerX = gameState.playerX;
    // Convertir playerBottom a coordenada Y relativa (top)
    const playerTop = window.innerHeight - gameState.playerBottom - GAME_CONFIG.PLAYER_HEIGHT;

    let playerHitboxHeight = GAME_CONFIG.PLAYER_HEIGHT;
    let playerHitboxY = playerTop;

    if (playerAction === 'jumping') {
        playerHitboxY -= 40; // se desplaza hacia arriba
        playerHitboxHeight = 30;
    } else if (playerAction === 'ducking') {
        playerHitboxHeight = 20;
        playerHitboxY += 40; // se reduce hacia abajo
    }
    
    const collision = !(
        playerX + GAME_CONFIG.PLAYER_WIDTH < bugX ||
        playerX > bugX + GAME_CONFIG.BUG_SIZE ||
        playerHitboxY + playerHitboxHeight < bugY ||
        playerHitboxY > bugY + GAME_CONFIG.BUG_SIZE
    );
    
    return collision;
}

// ========================================
// MANEJAR ACCIÓN DEL CONTROL
// ========================================
function handleControlAction(action) {
    if (!gameState.gameActive) return;
    if (gameState.playerAction !== 'idle') return;
    
    const actionDurations = {
        jump: 400,
        duck: 600,
        hit: 300
    };
    
    gameState.playerAction = action;
    gameState.isInvulnerable = true;
    updatePlayerAnimation();
    
    setTimeout(() => {
        gameState.playerAction = 'idle';
        gameState.isInvulnerable = false;
        updatePlayerAnimation();
    }, actionDurations[action] || 300);
}

// ========================================
// PREGUNTAS / CUESTIONARIO
// ========================================
// Aquí puedes editar las preguntas del juego. La estructura es:
// const QUESTIONS = {
//   easy: [ { q: 'Texto pregunta', choices: ['op1','op2','op3'], a: 0 }, ... ],
//   medium: [ ... ],
//   hard: [ ... ]
// };
//
// Campos por objeto de pregunta:
// - q: (string) texto de la pregunta en español
// - choices: (array) lista de opciones (strings)
// - a: (number) índice 0-based de la opción correcta
//
// Recomendaciones:
// - Mantén 3 opciones por pregunta para UI consistente.
// - `a` debe ser un índice dentro de `choices` (0,1,2).
// - Puedes añadir más preguntas a cada nivel; se seleccionan aleatoriamente.
// - Si quieres añadir explicación o tiempo límite, puedo ayudarte a
//   extender la estructura (por ejemplo: { q, choices, a, explanation, timeLimit }).
//
// ------------------- EJEMPLO y PREGUNTAS INICIALES -------------------
const QUESTIONS = {
    easy: [
        // Ejemplo: respuesta correcta es la primera opción (a:0)
        { q: '¿Qué beneficio principal tienen las entrevistas?', choices: ['Permiten obtener información detallada y granular sobre los requerimientos', 'Permiten obtener ideas rápidamente de un grupo grande', 'Permiten obtener información sin interactuar con el usuario','Solo sirven para validar información ya conocida'], a: 0 },
        { q: '¿Cuál es una característica clave de las encuestas?', choices: ['No deben tener fecha límite', 'Solo pueden tener preguntas abiertas.', 'Son más lentas que entrevistar a cada usuario','Deben enfocarse en los objetivos de negocio'], a: 3 }
    ],
    medium: [
        { q: '¿Qué regla es importante en la tormenta de ideas?', choices: ['Evaluar ideas desde el inicio', 'No permitir críticas a las ideas durante su generación.', 'Minificación','Limitar la cantidad de ideas aceptadas.'], a: 1 },
        { q: '¿Quién debería escribir una historia de usuario?', choices: ['Solamente el analista de sistemas', 'El equipo de marketing', 'El cliente o interesado, con apoyo del facilitador','El facilitador sin intervención del cliente'], a: 2 }
    ],
    hard: [
        { q: '¿Qué se busca en la primera fase de una tormenta de ideas?', choices: ['Criticar las ideas para descartar rápido', 'Elegir primero la mejor idea', 'Generar la mayor cantidad de ideas posible','Evitar que se generen demasiadas ideas.'], a: 2 },
        { q: '¿Qué tipo de preguntas son útiles para identificar información faltante?', choices: ['Preguntas abiertas', 'Preguntas cerradas', 'Preguntas silenciosas','Preguntas de taller'], a: 0 }
    ]
};

let questionState = {
    level: 0, // 0: easy, 1: medium, 2: hard
    awaitingAnswer: false
};

function pickQuestion() {
    const levelKey = questionState.level === 0 ? 'easy' : (questionState.level === 1 ? 'medium' : 'hard');
    const pool = QUESTIONS[levelKey];
    return pool[Math.floor(Math.random() * pool.length)];
}

function presentQuestion(onAnswered) {
    if (!elements.questionModal) return onAnswered && onAnswered(false);
    const q = pickQuestion();
    elements.questionText.textContent = q.q;
    elements.choicesContainer.innerHTML = '';
    q.choices.forEach((choiceText, idx) => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choiceText;
        btn.addEventListener('click', () => {
            const correct = (idx === q.a);
            btn.classList.add(correct ? 'correct' : 'wrong');
            // marcar todas para feedback
            Array.from(elements.choicesContainer.children).forEach(c => c.disabled = true);
            // esperar breve y luego ocultar
            setTimeout(() => {
                elements.questionModal.classList.remove('active');
                questionState.awaitingAnswer = false;
                // si correcto, subir dificultad lentamente
                if (correct) {
                    questionState.level = Math.min(2, questionState.level + 1);
                }
                // aumentar velocidad tras cada pregunta
                GAME_CONFIG.BUG_SPEED += correct ? 0.5 : 1.0;
                GAME_CONFIG.SPAWN_RATE = Math.max(60, GAME_CONFIG.SPAWN_RATE - (correct ? 4 : 8));
                if (onAnswered) onAnswered(correct);
            }, 700);
        });
        elements.choicesContainer.appendChild(btn);
    });
    // mostrar modal
    elements.questionModal.classList.add('active');
    questionState.awaitingAnswer = true;
}

// ========================================
// ACTUALIZAR ANIMACIÓN DEL JUGADOR
// ========================================
function updatePlayerAnimation() {
    const player = elements.player;
    player.className = 'runner ' + gameState.playerAction;
    
    if (gameState.isInvulnerable) {
        player.classList.add('invulnerable');
    } else {
        player.classList.remove('invulnerable');
    }
    
    // Cambiar emoji según acción
    const headElement = player.querySelector('.runner-head');
    if (gameState.playerAction === 'hitting') {
        headElement.textContent = '👊';
    } else {
        headElement.textContent = '🤖';
    }

    // Posicionar el contenedor del runner según la posición dinámica
    if (elements.runnerContainer) {
        elements.runnerContainer.style.left = Math.max(0, Math.min(window.innerWidth - GAME_CONFIG.PLAYER_WIDTH - 10, gameState.playerX)) + 'px';
        elements.runnerContainer.style.bottom = Math.max(0, gameState.playerBottom) + 'px';
    }
}

// ========================================
// ACTUALIZAR UI
// ========================================
function updateUI() {
    elements.livesDisplay.textContent = `❤️ ${gameState.lives}`;
    elements.distanceDisplay.textContent = `📏 ${gameState.distance}`;
    elements.scoreDisplay.textContent = `⭐ ${gameState.score}`;
}

// ========================================
// PROCESAR GOLPES A BUGS
// ========================================
function processHits() {
    if (gameState.playerAction === 'hitting') {
        gameState.bugs.forEach(bug => {
            if (!bug.hit) {
                const playerX = (typeof gameState.playerX === 'number') ? gameState.playerX : 50;
                const hitDistance = Math.abs(playerX - bug.x);

                if (hitDistance < 120) {
                    bug.hit = true;
                    gameState.score += GAME_CONFIG.POINTS_PER_BUG_HIT;
                    
                    if (bug.element) {
                        bug.element.classList.add('hit');
                        const checkmark = document.createElement('div');
                        checkmark.className = 'bug-corrected';
                        checkmark.textContent = '✓';
                        bug.element.appendChild(checkmark);
                    }
                }
            }
        });
    }
}

// ========================================
// GAME LOOP PRINCIPAL
// ========================================
let gameLoopId = null;

function gameLoop() {
    if (!gameState.gameActive) return;
    
    gameState.frameCount++;
    
    // MOVIMIENTO DEL JUGADOR CON TECLAS (si están presionadas)
    const MOVE_SPEED = 8; // px por frame
    if (gameState.moveLeft) {
        gameState.playerX = Math.max(10, gameState.playerX - MOVE_SPEED);
    }
    if (gameState.moveRight) {
        gameState.playerX = Math.min(window.innerWidth - GAME_CONFIG.PLAYER_WIDTH - 10, gameState.playerX + MOVE_SPEED);
    }
    // Movimiento vertical: up/down cambian la distancia desde el bottom
    if (gameState.moveUp) {
        // mover hacia arriba incrementa playerBottom (más distancia desde bottom)
        const maxBottom = window.innerHeight - GAME_CONFIG.PLAYER_HEIGHT - 10;
        gameState.playerBottom = Math.min(maxBottom, gameState.playerBottom + MOVE_SPEED);
    }
    if (gameState.moveDown) {
        // mover hacia abajo reduce playerBottom
        gameState.playerBottom = Math.max(10, gameState.playerBottom - MOVE_SPEED);
    }
    // Actualizar posición visual del jugador cada frame
    updatePlayerAnimation();
    
    // Incrementar distancia cada 10 frames
    if (gameState.frameCount % 10 === 0) {
        gameState.distance++;
        gameState.score += Math.floor(GAME_CONFIG.POINTS_PER_DISTANCE / 10);
    }
    
    // Generar nuevos bugs
    if (gameState.frameCount % GAME_CONFIG.SPAWN_RATE === 0) {
        const newBug = generateBug();
        newBug.element = createBugElement(newBug);
        gameState.bugs.push(newBug);
    }
    
    // Actualizar posiciones de bugs y detectar colisiones
    gameState.bugs = gameState.bugs.filter(bug => {
        bug.x -= bug.speed;
        
        if (bug.element) {
            bug.element.style.left = bug.x + 'px';
        }
        
        // Eliminar bugs que salieron de pantalla
        if (bug.x < -GAME_CONFIG.BUG_SIZE) {
            if (bug.element) bug.element.remove();
            return false;
        }
        
        // Detectar colisiones
        if (!bug.hit && !gameState.isInvulnerable) {
            const collision = checkCollision(bug.x, bug.y, gameState.playerAction);
            
            if (collision) {
                    // Si ya estamos esperando respuesta, ignorar colisiones adicionales
                    if (questionState.awaitingAnswer) return true;

                    // Pausar el juego (congelar frame loop) y mostrar pregunta
                    gameState.gameActive = false;
                    presentQuestion((correct) => {
                        // Al responder: si es incorrecto, pierde una vida
                        if (!correct) {
                            gameState.lives--;
                            // pequeña animación de invulnerabilidad
                            gameState.isInvulnerable = true;
                            updatePlayerAnimation();
                            setTimeout(() => {
                                gameState.isInvulnerable = false;
                                updatePlayerAnimation();
                            }, GAME_CONFIG.CRASH_ANIMATION_DURATION);
                        } else {
                            // premio por responder correctamente
                            gameState.score += Math.floor(GAME_CONFIG.POINTS_PER_BUG_HIT / 2);
                        }

                        updateUI();

                        // Revisar vidas y terminar si corresponde
                        if (gameState.lives <= 0) {
                            endGame();
                            return;
                        }

                        // Reanudar el juego
                        gameState.gameActive = true;
                        // continuar loop
                        gameLoop();
                    });

                    // Eliminar el bug que provocó la pregunta
                    if (bug.element) bug.element.remove();
                    return false;
                }
        }
        
        return true;
    });
    
    // Procesar golpes
    processHits();
    
    // Actualizar UI
    updateUI();
    
    // Siguiente frame
    gameLoopId = requestAnimationFrame(gameLoop);
}

// ========================================
// TERMINAR JUEGO
// ========================================
function endGame() {
    gameState.gameActive = false;
    elements.finalScore.textContent = gameState.score;
    elements.finalDistance.textContent = gameState.distance;
    showScreen('gameOver');
    cancelAnimationFrame(gameLoopId);
}

// ========================================
// SISTEMA DE GESTOS
// ========================================
const HOLD_DURATION = 300;
const DOUBLE_TAP_WINDOW = 300;
const ACTION_COOLDOWN = 100;

// SWIPE / TOUCH MOVEMENT CONFIG
const TOUCH_SWIPE_THRESHOLD = 30; // px mínimo para considerar un swipe

// Variables para touch swipe
gameState.touchStartX = 0;
gameState.touchStartY = 0;
gameState.touchActive = false;

let lastActionTime = 0;

function handleMouseDown() {
    if (Date.now() - lastActionTime < ACTION_COOLDOWN) return;
    
    gestureState.isPressed = true;
    gestureState.pressStartTime = Date.now();
    gestureState.tapCount++;
    
    const timeSinceLastTap = Date.now() - gestureState.lastTapTime;
    
    if (gestureState.tapCount === 2 && timeSinceLastTap < DOUBLE_TAP_WINDOW) {
        // DOUBLE-TAP: Golpear
        handleControlAction('hit');
        lastActionTime = Date.now();
        gestureState.tapCount = 0;
        gestureState.lastTapTime = 0;
        return;
    }
    
    gestureState.lastTapTime = Date.now();
    
    // Esperar a ver si es HOLD
    setTimeout(() => {
        if (gestureState.isPressed && gestureState.tapCount === 1) {
            // HOLD: Agacharse
            handleControlAction('duck');
            lastActionTime = Date.now();
            gestureState.tapCount = 0;
        }
    }, HOLD_DURATION);
    
    updateGestureIndicator();
}

function handleMouseUp() {
    gestureState.isPressed = false;
    const pressDuration = Date.now() - gestureState.pressStartTime;
    
    if (pressDuration < HOLD_DURATION && gestureState.tapCount === 1) {
        // Esperar a ver si viene segundo tap
        setTimeout(() => {
            if (gestureState.tapCount === 1) {
                // TAP simple: Saltar
                handleControlAction('jump');
                lastActionTime = Date.now();
                gestureState.tapCount = 0;
            }
        }, DOUBLE_TAP_WINDOW);
    }
    
    updateGestureIndicator();
}

function updateGestureIndicator() {
    if (gestureState.isPressed) {
        elements.gestureIndicator.textContent = '⏱️ Presionado';
        elements.gestureIndicator.className = 'indicator-active';
    } else {
        elements.gestureIndicator.textContent = 'Listo';
        elements.gestureIndicator.className = 'indicator-idle';
    }
}

// ========================================
// EVENT LISTENERS
// ========================================
elements.startGameBtn.addEventListener('click', startGame);
elements.retryBtn.addEventListener('click', startGame);
elements.menuBtn.addEventListener('click', () => showScreen('menu'));

elements.controlBtn.addEventListener('mousedown', handleMouseDown);
elements.controlBtn.addEventListener('mouseup', handleMouseUp);
elements.controlBtn.addEventListener('mouseleave', handleMouseUp);
elements.controlBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    handleMouseDown();
});
elements.controlBtn.addEventListener('touchend', (e) => {
    e.preventDefault();
    handleMouseUp();
});

// =====================
// TOUCH SWIPE MOVEMENT
// Detecta swipes sobre el área de juego para mover al jugador
// =====================
if (elements.gameArea) {
    elements.gameArea.addEventListener('touchstart', (e) => {
        if (!e.touches || e.touches.length === 0) return;
        const t = e.touches[0];
        gameState.touchStartX = t.clientX;
        gameState.touchStartY = t.clientY;
        gameState.touchActive = true;
        // Reset movement flags when new touch begins
        gameState.moveLeft = gameState.moveRight = gameState.moveUp = gameState.moveDown = false;
    });

    elements.gameArea.addEventListener('touchmove', (e) => {
        if (!gameState.touchActive || !e.touches || e.touches.length === 0) return;
        const t = e.touches[0];
        const dx = t.clientX - gameState.touchStartX;
        const dy = t.clientY - gameState.touchStartY;

        // Determinar dirección principal del swipe
        if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > TOUCH_SWIPE_THRESHOLD) {
            // Horizontal swipe
            if (dx > 0) {
                gameState.moveRight = true;
                gameState.moveLeft = false;
            } else {
                gameState.moveLeft = true;
                gameState.moveRight = false;
            }
            // Desactivar vertical mientras se mueve horizontalmente
            gameState.moveUp = false;
            gameState.moveDown = false;
        } else if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > TOUCH_SWIPE_THRESHOLD) {
            // Vertical swipe: tener en cuenta que clientY aumenta hacia abajo
            if (dy < 0) {
                // swipe hacia arriba -> mover hacia arriba
                gameState.moveUp = true;
                gameState.moveDown = false;
            } else {
                // swipe hacia abajo -> mover hacia abajo
                gameState.moveDown = true;
                gameState.moveUp = false;
            }
            // Desactivar horizontal mientras se mueve verticalmente
            gameState.moveLeft = false;
            gameState.moveRight = false;
        }

        // Evitar scroll de la página mientras jugamos
        e.preventDefault();
    }, { passive: false });

    elements.gameArea.addEventListener('touchend', (e) => {
        // Al terminar el touch, dejar de moverse
        gameState.touchActive = false;
        gameState.moveLeft = gameState.moveRight = gameState.moveUp = gameState.moveDown = false;
    });
}

// Soporte para teclado (Espacio)
document.addEventListener('keydown', (e) => {
    // Espacio/Enter siguen funcionando para gestos
    if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (!gestureState.isPressed) {
            handleMouseDown();
        }
        return;
    }

    // Flechas izquierda/derecha para mover al jugador
    if (e.code === 'ArrowLeft') {
        e.preventDefault();
        gameState.moveLeft = true;
        return;
    }
    if (e.code === 'ArrowRight') {
        e.preventDefault();
        gameState.moveRight = true;
        return;
    }
    // Flechas arriba/abajo para mover verticalmente
    if (e.code === 'ArrowUp') {
        e.preventDefault();
        gameState.moveUp = true;
        return;
    }
    if (e.code === 'ArrowDown') {
        e.preventDefault();
        gameState.moveDown = true;
        return;
    }
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'Space' || e.code === 'Enter') {
        e.preventDefault();
        if (gestureState.isPressed) {
            handleMouseUp();
        }
        return;
    }

    if (e.code === 'ArrowLeft') {
        e.preventDefault();
        gameState.moveLeft = false;
        return;
    }

    if (e.code === 'ArrowRight') {
        e.preventDefault();
        gameState.moveRight = false;
        return;
    }
    if (e.code === 'ArrowUp') {
        e.preventDefault();
        gameState.moveUp = false;
        return;
    }
    if (e.code === 'ArrowDown') {
        e.preventDefault();
        gameState.moveDown = false;
        return;
    }
});

// Mostrar menú al cargar
showScreen('menu');