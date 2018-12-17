let g = 3000000;

function gravity(x1, y1, x2, y2) {
    // Difference (pointing to point 1)
    const xr = x2 - x1;
    const yr = y2 - y1;
    const r2 = xr * xr + yr * yr;

    // Force
    const forceScalar = g / r2;
    const force = createVector(xr, yr).normalize().mult(forceScalar);
    return force;
}

function earthCentrifugal() {
    // Earth center
    let x1 = earthX;
    let y1 = earthY;

    // Moon center
    const x2 = moonX;
    const y2 = moonY;

    const force = gravity(x1, y1, x2, y2);
    // If argument is given, use as angle offset
    if (arguments.length > 0) {
        const angle = arguments[0];
        x1 = earthX + earthDiameter / 2 * cos(angle);
        y1 = earthY / 2 + earthDiameter / 2 * sin(angle);
    }
    const vector = new Vektor(x1, y1, x1 - force.x, y1 - force.y, color(0, 255, 0));
    return vector;
}

function earthGravity() {
    // Earth center
    let x1 = earthX;
    let y1 = earthY;

    // Moon center
    const x2 = moonX;
    const y2 = moonY;

    const force = gravity(x1, y1, x2, y2);
    const vector = new Vektor(x1, y1, x1 + force.x, y1 + force.y, color(255, 0, 0));
    return vector;
}

function surfaceGravity(angle) {
    // Surface point
    const x1 = earthX + earthDiameter / 2 * cos(angle);
    const y1 = earthY + earthDiameter / 2 * sin(angle);

    // Moon center
    const x2 = moonX;
    const y2 = moonY;

    const force = gravity(x1, y1, x2, y2);
    const vector = new Vektor(x1, y1, x1 + force.x, y1 + force.y, color(255, 0, 0));
    return vector;
}

function gravityLine(angle) {
    // Surface point
    const x1 = earthX + earthDiameter / 2 * cos(angle);
    const y1 = earthY + earthDiameter / 2 * sin(angle);

    // Moon center
    const x2 = moonX;
    const y2 = moonY;

    stroke(200);
    strokeWeight(1);
    
    line(x1, y1, x2, y2);
}