class GameObject {
    static nextId = 0;
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.id = GameObject.nextId++;
    }

    collidesWith(other) {
        if (this.id === other.id) return {collides: false, axis: null};

        let collidesX =
            this.x < other.x + other.width &&
            this.x + this.width > other.x;
        let collidesY =
            this.y < other.y + other.height &&
            this.y + this.height > other.y;

        //if (collidesX && collidesY) return {collides: true, axis: "both"};
        if (collidesX) return {collides: true, axis: "x"};
        if (collidesY) return {collides: true, axis: "y"};

        return {collides: false, axis: null};
    }

    draw(ctx, color) {
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    getId() {
        return this.id;
    }
}