//class represents all gates
class Gate extends GameObject {
    constructor(x, y, direction) {
        super(x, y, 32, 32);

        gateUp = document.getElementById("gateUp");
        gateDown = document.getElementById("gateDown");
        gateLeft = document.getElementById("gateLeft");
        gateRight = document.getElementById("gateRight");

        console.log(direction);
        this.direction = direction;

    }

    //overrides the drawObjectImage function from gameObject
    drawObjectImage(ctx) {
        this.image = undefined;
        if (this.direction === "up") this.image = gateUp;
        if (this.direction === "down") this.image = gateDown;
        if (this.direction === "left") this.image = gateLeft;
        if (this.direction === "right") this.image = gateRight;

        super.drawObjectImage(ctx, this.image);
    }
}
