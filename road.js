class Road {
    constructor(x, width, laneCount=3) {
        this.x = x;
        this.width = width;
        this.laneCount = laneCount;
        // Defining useful values
        this.left = this.x - this.width / 2
        this.right = this.x + this.width / 2
        const infinity = 1000000;
        this.top = -infinity;
        this.bottom = infinity;
        const topLeft = {x:this.left, y:this.top}
        const topRight = {x:this.right, y:this.top}
        const bottomLeft = {x:this.left, y:this.bottom}
        const bottomRight = {x:this.right, y:this.bottom}
        this.borders = [[topLeft, bottomLeft], [topRight, bottomRight]]; // Defining the lane borders; can be curved as well or could have a highway with more borders
    }

    getLaneCentre(laneIndex) {
        const laneWidth = this.width / this.laneCount;
        return this.left + laneWidth / 2 + Math.min(laneIndex, this.laneCount - 1) * laneWidth;
    }

    draw(context) {
        context.lineWidth = 5;
        context.strokeStyle = "white";
        // Drawing lanes on road using linear interpolation
        for (let i = 1; i <= this.laneCount - 1; i++) {
            const x = lerp(this.left, this.right, i / this.laneCount);
            // Adding dashes to the middle lanes
            context.setLineDash([20, 20]); // [20 pixels and a break of 20 pixels]
            // Drawing a vertical line on the screen
            context.beginPath();
            context.moveTo(x, this.top);
            context.lineTo(x, this.bottom);
            context.stroke();
        }
        context.setLineDash([]);
        // Drawing vertical lines for road borders
        this.borders.forEach(border => {
            context.beginPath();
            context.moveTo(border[0].x, border[0].y);
            context.lineTo(border[1].x, border[1].y);
            context.stroke();
        });
    }
}