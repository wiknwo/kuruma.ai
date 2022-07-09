class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = 3;
        this.friction = 0.05;
        this.angle = 0;
        this.controls = new Controls();
    }

    update() {
        this.#move();
    }

    #move() {
        // Method to move the car in one of four directions; forward, reverse, left and right
        // Implementing driving forward and backwards
        if (this.controls.forward) this.speed += this.acceleration;
        if (this.controls.reverse) this.speed -= this.acceleration;
        // Capping the speed at a specific value
        if (this.speed > this.maxSpeed) this.speed = this.maxSpeed; 
        if (this.peed < -this.maxSpeed / 2) this.speed = this.maxSpeed / 2;
        // Applying friction to car's movement
        if (this.speed > 0) this.speed -= this.friction;
        if (this.speed < 0) this.speed += this.friction;
        if (Math.abs(this.speed) < this.friction) this.speed = 0;
        // Implementing turning left and right
        // Angle works accoring to rotated unit
        // circle. We want the car to move in 
        // the direction of the angle.
        if (this.speed != 0) {
            const flip = this.speed > 0 ? 1 : -1;
            if (this.controls.left) this.angle += 0.03 * flip;
            if (this.controls.right) this.angle -= 0.03 * flip;
        }
        // Updating x and y coordinates according to rotated unit circle
        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;
    }

    draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(-this.angle);
        context.beginPath()
        context.rect(-this.width / 2, -this.height / 2, this.width, this.height);
        context.fill();
        context.restore();
    }

}