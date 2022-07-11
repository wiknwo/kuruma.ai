class Sensor {
    constructor(car) {
        // Sensor takes car as argument because we want sensor to know where car is. Sensor is attached to the car.
        this.car = car;
        this.rayCount = 5; // Sensor will cast rays in different directions
        this.rayLength = 150; // Sensor range of effect measured in pixels
        this.raySpread = Math.PI / 2 // 45 degree angle sensor spread
        this.rays = [];
        this.readings = []; // Consists of elements in the array indicating if there is a border there or not
    }

    update(roadBoarders, traffic) {
        this.#castRays();
        this.readings = [];
        for (let i = 0; i < this.rays.length; i++) {
            this.readings.push(this.#getReading(this.rays[i], roadBoarders, traffic));
        }
    }

    #getReading(ray, roadBoarders, traffic) {
        // Finds where ray touches road borders
        // Does this by finding all intersections
        // with the ray (all points on the ray) and 
        // keeping track of the closest point of 
        // intersection. Could intersect with road
        // borders or traffic.
        let touches = []; // All points of intersection with ray
        for (let i = 0; i < roadBoarders.length; i++) {
            const touch = getIntersection(ray[0], ray[1], roadBoarders[i][0], roadBoarders[i][1]);
            if (touch) touches.push(touch);
        }
        for (let i = 0; i < traffic.length; i++) {
            for (let j = 0; j < traffic[i].polygon.length; j++) {
                const touch = getIntersection(ray[0], ray[1], traffic[i].polygon[j], traffic[i].polygon[(j + 1) % traffic[i].polygon.length]);
                if (touch) touches.push(touch);
            }
        }
        if (touches.length == 0) {
            return null;
        } else {
            const offsets = touches.map(e => e.offset);
            const minOffset = Math.min(...offsets); // Math.min doesn't accept an array as input but it does accept many values. Ellipsis operator spreads array into multiple values
            return touches.find(e => e.offset == minOffset); 
        }
    }

    #castRays() {
        // Calculates line segment and angle for each ray
        this.rays = [];
        for (let i = 0; i < this.rayCount; i++) {
            const rayAngle = lerp(this.raySpread / 2, -this.raySpread / 2, this.rayCount == 1 ? 0.5 : i / (this.rayCount - 1)) + this.car.angle; // Remember rotated unit circle
            const rayStartPoint = {x:this.car.x, y:this.car.y};
            const rayEndPoint = {x:this.car.x - Math.sin(rayAngle) * this.rayLength, y:this.car.y - Math.cos(rayAngle) * this.rayLength};
            this.rays.push([rayStartPoint, rayEndPoint]) // Push line segment onto rays array representing one of the sensor arrays    
        }
    }

    draw(context) {
        for (let i = 0; i < this.rayCount; i++) {
            let rayEndPoint = this.readings[i] ? this.readings[i] : this.rays[i][1];
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "yellow";
            context.moveTo(this.rays[i][0].x, this.rays[i][0].y);
            context.lineTo(rayEndPoint.x, rayEndPoint.y);
            context.stroke();
            // Drawing ray where it would have been if it were unobstructed
            context.beginPath();
            context.lineWidth = 2;
            context.strokeStyle = "black";
            context.moveTo(this.rays[i][1].x, this.rays[i][1].y);
            context.lineTo(rayEndPoint.x, rayEndPoint.y);
            context.stroke();
        }
    }
}