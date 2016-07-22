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

(() => {
    const container = document.getElementsByTagName('footer')[0];
    const canvas = document.getElementsByTagName('canvas')[0];
    const context = canvas.getContext('2d');
    const bubbles = [];
    let phaser_switch = false;

    const defaults = {
        color: "150, 150, 150",
    };

    const main = document.getElementById("switch");
    main.addEventListener("click", () => phaser_switch = !phaser_switch, false);

    window.addEventListener('resize', () => {
        canvas.width = container.clientWidth;
    });
    window.dispatchEvent(new Event('resize'));

    function phaser(i, phase) {
        return [
            parseInt(Math.sin(0.0314 * i + 2 + phase) * 127 + 128),
            parseInt(Math.sin(0.0314 * i + 0 + phase) * 127 + 128),
            parseInt(Math.sin(0.0314 * i + 4 + phase) * 127 + 128),
        ].join(',');
    }

    function update(state) {
        if (!state || state.alpha < 0) {
            return {
                x: Math.random() * canvas.width,
                y: 0,
                alpha: 0.6 + Math.random() * 0.3,
                radius: 0.05 + Math.random() * 5.3,
                velocity: Math.floor(Math.random() * 1.5) + 1,
                color: defaults.color,
                phase: parseInt(Math.random() * 20),
            };
        }

        return {
            x: state.x,
            y: state.y + state.velocity,
            alpha: state.alpha - (state.y * .001),
            radius: state.radius,
            velocity: state.velocity + 0.07,
            color: phaser_switch
                ? phaser(state.y, state.phase)
                : defaults.color,
            phase: state.phase,
        };
    }

    function draw(state) {
        context.beginPath();
        context.arc(state.x, state.y, state.radius, 0, 6.2832);
        context.fillStyle = 'rgba('+ state.color +','+ state.alpha +')';
        context.fill();
    }

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = bubbles.length; i--;) {
            draw(bubbles[i] = update(bubbles[i]));
        }

        requestAnimationFrame(animate);
    }

    // if we add all the bubbles at once then they come in waves
    const maxBubbles = canvas.width / 10;
    const addBubbles = setInterval(() => {
        if (bubbles.length > maxBubbles) {
            return clearInterval(addBubbles);
        }

        for (let x = 0; x < 5; x++) {
            bubbles.push(update());
        }
    }, 100);

    animate();
})();
