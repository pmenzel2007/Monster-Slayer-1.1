class Bullet extends GameObject {
    constructor(x, y, dirX, dirY) {
        super(x, y, 8, 8)
        bulletUp = document.getElementById("bulletUp");
        bulletRight = document.getElementById("bulletRight");
        bulletDown = document.getElementById("bulletDown");
        bulletLeft = document.getElementById("bulletLeft");

        this.dirX = dirX;
        this.dirY = dirY;
        this.speed = 5;
        this.direction = { up: false , down: false , left: false , right: false };
    }

    updateBullet() {
        this.x += this.dirX * this.speed;
        this.y += this.dirY * this.speed;

        this.direction.up = this.dirY === -1;
        this.direction.down = this.dirY === 1;
        this.direction.left = this.dirX === -1;
        this.direction.right = this.dirX === 1;

    }
    drawObjectImage(ctx, image) {
        this.image = image;
        if(this.direction.up) this.image = bulletUp;
        if(this.direction.down) this.image = bulletDown;
        if(this.direction.left) this.image = bulletLeft;
        if(this.direction.right) this.image = bulletRight;

        super.drawObjectImage(ctx, this.image);
    }
}