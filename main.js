// Setting up car canvas
const carCanvas = document.getElementById("carCanvas");
carCanvas.width = 200;
// Setting up network canvas
const networkCanvas = document.getElementById("networkCanvas");
networkCanvas.width = 300;
// Setting up car drawing context
const carContext = carCanvas.getContext("2d");
// Setting up network drawing context
const networkContext = networkCanvas.getContext("2d");
// Defining road
const road = new Road(carCanvas.width / 2, carCanvas.width * 0.9);
// Defining car
const car = new Car(road.getLaneCentre(1), 100, 30, 50, "KEYS");
// Defining traffic
const traffic = [new Car(road.getLaneCentre(1), -100, 30, 50, "DUMMY", 2)];
// Drawing the simulation
animate();

function animate() {
    // Drawing Kuruma AI simulation
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    car.update(road.borders, traffic);
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    carContext.save();
    carContext.translate(0, -car.y + carCanvas.height * 0.7);
    road.draw(carContext);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carContext, "red");
    }
    car.draw(carContext, "blue");
    carContext.restore();
    // Drawing visualization of car's brain
    Visualizer.drawNetwork(networkContext, car.brain);
    // Calls the animate() method repeatedly many 
    // times per second. It gives the illusion of 
    // movement we want.
    requestAnimationFrame(animate); 
}