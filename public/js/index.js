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
    const container = document.getElementsByTagName('main')[0];
    const canvas = document.getElementsByTagName('canvas')[0];
    const context = canvas.getContext('2d');
    const bubbles = [];

    window.addEventListener('resize', () => {
        canvas.width = container.offsetWidth;
    });
    window.dispatchEvent(new Event('resize'));

    function update(state) {
        if (!state || state.alpha < 0) {
            return {
                x: Math.random() * canvas.width,
                y: canvas.height + 20,
                alpha: 0.5 + Math.random() * 0.3,
                radius: 0.05 + Math.random() * 2.3,
                velocity: Math.abs(Math.random()) + 0.4
            };
        }

        return {
            ...state,
            x: state.x,
            y: state.y - state.velocity,
            velocity: state.velocity - 0.005,
            alpha: state.alpha - 0.005
        };
    }

    function draw(state) {
        context.beginPath();
        context.arc(state.x, state.y, state.radius, 0, 6.2832);
        context.fillStyle = 'rgba(100, 100, 100, ' + state.alpha + ')';
        context.fill();
    }

    function animate() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        let i = bubbles.length;
        while (i--) {
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
    }, 200);

    animate();
})();
