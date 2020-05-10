"use strict"

const container = document.querySelector('.me')
const canvas = container.querySelector('canvas')
const context = canvas.getContext('2d')
let particles = []

const defaults = {
    shape: 0,
    phase: () => {}, // white
    // phase: (x) => x / 50, // rainbow
    // phase: () => parseInt(Math.random() * 20), // random colors
    // phase: () => parseInt(350),
}

const over = (e) => {
    defaults['phase'] = () => Math.random() * 20
}

const out = (e) => {
    defaults['phase'] = () => {}
}

// keep the canvas at the right size as the window changes
const resize = () => canvas.width = container.clientWidth
window.addEventListener('resize', resize)
resize()

function color(state) {
    if (state.phase) {
        return parseInt(Math.sin(0.0314 * state.y + 2 + state.phase) * 127 + 128) +','+
               parseInt(Math.sin(0.0314 * state.y + 0 + state.phase) * 127 + 128) +','+
               parseInt(Math.sin(0.0314 * state.y + 4 + state.phase) * 127 + 128)
    }
    return state.color
}

function update(state) {
    if (!state || state.alpha < 0) {
        const radius = 0.05 + Math.random() * 5.3
        const x = Math.floor(Math.random() * (canvas.width - (radius*2) - 3)) + radius

        return {
            x: x,
            y: canvas.height + 120,
            alpha: 0.8 + Math.random() * 0.3,
            radius: radius,
            velocity: Math.random(),
            color: '255,255,255',
            phase: defaults.phase(x),
            shape: defaults.shape,
        }
    }

    return {
        x: state.x,
        y: state.y - state.velocity,
        alpha: state.alpha - 0.025,
        radius: state.radius,
        velocity: state.velocity + 0.1,
        color: color(state),
        phase: state.phase,
        shape: state.shape,
    }
}

function draw(state) {
    context.beginPath()

    // width is tied to alpha so it shrinks as time goes on
    const width = (state.radius * 2) + (state.alpha * 10)
    const height = 120
    const adjusted = state.x - (state.alpha * 2)

    context.moveTo(adjusted, state.y) // bottom left
    context.lineTo(adjusted + (width), state.y) // bottom right
    context.lineTo(adjusted + (width), state.y - height) // top right
    context.lineTo(adjusted, state.y - height) // top left

    context.fillStyle = 'rgba('+ state.color +','+ state.alpha +')'
    context.fill()
}

let particleCount = 100

// slowly add new particles otherwise
// they appear in waves and it looks like shit
function addParticles() {
    if (particles.length < particleCount) {
        for (let x = 0; x < 2; x++) {
            particles.push(update())
        }
        requestAnimationFrame(addParticles)
    }
}
addParticles()

function run() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = particles.length; i--;) {
        draw(particles[i] = update(particles[i]))
    }
    requestAnimationFrame(run)
}
run()

document.querySelectorAll('footer, canvas').forEach(ele => {
    ele.addEventListener('mouseover', over)
    ele.addEventListener('mouseout', out)
})
