"use strict";

const rangeRand = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const group: HTMLElement = document.querySelector(".photo svg");
const pieces: NodeListOf<HTMLElement> = group.querySelectorAll("g circle, g path");

function rotateSVGPieces() {
  const piece: HTMLElement = pieces[Math.floor(Math.random() * pieces.length)];
  piece.classList.add("hide");
  setTimeout(() => {
    piece.classList.remove("hide");
  }, rangeRand(1000, 2000));
  setTimeout(rotateSVGPieces, rangeRand(200, 1000));
}
rotateSVGPieces();

const container: HTMLElement = document.querySelector(".me");
const canvas: HTMLCanvasElement = container.querySelector("canvas");
const context: CanvasRenderingContext2D = canvas.getContext("2d");
let particles = [];

const resize = () => (canvas.width = container.clientWidth);
window.addEventListener("resize", resize);
resize();

const shapes = {
  bar: (state) => {
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

  circle: (state) => {
    // y - radius to spawn above the top border
    context.arc(state.x, state.y + state.radius, state.radius, 0, 6.2832);
  },

  triangle: (state) => {
    const len = state.radius * 3;
    const y = state.y + len; // make sure it forms above the top border

    context.moveTo(state.x, y); // left
    context.lineTo(state.x + len / 2, y - len * 0.9); // center
    context.lineTo(state.x + len, y); // right
  },
};

const phases = {
  white: () => {},
  rainbow: (x) => x / 50,
  random: () => parseInt(Math.random() * 20),
};

const defaults = {
  shape: "bar",
  phase: phases.white,
};

function color(state) {
  if (state.phase) {
    return (
      parseInt(Math.sin(0.0314 * state.y + 2 + state.phase) * 127 + 128) +
      "," +
      parseInt(Math.sin(0.0314 * state.y + 0 + state.phase) * 127 + 128) +
      "," +
      parseInt(Math.sin(0.0314 * state.y + 4 + state.phase) * 127 + 128)
    );
  }
  return state.color;
}

function update(state) {
  if (!state || state.alpha < 0) {
    const radius = 0.05 + Math.random() * 5.3;
    const x =
      Math.floor(Math.random() * (canvas.width - radius * 2 - 3)) + radius;

    return {
      x: x,
      y: canvas.height,
      alpha: 0.8 + Math.random() * 0.3,
      radius: radius,
      velocity: Math.random(),
      color: "255,255,255",
      phase: defaults.phase(x),
      shape: defaults.shape,
    };
  }

  return {
    x: state.x,
    y: state.y - state.velocity,
    alpha: state.alpha - 0.02,
    radius: state.radius,
    velocity: state.velocity + 0.03,
    color: color(state),
    phase: state.phase,
    shape: state.shape,
    debug: state.debug,
  };
}

function draw(state) {
  context.beginPath();

  shapes[state.shape](state);

  context.fillStyle = "rgba(" + state.color + "," + state.alpha + ")";
  context.fill();
}

// slowly add new particles otherwise
// they appear in waves and it looks like shit
const particleCount = 50;
function addParticles() {
  if (particles.length < particleCount) {
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

const over = (e) => {
  defaults["phase"] = phases.random;
  defaults["shape"] = "circle";
};

const out = (e) => {
  defaults["phase"] = phases.white;
  defaults["shape"] = "bar";
};

document.querySelectorAll("footer, canvas").forEach((ele) => {
  ele.addEventListener("mouseover", over);
  ele.addEventListener("mouseout", out);
});
