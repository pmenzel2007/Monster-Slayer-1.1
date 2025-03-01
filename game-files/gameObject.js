//class that represents all other game objects
class GameObject {
    static nextId = 0;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = GameObject.nextId++;
    }

    //checks if this game object overlaps with another game object
    collidesWith(other) {
        if (this.id === other.id) return false;

        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }

    //used to draw game object as rectangle
    draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    //used to draw game object as image
    drawObjectImage(ctx, image) {
        ctx.drawImage(image, this.x, this.y, this.width, this.height);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }
}