// Setting up canvas
const canvas = document.getElementById("myCanvas");
canvas.width = 200;

// Setting up drawing context
const context = canvas.getContext("2d");
// Defining road
const road = new Road(canvas.width / 2, canvas.width * 0.9);
// Defining car
const car = new Car(road.getLaneCentre(1), 100, 30, 50, "KEYS");
// Defining traffic
const traffic = [new Car(road.getLaneCentre(1), -100, 30, 50, "DUMMY", 2)];
// Drawing the simulation
animate();

function animate() {
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);
    canvas.height = window.innerHeight;
    context.save();
    context.translate(0, -car.y + canvas.height * 0.7);
    road.draw(context);
    // Drawing the traffic
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(context, "red");
    }
    car.draw(context, "blue");
    context.restore();
    requestAnimationFrame(animate); // Calls the animate() method repeatedly many times per second. It gives the illusion of movement we want.
}