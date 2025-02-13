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
            case "ArrowUp": this.movement.up = down; break;
            case "ArrowDown": this.movement.down = down; break;
            case "ArrowRight": this.movement.right = down; break;
            case "ArrowLeft": this.movement.left = down; break;
        }
        console.log(this.movement);
    }

    move() {
        if (this.movement.up) this.y -= this.speed;
        if (this.movement.down) this.y += this.speed;
        if (this.movement.left) this.x -= this.speed;
        if (this.movement.right) this.x += this.speed;
    }
}