class Visualizer {
    static drawNetwork(context, network) {
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = context.canvas.width - margin * 2;
        const height = context.canvas.height - margin * 2;
        const levelHeight = height / network.levels.length;
        for (let i = network.levels.length - 1; i >= 0; i--) {
            const levelTop = top + this.#getNodeX(network.levels, i, height - levelHeight, 0); 
            Visualizer.drawLevel(context, network.levels[i], left, levelTop, width, levelHeight);
        }
    }

    static drawLevel(context, level, left, top, width, height) {
        const right = left + width;
        const bottom = top + height;
        const nodeRadius = 18;
        for (let i = 0; i < level.inputs.length; i++) {
            for (let j = 0; j < level.outputs.length; j++) {
                context.beginPath();
                context.moveTo(Visualizer.#getNodeX(level.inputs, i, left, right), bottom);
                context.lineTo(Visualizer.#getNodeX(level.outputs, j, left, right), top);
                context.lineWidth = 2;
                context.strokeStyle = getRGBA(level.weights[i][j]);
                context.stroke();
            }
        }
        for (let i = 0; i < level.inputs.length; i++) {
            const x = Visualizer.#getNodeX(level.inputs, i, left, right);
            context.beginPath();
            context.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
            context.fillStyle = "black";
            context.fill();
            // Implementing a visual trick to draw nodes in ANN without connections showing emanating from nodes by drawing nodes in black first
            context.beginPath();
            context.arc(x, bottom, nodeRadius * 0.6, 0, Math.PI * 2);
            context.fillStyle = getRGBA(level.inputs[i]);
            context.fill();
        }
        for (let i = 0; i < level.outputs.length; i++) {
            const x = Visualizer.#getNodeX(level.outputs, i, left, right);
            context.beginPath();
            context.arc(x, top, nodeRadius, 0, Math.PI * 2);
            context.fillStyle = "black";
            context.fill();
            // Implementing a visual trick to draw nodes in ANN without connections showing emanating from nodes by drawing nodes in black first
            context.beginPath();
            context.arc(x, top, nodeRadius * 0.6, 0, Math.PI * 2);
            context.fillStyle = getRGBA(level.outputs[i]);
            context.fill();
            // Drawing biases
            context.beginPath();
            context.lineWidth = 2;
            context.arc(x, top, nodeRadius * 0.8, 0, Math.PI * 2);
            context.strokeStyle = getRGBA(level.biases[i]);
            context.setLineDash([3, 3]); // Draws dashed line with 3 pixels of line and 3 pixels of space
            context.stroke();
            context.setLineDash([]);
        }
    }

    static #getNodeX(nodes, index, left, right) {
        return lerp(left, right, nodes.length == 1 ? 0.5 : index / (nodes.length - 1));
    }
}