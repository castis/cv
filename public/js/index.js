(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    },
    i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');
ga('create', 'UA-25609352-3', 'auto');
ga('send', 'pageview');

function userSwitch(id, positions, callback) {
    let index = 0;
    let set = positions[index];

    document.getElementById(id).addEventListener('click', function(){
        index = index >= (positions.length - 1)
            ? 0 : index + 1;
        set = callback(positions[index]);
    })

    return () => set;
}

(() => {
    const container = document.getElementsByTagName('footer')[0];
    const canvas = document.getElementsByTagName('canvas')[0];
    const context = canvas.getContext('2d');
    const particles = [];

    const defaults = {
        shape: 'circle',
        phase: () => {},
    };

    const colorSwitch = userSwitch('color', [0, 1, 2], value => {
        if (value == 0) {
            defaults.phase = () => null
        }
        else if (value == 1) {
            defaults.phase = () => parseInt(Math.random() * 20);
        }
        else if (value == 2) {
            defaults.phase = (x) => x / 180;
        }
    });

    const shapeSwitch = userSwitch('shape', ['circle', 'triangle', 'bar'], value => {
        defaults.shape = value;
    })

    // keep the canvas at the right size as the window changes
    window.addEventListener('resize', () => {
        canvas.width = container.clientWidth;
    });
    window.dispatchEvent(new Event('resize'));

    function color(state) {
        return state.phase
            ? parseInt(Math.sin(0.0314 * state.y + 2 + state.phase) * 127 + 128) +','+
              parseInt(Math.sin(0.0314 * state.y + 0 + state.phase) * 127 + 128) +','+
              parseInt(Math.sin(0.0314 * state.y + 4 + state.phase) * 127 + 128)
            : state.color;
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

    const renderers = {
        'circle': (state) => {
            context.arc(state.x, state.y - state.radius, state.radius, 0, 6.2832);
        },
        'triangle': (state) => {
            const len = state.radius * 3;

            context.moveTo(state.x, state.y)
            context.lineTo(state.x + (len/2), state.y-(len*.89))
            context.lineTo(state.x + len, state.y)
        },
        'bar': (state) => {
            const width = (state.radius * 2) + (state.alpha * 10);
            const height = 120;

            context.moveTo(state.x, state.y)
            context.lineTo(state.x + width, state.y)
            context.lineTo(state.x + width, state.y - height)
            context.lineTo(state.x, state.y - height)
        },
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
    const maxBubbles = canvas.width / 5;
    const addBubbles = setInterval(() => {
        if (particles.length > maxBubbles) {
            return clearInterval(addBubbles);
        }

        for (let x = 0; x < 10; x++) {
            particles.push(update());
        }
    }, 100);

    animate();
})();
