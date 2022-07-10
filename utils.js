function lerp(A, B, t) {
    // Perfoms a linear interpolation between two points A and B for parameter t in the closed interval [0, 1]
    return A + (B - A) * t;
}