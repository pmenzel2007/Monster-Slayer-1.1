let canvas;
let ctx;
let startTime;
let player;
let enemies = [];
let gates = [];

let time;

let playerSprite;

let wall;
let walls;

function onBodyLoad() {
    startTime = performance.now();

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    player = new Player(canvas.width/2 - 16, canvas.height/2 - 16);

    for (let i = 0; i < 3; i++) {
        let x = Math.random() * (canvas.width - 32);
        let y = Math.random() * (canvas.height - 32);
        enemies.push(new Enemy(x, y));
    }

    // Gates erstellen und ins Array hinzufügen
    gates.push(new Gate(canvas.width/2-16, 0));
    gates.push(new Gate(canvas.width/2-16, canvas.height - 32));
    gates.push(new Gate(0,canvas.width/2-16));
    gates.push(new Gate(canvas.width - 32,canvas.height/2-16));

    initializeWalls();

    loadSprites();

    gameLoop();
}

function gameLoop() {
    time = (performance.now() - startTime) / 1000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let playerParams = player.updatePlayer();
    player.drawImage(ctx, playerSprite);

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update(playerParams.playerX, playerParams.playerY, enemies);
        enemies[i].draw(ctx, "green");
    }

    for (let bullet of playerParams.bullets) {
        bullet.updateBullet();
        bullet.draw(ctx, "red");
        for (let j = 0; j < enemies.length; j++) {
            if (bullet.collidesWith(enemies[j])) {
                console.log(bullet, enemies[j]);
                enemies.splice(enemies.indexOf(enemies[j]), 1);
                playerParams.bullets.splice(playerParams.bullets.indexOf(bullet), 1);
                break;
            }
        }
    }

    gates.forEach(gate => gate.draw(ctx, "purple"));

    for (wall of walls) {
        wall.draw(ctx, "black");
    }
    requestAnimationFrame(gameLoop);
}

function initializeWalls() {
    walls = [];
    let wallX = 0;
    let wallY = 0;

    for (let i = 0; i < 17; i++) {
        wallX = 32 * i;
        console.log(wallX);
        if (i !== 8) {
            walls.push(new Wall(wallX, 0));
            walls.push(new Wall(wallX, canvas.height - 32));
        }
    }

    for (let i = 0; i < 17; i++) {
        wallY = 32 * i;
        console.log(wallY);
        if (i !== 8) {
            walls.push(new Wall(0, wallY));
            walls.push(new Wall(canvas.height - 32, wallY));
        }
    }
}

function loadSprites() {
    playerSprite = document.getElementById("julian");
}

window.onBodyLoad = onBodyLoad;