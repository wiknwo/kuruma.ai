// Setting up canvas
const canvas = document.getElementById("myCanvas");
canvas.width = 200;

// Setting up car
const context = canvas.getContext("2d");
const car = new Car(100, 100, 30, 50);
car.draw(context);

// Drawing the simulation
animate();

function animate() {
    car.update();
    canvas.height = window.innerHeight;
    car.draw(context)
    requestAnimationFrame(animate); // Calls the animate() method repeatedly many times per second. It gives the illusion of movement we want.
}