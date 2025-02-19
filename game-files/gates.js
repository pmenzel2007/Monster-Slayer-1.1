// Gate-Klasse
class Gate extends GameObject {
    constructor(x, y) {
        super(x, y, 32, 32);  // Aufruf des GameObject-Konstruktors
        this.color = "purple";  // Farbe des Gates
    }

    // Gate zeichnen
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
