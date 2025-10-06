const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

const tubosCanvas = document.getElementById('tubos');
const tuboSCtx = tubosCanvas.getContext('2d');

// --- Config ---
const TUBO_W = 60;
const GAP = 160;
const MIN_TOP = 40;
const VEL = 3; // píxeles por frame normalizado (dt≈1)

// --- Pájaro ---
const bird = {
  x: 80,
  y: 200,
  r: 15,
  vy: 0,
  gravity: 0.2,
  jump: -6.5
};

// --- Estado ---
const TUBOS = [];
let spawnTimer = 0;

// --- Util ---
function randomEntre(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Crear un tubo nuevo
function crearTubo() {
  const maxTop = tubosCanvas.height - GAP - MIN_TOP;
  const topH = randomEntre(MIN_TOP, maxTop);
  TUBOS.push({ x: tubosCanvas.width, topH });
}

// Actualiza y dibuja tubos
function actualizarYdibujarTubos(dt) {
  for (const t of TUBOS) t.x -= VEL * dt;

  tuboSCtx.clearRect(0, 0, tubosCanvas.width, tubosCanvas.height);
  tuboSCtx.fillStyle = "red";

  for (const t of TUBOS) {
    tuboSCtx.fillRect(t.x, 0, TUBO_W, t.topH); // tubo arriba
    const yGap = t.topH + GAP;
    tuboSCtx.fillRect(t.x, yGap, TUBO_W, tubosCanvas.height - yGap); // tubo abajo
  }

  while (TUBOS.length && TUBOS[0].x + TUBO_W < 0) TUBOS.shift();
}

// Actualiza y dibuja pájaro
function actualizarPajaro() {
  bird.vy += bird.gravity;
  bird.y += bird.vy;

  if (bird.y + bird.r > canvas.height) bird.y = canvas.height - bird.r;
  if (bird.y - bird.r < 0) bird.y = bird.r;

  ctx.beginPath();
  ctx.arc(bird.x, bird.y, bird.r, 0, Math.PI * 2);
  ctx.fillStyle = "yellow";
  ctx.fill();
  ctx.stroke();
}

// --- Bucle principal ---
let last = 0;
function loop(t) {
  const dt = (t - last) / 16.666;
  last = t;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  actualizarYdibujarTubos(dt);
  actualizarPajaro();

  spawnTimer += dt;
  if (spawnTimer >= 90) {
    crearTubo();
    spawnTimer = 0;
  }

  requestAnimationFrame(loop);
}

// Arranque
crearTubo();
requestAnimationFrame(loop);

// Control salto
window.addEventListener("keydown", e => {
  if (e.code === "ArrowUp") bird.vy = bird.jump;
});
