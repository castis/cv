"use strict";

const rangeRand = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

const group: Element = document.querySelector(".photo svg");
const pieces: NodeListOf<Element> = group.querySelectorAll("g circle, g path");

function rotateSVGPieces() {
  const piece: Element = pieces[Math.floor(Math.random() * pieces.length)];
  piece.classList.add("hide");
  setTimeout(() => {
    piece.classList.remove("hide");
  }, rangeRand(1000, 2000));
  setTimeout(rotateSVGPieces, rangeRand(200, 1000));
}
rotateSVGPieces();

const container: Element = document.querySelector(".me");
const canvas: HTMLCanvasElement = container.querySelector("canvas");
const context: CanvasRenderingContext2D = canvas.getContext("2d");

interface PhaseFunc {
  (x: number): number;
}

interface PhaseContainer {
  white: PhaseFunc;
  random: PhaseFunc;
}

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

const resize = () => (canvas.width = container.clientWidth);
window.addEventListener("resize", resize);
resize();

interface PhaseContainer {
  white: PhaseFunc;
  random: PhaseFunc;
}

const shapes = {
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

  circle: (state: Particle) => {
    // y - radius to spawn above the top border
    context.arc(state.x, state.y + state.radius, state.radius, 0, 6.2832);
  },
};

const phases: PhaseContainer = {
  white: (x) => 0,
  random: (x) => Math.floor(Math.random() * 20),
};

const defaults = {
  shape: "bar",
  phase: phases.white,
};

function color(state: Particle): string {
  if (state.phase) {
    const { phase, y } = state;
    const coeff = 0.0314 * y + phase;
    return (
      Math.floor(Math.sin(coeff + 2) * 127 + 128) +
      "," +
      Math.floor(Math.sin(coeff + 0) * 127 + 128) +
      "," +
      Math.floor(Math.sin(coeff + 4) * 127 + 128)
    )
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

function update(state?: Particle): Particle {
  if (!state || state.alpha < 0) {
    return newParticle();
  }
  return {
    ...state,
    y: state.y - state.velocity,
    alpha: state.alpha - 0.02,
    velocity: state.velocity + 0.03,
    color: color(state),
  };
}

function draw(state: Particle): void {
  context.beginPath();

  shapes[state.shape](state);

  context.fillStyle = "rgba(" + state.color + "," + state.alpha + ")";
  context.fill();
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

function run() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = particles.length; i--; ) {
    draw((particles[i] = update(particles[i])));
  }
  requestAnimationFrame(run);
}
run();

const over = () => {
  defaults.phase = phases.random;
  defaults.shape = "circle";
};

const out = () => {
  defaults.phase = phases.white;
  defaults.shape = "bar";
};

document.querySelectorAll("footer, canvas").forEach((ele) => {
  ele.addEventListener("mouseover", over);
  ele.addEventListener("mouseout", out);
});
