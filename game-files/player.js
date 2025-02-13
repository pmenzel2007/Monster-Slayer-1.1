class Player extends GameObject {
    constructor(x, y) {
        super(x, y, 32, 32);
        this.speed = 4;
    }

    move(dirX, dirY) {
        this.x = this.x + dirX;
        this.y = this.y + dirY;
    }
}