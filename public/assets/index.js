'use strict';

(function () {
    var canvas = document.getElementById('bubbles');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var ctx = canvas.getContext('2d');

    var bubbles = [];
    for (var x = 0; x < 50; x++) {
        bubbles.push(new Bubble());
    }

    window.addEventListener('resize', function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    animate();

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (var i in bubbles) {
            bubbles[i].update();
            bubbles[i].draw();
        }

        requestAnimationFrame(animate);
    }

    function random_color() {
        return '2' + parseInt(Math.random() * 55);
    }

    // Canvas manipulation
    function Bubble() {
        var state = init();

        function init() {
            return {
                x: Math.random() * canvas.width,
                y: canvas.height + Math.random() * 100,
                alpha: 0.5 + Math.random() * 0.3,
                scale: 0.1 + Math.random() * 0.3,
                velocity: Math.random(),
                color: Array(3).fill(random_color()).join(',')
            };
        }

        this.update = function () {
            if (state.alpha <= 0) {
                state = init();
            } else {
                state = Object.assign(state, {
                    x: state.x,
                    y: state.y -= state.velocity - state.scale,
                    velocity: state.velocity += 0.0005,
                    alpha: state.alpha -= 0.005
                });
            }
        };

        this.draw = function () {
            ctx.beginPath();
            ctx.arc(state.x, state.y, state.scale * 10, 0, 2 * Math.PI, false);
            ctx.fillStyle = 'rgba(' + state.color + ',' + state.alpha + ')';
            ctx.fill();
        };
    }
})();
//# sourceMappingURL=index.js.map
