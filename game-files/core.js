let canvas;
let ctx;
let player;
let gates = [];  // Array für die Gates



function onBodyLoad() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    player = new Player(canvas.width / 2 - 16, canvas.height / 2 - 16);

    // Gates erstellen und ins Array hinzufügen
    gates.push(new Gate(canvas.width/2-16, 0));
    gates.push(new Gate(canvas.width/2-16, canvas.height - 32));
    gates.push(new Gate(0,canvas.width/2-16));
    gates.push(new Gate(canvas.width - 32,canvas.height/2-16));

    gameLoop();
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.move();
    player.draw(ctx);  // Zeichne den Spieler

    // Gates zeichnen
    gates.forEach(gate => gate.draw(ctx));  // Alle Gates zeichnen

    requestAnimationFrame(gameLoop);
}
