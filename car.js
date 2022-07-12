class Car {
    constructor(x, y, width, height, controlType, maxSpeed=3, color="blue") {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = 0;
        this.acceleration = 0.2;
        this.maxSpeed = maxSpeed;
        this.friction = 0.05;
        this.angle = 0;
        this.isdamaged = false;
        this.useBrain = controlType == "AI";
        if (controlType != "DUMMY")  {
            this.sensor = new Sensor(this); // Passing this car to sensor
            this.brain = new ArtificialNeuralNetwork([this.sensor.rayCount, 6, 4]); // Defining new ANN with input layer consisting of rayCount neurons, hidden layer with 6 neurons and output layer with 4 neurons; one for each direction.
        }
        this.controls = new Controls(controlType);
        this.image = new Image();
        this.image.src = "car.png";
        this.mask = document.createElement("canvas");
        this.mask.width = width;
        this.mask.height = height;
        // We draw the car on this mini canvas first
        // then we use a trick to keep the car in its
        // original color coming from the constructor.
        const maskContext = this.mask.getContext("2d");
        this.image.onload = () => {
            maskContext.fillStyle = color;
            maskContext.rect(0, 0, this.width, this.height);
            maskContext.fill();
            maskContext.globalCompositeOperation = "destination-atop"; // Keeps color only where it overlaps with the image of the car
            maskContext.drawImage(this.image, 0, 0, this.width, this.height);
        }

    }

    update(roadBoarders, traffic) {
        if (!this.isdamaged) {
            this.#move();
            this.polygon = this.#createPolygon();
            this.isdamaged = this.#assessDamage(roadBoarders, traffic);
        }        
        if (this.sensor) {
            this.sensor.update(roadBoarders, traffic);
            const offsets = this.sensor.readings.map(s => s == null ? 0 : 1 - s.offset); // Want neurons to receive low values if object is far away and high values if the object is close like a flashlight
            const outputs = ArtificialNeuralNetwork.feedForward(offsets, this.brain);
            if (this.useBrain) {
                this.controls.forward = outputs[0];
                this.controls.left = outputs[1];
                this.controls.right = outputs[2];
                this.controls.reverse = outputs[3];
            }
        }
    }

    #assessDamage(roadBoarders, traffic) {
        for (let i = 0; i < roadBoarders.length; i++) {
            if (polysIntersect(this.polygon, roadBoarders[i])) return true;
        }
        for (let i = 0; i < traffic.length; i++) {
            if (polysIntersect(this.polygon, traffic[i].polygon)) return true;
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

    draw(context, drawSensor=false) {
        if (this.sensor && drawSensor) this.sensor.draw(context); // Car now has responsibility to draw its own sensor
        context.save();
        context.translate(this.x, this.y);
        context.rotate(-this.angle);
        if (!this.isdamaged) {
            context.drawImage(this.mask, -this.width / 2, -this.height / 2, this.width, this.height);
            context.globalCompositeOperation = "multiply";
        }
        context.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
        context.restore();
    }
}