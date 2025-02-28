let canvas;
let ctx;
let startTime;
let player;
let enemies = [];
let gates = [];
let currentGate = 0;

let time;
let seconds;
let minutes;
let currentSecond = 0;

let julian;
let playerSprite;
let bulletSprite;

let wall;
let walls;

function onBodyLoad() {
    startTime = performance.now();

    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    player = new Player(canvas.width/2 - 16, canvas.height/2 - 16);

    gates.push(new Gate(canvas.width/2-16, 0));
    gates.push(new Gate(0,canvas.width/2-16));
    gates.push(new Gate(canvas.width/2-16, canvas.height - 32));
    gates.push(new Gate(canvas.width - 32,canvas.height/2-16));

    initializeWalls();

    loadSprites();

    gameLoop();
}

function gameLoop() {
    time = Math.floor(performance.now() - startTime);
    seconds = Math.floor((time / 1000) % 60);
    minutes = Math.floor((time / 1000) / 60);


    document.getElementById("timer").innerText =
        `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;


    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let playerParams = player.updatePlayer();
    player.drawObjectImage(ctx, playerSprite);

    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update(playerParams.playerX, playerParams.playerY, enemies);
        enemies[i].draw(ctx, "green");
    }

    for (let bullet of playerParams.bullets) {
        bullet.updateBullet();
        bullet.drawObjectImage(ctx, bulletSprite);
        for (let enemy of enemies) {
            if (bullet.collidesWith(enemy)) {
                console.log(bullet, enemy);
                enemies.splice(enemies.indexOf(enemy), 1);
                playerParams.bullets.splice(playerParams.bullets.indexOf(bullet), 1);
                break;
            }
        }
    }

    gates.forEach(gate => gate.draw(ctx, "purple"));

    for (wall of walls) {
        wall.draw(ctx, "black");
    }
    spawnEnemies();
    requestAnimationFrame(gameLoop);
}

function initializeWalls() {
    walls = [];
    let wallX = 0;
    let wallY = 0;

    for (let i = 0; i < 17; i++) {
        wallX = 32 * i;
        if (i !== 8) {
            walls.push(new Wall(wallX, 0));
            walls.push(new Wall(wallX, canvas.height - 32));
        }
    }

    for (let i = 0; i < 17; i++) {
        wallY = 32 * i;
        if (i !== 8) {
            walls.push(new Wall(0, wallY));
            walls.push(new Wall(canvas.height - 32, wallY));
        }
    }
}

function spawnEnemies() {

    if (currentSecond === seconds) {
        if (seconds <= 30) {
            let enemyX = gates[currentGate].getX();
            let enemyY = gates[currentGate].getY();
            enemies.push(new Enemy(enemyX, enemyY));
            if (currentGate !== 4) currentGate++;
            if (currentGate === 4) currentGate = 0

            currentSecond++;

        }
        if (seconds > 30) {
            for (let gate of gates) {
                let enemyX = gate.getX();
                let enemyY = gate.getY();
                enemies.push(new Enemy(enemyX, enemyY));
            }

            currentSecond += 3;
        }

        if (minutes >= 1) {
            let spawnX = Math.random() * (canvas.width - 66) + 33;
            let spawnY = Math.random() * (canvas.height - 66) + 33;
            enemies.push(new Enemy(spawnX, spawnY));
        }

    }
}

function loadSprites() {
    julian = document.getElementById("julian");
    bulletSprite = document.getElementById("bulletSprite");
    playerSprite = document.getElementById("playerSprite");
}

window.onBodyLoad = onBodyLoad;