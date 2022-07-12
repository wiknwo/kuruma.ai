function lerp(A, B, t) {
    // Perfoms a linear interpolation between two points A and B for parameter t (usually a perentage representing how far you are from point A) in the closed interval [0, 1]
    return A + (B - A) * t;
}

function getIntersection(A, B, C, D) {
    // Finds intersection between two line segments: https://www.youtube.com/watch?v=fHOLQJo0FjQ
    const tNumerator = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x); // Numerator of parameter t for linear interpolation between points A and B
    const uNumerator = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y); // Numerator of parameter u for linear interpolation between points C and D
    const demoninator = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y); // tNumerator and uNumerator share the same denominator
    if (demoninator != 0) {
        const t = tNumerator / demoninator;
        const u = uNumerator / demoninator;
        if (t >= 0 && t <= 1 && u >= 0 && u <= 1) return {x:lerp(A.x, B.x, t), y:lerp(A.y, B.y, t), offset:t};
    }
    return null;
}

function polysIntersect(poly1, poly2) {
    // Checks if two polygons intersect
    for (let i = 0; i < poly1.length; i++) {
        for (let j = 0; j < poly2.length; j++) {
            const touch = getIntersection(poly1[i], poly1[(i + 1) % poly1.length], poly2[j], poly2[(j + 1) % poly2.length]);
            if (touch) return true;
        }
    }
    return false;
}

function getRGBA(weight) {
    // Gets the RGB value for a given line representing connection in ANN
    const alpha = Math.abs(weight); // alpha determines the opacity of the lines.
    // yellow for positive values and blue for negative values
    const R = weight < 0 ? 0 : 255;
    const G = R; // Green is set to Red as they will share the same RGB value to combine and form yellow
    const B = weight > 0 ? 0 : 255;
    return "rgba(" + R + "," + G + "," + B + "," + alpha + ")";
}