class Visualizer {
    static drawNetwork(context, network) {
        const margin = 50;
        const left = margin;
        const top = margin;
        const width = context.canvas.width - margin * 2;
        const height = context.canvas.height - margin * 2;
        Visualizer.drawLevel(context, network.levels[0], left, top, width, height);
    }

    static drawLevel(context, level, left, top, width, height) {
        const right = left + width;
        const bottom = top + height;
        const nodeRadius = 18;
        for (let i = 0; i < level.inputs.length; i++) {
            const x = lerp(left, right, level.inputs.length == 1 ? 0.5 : i / level.inputs.length - 1);
            context.beginPath();
            context.arc(x, bottom, nodeRadius, 0, Math.PI * 2);
            context.fillStyle = "white";
            context.fill();
        }

    }
}