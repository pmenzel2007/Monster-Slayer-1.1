class Bullet extends GameObject {
    constructor(x, y, dirX, dirY) {
        super(x, y, 8, 8)
        this.dirX = dirX;
        this.dirY = dirY;
        this.speed = 5;
    }

    updateBullet() {
        this.x += this.dirX * this.speed;
        this.y += this.dirY * this.speed;
    }
}