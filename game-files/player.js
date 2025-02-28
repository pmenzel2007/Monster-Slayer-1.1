class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 32, 32, walls, gates);
        this.speed = 3;
        this.movement = { up: false, down: false, left: false, right: false };
        this.attackDirection = { up: false, down: false, left: false, right: false };
        this.attackSpeed = 15;
        this.cooldown = 0;
        this.bullets = [];

        this.walls = walls;
        this.gates = gates;

        playerSpriteRight = document.getElementById("playerSpriteRight");

        this.activeSprite = playerSpriteRight;

        document.addEventListener("keydown", (event) => this.handleInput(event, true));
        document.addEventListener("keyup", (event) => this.handleInput(event, false));
    }

    handleInput(event, down) {
        switch (event.code) {
            case "KeyW": this.movement.up = down; break;
            case "KeyS": this.movement.down = down; break;
            case "KeyD": this.movement.right = down; break;
            case "KeyA": this.movement.left = down; break;
        }

        if (["ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft"].includes(event.code)) {
            this.changeAttackDirection(event, down);
        }

    }

    changeAttackDirection(event, down) {
        if (down) {
            this.attackDirection = {
                up: event.code === "ArrowUp",
                down: event.code === "ArrowDown",
                right: event.code === "ArrowRight",
                left: event.code === "ArrowLeft"
            };
        } else {
            this.attackDirection = {
                up: false,
                down: false,
                right: false,
                left: false
            }
        }

        this.fireBullet();
    }

    fireBullet() {
        if (this.cooldown === 0) {
            let dx = 0, dy = 0;

            if (this.attackDirection.up) dy -= 1;
            if (this.attackDirection.down) dy += 1;
            if (this.attackDirection.left) {
                dx -= 1;
                this.activeSprite = playerSpriteLeft;
            }
            if (this.attackDirection.right) {
                dx += 1;
                this.activeSprite = playerSpriteRight;
            }

            if (dx !== 0 || dy !== 0) {
                this.bullets.push(new Bullet(this.x + (this.width/2 - 4), this.y + (this.height/2 - 4), dx, dy));
            }
            this.cooldown = this.attackSpeed;
        }
    }

    updatePlayer() {
        let dx = 0, dy = 0;

        if (this.movement.up) dy -= 1;
        if (this.movement.down) dy += 1;
        if (this.movement.left) {
            dx -= 1;
            this.activeSprite = playerSpriteLeft;
        }
        if (this.movement.right) {
            dx += 1;
            this.activeSprite = playerSpriteRight;
        }

        if (dx !== 0 || dy !== 0) {
            let distance = Math.sqrt(dx * dx + dy * dy);
            dx /= distance;
            dy /= distance;
        }

        let newX = this.x + dx * this.speed;
        let newY = this.y + dy * this.speed;

        let newPlayerX = {x: newX, y: this.y, height: this.height, width: this.width, id: this.id };

        if (!this.checkForCollision(newPlayerX)) this.x = newX;

        let newPlayerY = {x: this.x, y: newY, height: this.height, width: this.width, id: this.id };

        if (!this.checkForCollision(newPlayerY)) this.y = newY;

        //this.x += dx * this.speed;
        //this.y += dy * this.speed;

        if (this.cooldown > 0) {
            this.cooldown--;
        }
        else if (
            this.attackDirection.up ||
            this.attackDirection.down ||
            this.attackDirection.right ||
            this.attackDirection.left) {
            this.fireBullet();
        }

        return { playerX: this.x, playerY: this.y , bullets: this.bullets };
    }

    checkForCollision(bounds) {
        for (let wall of this.walls) {
            if (wall.collidesWith(bounds))
                return true;
        }
        for (let gate of this.gates) {
            if (gate.collidesWith(bounds))
                return true;
        }
        return false;
    }

    drawObjectImage(ctx) {
        super.drawObjectImage(ctx, this.activeSprite);
    }
}