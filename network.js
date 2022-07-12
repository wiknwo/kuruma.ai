class ArtificialNeuralNetwork {
    // ANN receives parameter indicating number of artifical neurons in each level
    constructor(neuronCounts) {
        this.levels = [];
        for (let i = 0; i < neuronCounts.length; i++) {
            this.levels.push(new Level(neuronCounts[i], neuronCounts[i + 1]));
        }
    }

    static feedForward(givenInputs, network) {
        let outputs = Level.feedForward(givenInputs, network.levels[0]);
        for (let i = 1; i < network.levels.length; i++) {
            outputs = Level.feedForward(outputs, network.levels[i]);
        }
        return outputs;
    }
}

class Level {
    // Level represents a layer in our artificial neural network.
    // Inputs will come from car's sensors and what we need to do
    // is calculate the car's outputs using these weights and biases.
    constructor(inputCount, outputCount) {
        this.inputs = new Array(inputCount);
        this.outputs = new Array(outputCount);
        this.biases = new Array(outputCount);
        this.weights = [];
        for (let i = 0; i < inputCount; i++) {
            this.weights[i] = new Array(outputCount);
        }
        Level.#randomize(this); // Initializes weights and biases
    }

    static #randomize(level) {
        // Initializes level in ANN with random values between 
        // [-1, 1]. We need negative values because of scenarios
        // where the car's sensor needs to tell the car to avoid
        // turning in a specific direction. This can be done with
        // negative numbers.
        for (let i = 0; i < level.inputs.length; i++) {
            for(let j = 0; j < level.outputs.length; j++) {
                level.weights[i][j] = Math.random() * 2 - 1;
            }
        }
        for (let i = 0; i < level.biases.length; i++) {
            level.biases[i] = Math.random() * 2 - 1;
        }
    }

    static feedForward(givenInputs, level) {
        // This function computes the outputs from the inputs
        // Line Equation for a single output: ws + b = 0 where w (weight), s (sensor input) and b (bias)
        // Hyperplane Equation for each output: w_0s_0 + ... + w_ns_n + b = 0 
        for (let i = 0; i < level.inputs.length; i++) {
            level.inputs[i] = givenInputs[i];
        }
        for (let i = 0; i < level.outputs.length; i++) {
            let sum = 0;
            for (let j = 0; j < level.inputs.length; j++) {
                sum += level.inputs[j] * level.weights[j][i];
            }
            if (sum > level.biases[i]) {
                level.outputs[i] = 1
            } else {
                level.outputs[i] = 0
            }
        }
        return level.outputs;
    }
}