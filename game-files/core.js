let canvas;
let ctx;
let player;

function onBodyLoad() {
    alert("a");
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    player = new Player(123, 123);
    gameLoop();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.draw(ctx);

    requestAnimationFrame(gameLoop);
}

window.onBodyLoad = onBodyLoad;