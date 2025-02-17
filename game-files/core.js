let canvas;
let ctx;
let player;

function onBodyLoad() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    player = new Player(canvas.width/2 - 16, canvas.height/2 - 16);

    gameLoop();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.move();
    player.draw(ctx);

    requestAnimationFrame(gameLoop);
}

window.onBodyLoad = onBodyLoad;