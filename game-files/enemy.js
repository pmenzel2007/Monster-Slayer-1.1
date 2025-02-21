class Enemy extends GameObject {
    constructor(x, y) {
        super(x, y, 32, 32);
        this.speed = 1;
    }

    update(playerX, playerY, enemies) {
        let distanceX = Math.abs(playerX - this.x);
        let distanceY = Math.abs(playerY - this.y)

        let scalingX = 1;
        let scalingY = 1
        if (distanceX > distanceY) scalingY = distanceY / distanceX;
        if (distanceX < distanceY) scalingX = distanceX / distanceY;

        let newX = this.x;
        let newY = this.y;

        if (this.x < playerX) newX += this.speed * scalingX;
        if (this.x > playerX) newX -= this.speed * scalingX;

        let thisEnemyX = { x: newX, y: this.y, height: this.height, width: this.width, id: this.id };

        if (!this.checkForCollision(thisEnemyX, enemies)) {
            this.x = newX;
        }

        if (this.y < playerY) newY += this.speed * scalingY;
        if (this.y > playerY) newY -= this.speed * scalingY;

        let thisEnemyY = { x: this.x, y: newY, height: this.height, width: this.width, id: this.id };

        if (!this.checkForCollision(thisEnemyY, enemies)) {
            this.y = newY;
        }
    }

    checkForCollision(bounds, enemies) {
        for (let i = 0; i < enemies.length; i++) {
            if (enemies[i].collidesWith(bounds)) {
                return true;
            }
        }
        return false;
    }
}