class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 32, 32);
        this.speed = 3;
        this.movement = { up: false, down: false, left: false, right: false };

        document.addEventListener("keydown", (event) => this.handleInput(event, true));
        document.addEventListener("keyup", (event) => this.handleInput(event, false));
    }

    handleInput(event, down) {
        switch (event.code) {
            case "ArrowUp": case "KeyW": this.movement.up = down; break;
            case "ArrowDown": case "KeyS": this.movement.down = down; break;
            case "ArrowRight": case "KeyD": this.movement.right = down; break;
            case "ArrowLeft": case "KeyA": this.movement.left = down; break;
        }
    }

    move() {

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
    }
}