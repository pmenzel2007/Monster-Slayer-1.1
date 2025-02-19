class Enemy extends GameObject {
    constructor(x, y) {
        super(x, y, 32, 32);
        this.speed = 1;
    }

    update(playerX, playerY, enemies) {
        let oldX = this.x;
        let oldY = this.y;

        let distanceX = Math.abs(playerX - this.x);
        let distanceY = Math.abs(playerY - this.y)

        let scalingX = 1;
        let scalingY = 1
        if (distanceX > distanceY) scalingY = distanceY / distanceX;
        if (distanceX < distanceY) scalingX = distanceX / distanceY;

        if (this.x < playerX) this.x += this.speed * scalingX;
        if (this.x > playerX) this.x -= this.speed * scalingX;
        if (this.y < playerY) this.y += this.speed * scalingY;
        if (this.y > playerY) this.y -= this.speed * scalingY;

        for (let i = 0; i < enemies.length; i++) {
            let collision = this.collidesWith(enemies[i]);

            console.log(collision);

            if (collision.collides) {
                //if (collision.axis === "x") this.x = oldX;
                //if (collision.axis === "x") this.y = oldY;
                break;
            }
        }

    }
}