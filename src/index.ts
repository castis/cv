const rangeRand = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

const group: Element = document.querySelector(".photo svg")!;
const pieces: NodeListOf<Element> = group.querySelectorAll("g circle, g path");

function rotateSVGPieces() {
  const piece: Element = pieces[Math.floor(Math.random() * pieces.length)];
  piece.classList.add("hide");
  setTimeout(
    () => {
      piece.classList.remove("hide");
    },
    rangeRand(1000, 2000),
  );
  setTimeout(rotateSVGPieces, rangeRand(200, 1000));
}
rotateSVGPieces();

const container: Element = document.querySelector(".me")!;
const canvas: HTMLCanvasElement = container.querySelector("canvas")!;
const context: CanvasRenderingContext2D = canvas.getContext("2d")!;

interface Particle {
  alpha: number;
  x: number;
  y: number;
  radius: number;
  velocity: number;
  color: string;
  phase: number;
  shape: string;
}

let particles: Array<Particle> = [];
const fps = 40;
const interval = 1000 / fps;
let lastTime = 0;
const rateOfChange = 0.03;

const resize = () => (canvas.width = container.clientWidth);
window.addEventListener("resize", resize);
resize();

interface Shape {
  (state: Particle): void;
}

interface ShapeContainer {
  [index: string]: Shape;
}

const shapes: ShapeContainer = {
  bar: (state: Particle) => {
    // tie width to alpha
    const width = state.radius * 2 + state.alpha * 10;
    const height = 120;
    const x = state.x - state.alpha * 2;
    const y = state.y + 120;

    context.moveTo(x, y); // bottom left
    context.lineTo(x + width, y); // bottom right
    context.lineTo(x + width, y - height); // top right
    context.lineTo(x, y - height); // top left
  },

  triangle: (state: Particle) => {
    const len = state.radius * 3;
    const y = state.y + len; // make sure it forms above the top border

    context.moveTo(state.x, y); // left
    context.lineTo(state.x + len / 2, y - len * 0.9); // center
    context.lineTo(state.x + len, y); // right
  },

  circle: (state: Particle) => {
    // y - radius to spawn above the top border
    context.arc(state.x, state.y + state.radius, state.radius, 0, 6.2832);
  },
};

interface Phasers {
  [index: string]: {
    (x: number): number;
  };
}

const phasers: Phasers = {
  white: (x) => 0,
  rainbow: (x) => x / 50,
  random: (x) => Math.floor(Math.random() * 20),
};

const defaults = {
  shape: "bar",
  phase: phasers.white,
};

function color(state: Particle): string {
  if (state.phase) {
    const coeff = 0.0314 * state.y + state.phase;
    return (
      Math.floor(Math.sin(coeff + 2) * 127 + 128) +
      "," +
      Math.floor(Math.sin(coeff + 0) * 127 + 128) +
      "," +
      Math.floor(Math.sin(coeff + 4) * 127 + 128)
    );
  }
  return state.color;
}

function newParticle(): Particle {
  const radius: number = 0.05 + Math.random() * 5.3;
  const x: number =
    Math.floor(Math.random() * (canvas.width - radius * 2 - 3)) + radius;

  return {
    x,
    radius,
    y: canvas.height,
    alpha: 0.8 + Math.random() * 0.3,
    velocity: Math.random(),
    color: "255,255,255",
    phase: defaults.phase(x),
    shape: defaults.shape,
  };
}

function update(speed: number = 0, state?: Particle): Particle {
  if (!state || state.alpha < 0) {
    return newParticle();
  }

  state.y = state.y - state.velocity * speed;
  state.alpha = state.alpha - 0.02 * speed;
  state.velocity = state.velocity + 0.03 * speed;
  state.color = color(state);
  return state;
}

// slowly add new particles otherwise
// they appear in waves and it looks like shit
const maxParticles: number = 50;
function addParticles() {
  if (particles.length < maxParticles) {
    for (let i = 0; i < 10; i++) {
      particles.push(update());
    }
    setTimeout(addParticles, 500);
  }
}
addParticles();

function updateParticles(deltaTime: number) {
  const speed = deltaTime * rateOfChange;
  for (let i = particles.length; i--; ) {
    particles[i] = update(speed, particles[i]);
  }
}

function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length; i--; ) {
    const state = particles[i];

    context.beginPath();

    shapes[state.shape](state);

    context.fillStyle = "rgba(" + state.color + "," + state.alpha + ")";
    context.fill();
  }
}

function gameLoop(currentTime: number) {
  const deltaTime = currentTime - lastTime;

  updateParticles(deltaTime);

  if (deltaTime >= interval) {
    lastTime = currentTime;
    render();
  }

  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);

const over = () => {
  defaults.phase = phasers.rainbow;
  defaults.shape = "circle";
};

const out = () => {
  defaults.phase = phasers.white;
  defaults.shape = "bar";
};

document.querySelectorAll("footer, canvas").forEach((ele) => {
  ele.addEventListener("mouseover", over);
  ele.addEventListener("mouseout", out);
});
