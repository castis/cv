"use strict";

const container = document.querySelector('footer');
const canvas = container.querySelector('canvas');
const context = canvas.getContext('2d');
let particles = [];

const defaults = {
    shape: 0,
    phase: () => {},
    // phase: (x) => x / 180,
    // phase: () => parseInt(Math.random() * 20),
};

const renderers = [
    // bar
    (state) => {
        // width is tied to alpha so it shrinks as time goes on
        const width = (state.radius * 2) + (state.alpha * 10);
        const height = 120;
        const adjusted = state.x - (state.alpha * 2);

        context.moveTo(adjusted, state.y); // bottom left
        context.lineTo(adjusted + (width), state.y); // bottom right
        context.lineTo(adjusted + (width), state.y - height); // top right
        context.lineTo(adjusted, state.y - height); // top left
    },

    // circle
    (state) => {
        // y - radius to spawn above the top border
        context.arc(state.x, state.y - state.radius, state.radius, 0, 6.2832);
    },

    // triangle
    (state) => {
        const len = state.radius * 3;
        const y = state.y - len; // make sure it forms above the top border

        context.moveTo(state.x, y); // top left
        context.lineTo(state.x + (len / 2), y + (len * 0.9)); // bottom center
        context.lineTo(state.x + len, y); // top right
    },
];

// attach an event listener to `#id`,
// when clicked, iterate through `positions`
// pass that current value to `callback`
function multiToggle(id, positions, callback) {
    let index = 0;

    document.getElementById(id).addEventListener('click', () => {
        index = index >= positions.length - 1 ? 0 : index + 1;
        callback(positions[index]);
    });
}

multiToggle('shape', [0, 1, 2], value => defaults.shape = value);

multiToggle('color', [0, 1, 2], value => {
    if (value === 0) {
        defaults.phase = () => null;
    }
    else if (value == 1) {
        defaults.phase = () => parseInt(Math.random() * 20);
    }
    else if (value == 2) {
        defaults.phase = (x) => x / 180;
    }
});

// attach an event listener to `#id`
// run the function `func` 10 times a second
// while mouse is clicked down
function holdToggle(id, func) {
    let interval;
    const element = document.getElementById(id);
    element.addEventListener('mousedown', (e) => {
        interval = setInterval(func, 100, element);
    });
    ['mouseup', 'mouseout'].forEach(eventName => {
        element.addEventListener(eventName, (e) => clearInterval(interval));
    });
}

let particleCount = 50;
const delta = 20,
      minParticles = 10,
      maxParticles = 1000;

holdToggle('plus', (element) => {
    if (particleCount < maxParticles) {
        element.classList = ['vibratey'];
        particleCount = Math.min(maxParticles, particleCount + delta);
    } else {
        element.classList = [];
    }
});

holdToggle('minus', (element) => {
    if (particleCount > minParticles) {
        element.classList = ['vibratey'];
        particleCount = Math.max(minParticles, particleCount - delta);
    } else {
        element.classList = [];
    }
});

// keep the canvas at the right size as the window changes
const resize = () => canvas.width = container.clientWidth;
window.addEventListener('resize', resize);
resize();

function color(state) {
    if (state.phase) {
        return parseInt(Math.sin(0.0314 * state.y + 2 + state.phase) * 127 + 128) +','+
               parseInt(Math.sin(0.0314 * state.y + 0 + state.phase) * 127 + 128) +','+
               parseInt(Math.sin(0.0314 * state.y + 4 + state.phase) * 127 + 128);
    }

    return state.color;
}

function update(state) {
    if (!state || state.alpha < 0) {
        const radius = 0.05 + Math.random() * 5.3;
        const x = Math.floor(Math.random() * (canvas.width - (radius*2) - 3)) + radius;

        return {
            x: x,
            y: 0,
            alpha: 0.6 + Math.random() * 0.3,
            radius: radius,
            velocity: Math.floor(Math.random() * 1.5) + 1,
            color: '255,255,255',
            phase: defaults.phase(x),
            shape: defaults.shape,
        };
    }

    return {
        x: state.x,
        y: state.y + state.velocity,
        alpha: state.alpha - 0.025,
        radius: state.radius,
        velocity: state.velocity + 0.1,
        color: color(state),
        phase: state.phase,
        shape: state.shape,
    };
}

function draw(state) {
    context.beginPath();

    renderers[state.shape](state);

    context.fillStyle = 'rgba('+ state.color +','+ state.alpha +')';
    context.fill();
}

function run() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length; i--;) {
        draw(particles[i] = update(particles[i]));
    }

    if (particles.length > particleCount) {
        particles = particles.slice(Math.min(2, particles.length - particleCount))
    } else if (particles.length < particleCount) {
        for (let x = 0; x < particleCount - particles.length; x++) {
            particles.push(update());
        }
    }

    requestAnimationFrame(run);
}

run();
