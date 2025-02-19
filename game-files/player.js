class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 32, 32);
        this.speed = 3;
        this.movement = { up: false, down: false, left: false, right: false };
        this.attackDirection = { up: false, down: false, left: false, right: true };
        this.attackSpeed = 1000;
        this.cooldown = 0;
        this.bullets = [];

        document.addEventListener("keydown", (event) => this.handleInput(event, true));
        document.addEventListener("keyup", (event) => this.handleInput(event, false));
    }

    handleInput(event, down) {
        switch (event.code) {
            case "KeyW": this.movement.up = down; break;
            case "KeyS": this.movement.down = down; break;
            case "KeyD": this.movement.right = down; break;
            case "KeyA": this.movement.left = down; break;

            case "ArrowUp": case "ArrowDown": case "ArrowRight": case "ArrowLeft": this.changeAttackDirection(event, down); break;

            case "Space": this.fireBullet();
        }
    }

    changeAttackDirection() {

    }

    fireBullet() {
        if (this.cooldown === 0) {
            let dx = 0, dy = 0;

            if (this.attackDirection.up) dy -= 1;
            if (this.attackDirection.down) dy += 1;
            if (this.attackDirection.left) dx -= 1;
            if (this.attackDirection.right) dx += 1;

            this.bullets.push(new Bullet(this.x + (this.width/2 - 4), this.y + (this.height/2 - 4), dx, dy));
        }
    }

    updatePlayer() {
        let dx = 0, dy = 0;

        if (this.movement.up) dy -= 1;
        if (this.movement.down) dy += 1;
        if (this.movement.left) dx -= 1;
        if (this.movement.right) dx += 1;

        if (dx !== 0 || dy !== 0) {
            let distance = Math.sqrt(dx * dx + dy * dy);
            dx /= distance;
            dy /= distance;
        }

        this.x += dx * this.speed;
        this.y += dy * this.speed;

        return { playerX: this.x, playerY: this.y , bullets: this.bullets };
    }
}