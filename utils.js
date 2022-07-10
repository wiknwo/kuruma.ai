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