"use strict";

function multiToggle(id, positions, callback) {
    let index = 0;

    document.getElementById(id).addEventListener('click', () => {
        index = index >= positions.length - 1 ? 0 : index + 1;
        callback(positions[index]);
    });
}

const container = document.getElementsByTagName('footer')[0];
const canvas = document.getElementsByTagName('canvas')[0];
const context = canvas.getContext('2d');
const particles = [];

const defaults = {
    shape: 0,
    phase: () => {},
};

const renderers = [
    // circle
    (state) => {
        // y - radius to spawn above the top border
        context.arc(state.x, state.y - state.radius, state.radius, 0, 6.2832);
    },

    // triangle
    (state) => {
        const len = state.radius * 3;

        context.moveTo(state.x, state.y); // left
        context.lineTo(state.x + (len / 2), state.y + (len * 0.9)); // bottom
        context.lineTo(state.x + len, state.y); // right
    },

    // bar
    (state) => {
        // width is tied to alpha so it shrinks as time goes on
        const width = (state.radius * 2) + (state.alpha * 10);
        const height = 120;

        context.moveTo(state.x, state.y); // bottom left
        context.lineTo(state.x + width, state.y); // bottom right
        context.lineTo(state.x + width, state.y - height); // top right
        context.lineTo(state.x, state.y - height); // top left
    },
];

multiToggle('shape', [0, 1, 2], value => defaults.shape = value);

multiToggle('color', [0, 1, 2], value => {
    if (value === 0) {
        defaults.phase = () => null;
    }
    else if (value == 1) {
        defaults.phase = (x) => x / 180;
    }
    else if (value == 2) {
        defaults.phase = () => parseInt(Math.random() * 20);
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
            color: '100,100,100',
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

function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = particles.length; i--;) {
        draw(particles[i] = update(particles[i]));
    }

    requestAnimationFrame(animate);
}

// if we add all the particles at once then they come in waves
const maxBubbles = canvas.width / 9;
const addBubbles = setInterval(() => {
    if (particles.length > maxBubbles) {
        return clearInterval(addBubbles);
    }

    for (let x = 0; x < 10; x++) {
        particles.push(update());
    }
}, 100);

animate();
