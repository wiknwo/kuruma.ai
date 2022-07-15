# What is Kuruma AI 🚗?

Kuruma AI is a 2D self-driving car simulation which comes complete with the following.

- **Computational Physics:** Some forces and measures are implemented in the simulation like friction, speed, maximum speed and acceleration to give Kuruma AI a more realistic
look and feel.
- **Graphics:** The graphics for Kuruma showcasing a top-down or helicopter view of the car were created using Powerpoint. The road was created using vanilla JavaScript and
the GIF was created by first doing multiple takes of screen recordings using Zoom Video Conferencing -> trimming the best video using Microsoft Photos -> cropping the 
trimmed video using Adobe Express -> finally creating a GIF of the cropped video using eazygif. 
- **Kuruma:** A virtual car of which many copies are made that each possess the following.
  - **Sensors:** An array of artifical sensors.
  - **Brain:** An artficial neural network which controls kuruma, thus enabling autonomous driving.
  - **Controls:** A group of controls which can be set to a number of options including: "AI" 
  which sets Kuruma to be controlled by the car's brain, "KEYS" which sets Kuruma to be controlled
  manually by the user using the arrow keys and "DUMMY" which sets Kuruma to move in a default 
  direction.
  - **Damage Assessment:** This is a module in Kuruma that assesses the damage done to Kuruma by 
  colliding with a road border or oncoming traffic.
- **Road:** A virtual road with dashed lines separating lanes and borders to mark the ends of the road.
- **Traffic:** A number of cars create virtual traffic in the simulation, their controls are set to "DUMMY" and they come in random colors.
- **Best Car:** Kuruma AI keeps track of the car with the best brain which is determined according to a fitness 
function and is this variable is updated on every frame.
- **Visualizer:** A visualization of the best car's brain to allow easy debugging and seeing what's inside the "black box".
- **Save and Discard:** Kuruma AI comes with funcitonality to save (💾) or discard (🗑️) the best car's brain using localStorage
to act as a checkpoint for progress made by Kuruma so the user doesn't have to start the simulation from scratch each time.

# Kuruma AI in Action ⚡!

![Kuruma AI](kuruma_ai.gif)

**_Goal_:** To overtake all traffic and continue along the road undamaged.

1. **Parallelization of Kuruma:** The simulation generates multiple instances of Kuruma to operate in parallel in an attempt to get at least on instance
of Kuruma to overtake all traffic and continue along the road. 
    - **Tracking Best Car:** The best instance of kuruma (best car) is in solid blue while the rest are in a more transparent shade of blue. 
    - **Sensor Outlines:** The sensors are in yellow and if they intersect with an object  then the part of the sensor intersecting with the object will be in black.
2. **Learning How to Drive:** Kuruma learns how to drive through all the instances of itself. As all the instances of Kuruma drive along the road and try to achieve
the goal of overtaking all traffic and continuing along the lane undamaged, some instances of Kuruma may become damaged by colliding with the road borders or oncoming traffic.
    - **Damaged Kuruma:** When Kuruma gets damaged, it turns grey in color and stops moving but its sensors are still visible. 
3. **Saving or Discarding the Best Car:** In the GIF you can see that the best instance of Kuruma almost overtakes the final two cars in traffic but gets damaged 
in the process. We can save this car's brain by clicking the floppy disc icon or discard it by clicking the trash can. This allows us to save our progress for the
next launch of the simulation. 
    - **Viewing the Best Car's Brain:** On the right hand side of the GIF, you can see a visualization of the current best car's brain. The first layer of the
    artificial neural network starting from the bottom corresponds to the sensor inputs of Kuruma: there are five sensors matching 5 inputs. The next layer is a hidden
    layer with six neurons each taking inputs from all neurons in the previous layer, including a bias term. Finally we have the output layer which corresponds to the
    different directions Kuruma can move in: forward, left, right and reverse. You can see which directions are active by the yellow color in the arrow circle. The
    feint yellow dashed circle around the neurons is the level of activation of the bias term. The more yellow the circular dashed lines are, the higher the bias term.
    The more blue the circular dashed lines are, the lower the bias term. Yellow color indicates positive values and blue indicates negative values. The dashed lines
    connecting one layer to the next are called connnections and the color gradient of the lines indicates the level of activation.
4. **Updating the Best Car:** After the best instance of Kuruma gets damaged in the GIF, it gets updated with the next best car which in the GIF, is a car that 
maintains a certain distance from the car in front of it. There are many different versions of Kuruma that can exist ranging from finnicky versions with a shaky brain
to versions that reverse and damage themselves by colliding with the borders. The behaviour of Kuruma is quite random and this randomness is what enables it to learn.

# Limitations of Kuruma AI 🔒

- **Collision Strategy:** If Kuruma were moving so fast that it could jump over the other cars in traffic then it would need a different collision detection strategy
but we don't allow that to happen here.

- **Fitness Function:** The current fitness function of Kuruma is to prioritise the version of Kuruma with the lowest y-coordinate value as a lower y-coordinate
value in JavaScript means an object is higher up on the screen. This fitness function wouldn't work if the road were winding so it is sensible to note and make use
of the flexibility of the program to change the fitness function accordingly.

# Potential of Kuruma AI 🔓

- **Highly Extensible:** Kuruma AI is a very flexible and extendable piece of software. Different parameters can be tuned to further extend the simulation. For example,
additional traffic could be added, it could be extended to a 3D space, the road could be changed to a highway with two roads combined together or one could incorporate
twists and turns in the road to see how that affects model performance, the fitness function could be altered to see how the car's brain makes judgements and prioritises
new information. There are many possibilities.

# How to Run Kuruma AI 🏃🏾

1. Download Kuruma AI onto your machine.
2. Open Kuruma AI in your IDE and navigate to the root directory containing all the source files.
3. In an open terminal, after navigating to the root directory, type ```index.html```
4. Kuruma AI will open in a new browser window on your machine locally.
