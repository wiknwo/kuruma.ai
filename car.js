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
        this.isdamaged = false;
        this.sensor = new Sensor(this); // Passing this car to sensor
        this.controls = new Controls();
    }

    update(roadBoarders) {
        if (!this.isdamaged) {
            this.#move();
            this.polygon = this.#createPolygon();
            this.isdamaged = this.#assessDamage(roadBoarders);
        }        
        this.sensor.update(roadBoarders);
    }

    #assessDamage(roadBoarders) {
        for (let i = 0; i < roadBoarders.length; i++) {
            if (polysIntersect(this.polygon, roadBoarders[i])) return true;
        }
        return false;
    }

    #createPolygon () {
        const points = []; // One point for each corner of the car.
        const radius = Math.hypot(this.width, this.height) / 2;
        const alpha = Math.atan2(this.width, this.height);
        points.push({x:this.x - Math.sin(this.angle - alpha) * radius, y:this.y - Math.cos(this.angle - alpha) * radius}); // Top right corner of car.
        points.push({x:this.x - Math.sin(this.angle + alpha) * radius, y:this.y - Math.cos(this.angle + alpha) * radius}); // Top left corner of car.
        points.push({x:this.x - Math.sin(Math.PI + this.angle - alpha) * radius, y:this.y - Math.cos(Math.PI + this.angle - alpha) * radius}); // Bottom right corner of car.
        points.push({x:this.x - Math.sin(Math.PI + this.angle + alpha) * radius, y:this.y - Math.cos(Math.PI + this.angle + alpha) * radius}); // Bottom left corner of car.
        return points;
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
        if (this.isdamaged) {
            context.fillStyle = "gray";
        } else {
            context.fillStyle = "black";
        }
        context.beginPath();
        context.moveTo(this.polygon[0].x, this.polygon[0].y);
        for (let i = 1; i < this.polygon.length; i++) {
            context.lineTo(this.polygon[i].x, this.polygon[i].y);
        }
        context.fill();
        this.sensor.draw(context); // Car now has responsibility to draw its own sensor
    }
}