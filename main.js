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
// Defining cars
const N = 100;
const cars = generateCars(N);
let bestCar = cars[0]; // This will update on every frame but will be the first created car initially. Using let because the value of bestCar will change.
if (localStorage.getItem("bestBrain")) bestCar.brain = JSON.parse(localStorage.getItem("bestBrain")); // localStorage only works with strings which is why we get the serialized bestBrain.
// Defining traffic
const traffic = [new Car(road.getLaneCentre(1), -100, 30, 50, "DUMMY", 2), new Car(road.getLaneCentre(0), -300, 30, 50, "DUMMY", 2), new Car(road.getLaneCentre(2), -300, 30, 50, "DUMMY", 2)];
// Drawing the simulation
animate();

function save() {
    // Saves brain of best car
    localStorage.setItem("bestBrain", JSON.stringify(bestCar.brain));
}

function discard() {
    // Destroys the saved brain of the best car
    localStorage.removeItem("bestBrain");
}

function generateCars(N) {
    // Generates N autonomous cars for parallelization strategy in our simulation
    const cars = [];
    for (let i = 1; i <= N; i++) {
        cars.push(new Car(road.getLaneCentre(1), 100, 30, 50, "AI"));
    }
    return cars;
}

function animate(time) {
    // Drawing Kuruma AI simulation
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].update(road.borders, []);
    }
    for (let i = 0; i < cars.length; i++) {
        cars[i].update(road.borders, traffic);
    }
    bestCar = cars.find(c => c.y == Math.min(...cars.map(c => c.y))); // Find the car with the minimum y coordinate i.e. the car that is moving forward the most
    carCanvas.height = window.innerHeight;
    networkCanvas.height = window.innerHeight;
    carContext.save();
    carContext.translate(0, -bestCar.y + carCanvas.height * 0.7);
    road.draw(carContext);
    for (let i = 0; i < traffic.length; i++) {
        traffic[i].draw(carContext, "red");
    }
    carContext.globalAlpha = 0.2;
    for (let i = 0; i < cars.length; i++) {
        cars[i].draw(carContext, "blue");
    }
    carContext.globalAlpha = 1;
    bestCar.draw(carContext, "blue", true);
    carContext.restore();
    // Drawing visualization of car's brain
    networkContext.lineDashOffset = -time / 50; // Minus flips animation so feedforward movement is visualized
    Visualizer.drawNetwork(networkContext, bestCar.brain);
    // Calls the animate() method repeatedly many 
    // times per second. It gives the illusion of 
    // movement we want.
    requestAnimationFrame(animate); 
}