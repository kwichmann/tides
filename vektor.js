const arrowHeadSize = 10;

class Vektor {
    constructor(x1, y1, x2, y2, c) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
        this.c = c;
    }

    tegn() {
        // Farve
        fill(this.c);
        stroke(this.c);
        strokeWeight(2);

        // Er der tale om nulvektoren?
        if (this.x1 == this.x2 && this.y1 == this.y2) {
            point(this.x1, this.y2);
            return;
        }

        // Selve vektoren   
        line(this.x1, this.y1, this.x2, this.y2);
        
        // Pilehoved
        push();
            translate(this.x2, this.y2);
            rotate(PI - Math.atan2(this.x2 - this.x1, this.y2 - this.y1));
            triangle(0, 0, arrowHeadSize / 6, arrowHeadSize / 2, -arrowHeadSize / 6, arrowHeadSize / 2);
        pop();
    }
}

function addVektor(v, w) {
    const x1 = v.x1;
    const y1 = v.y1;
    const x2 = v.x2 + w.x2 - w.x1;
    const y2 = v.y2 + w.y2 - w.y1;
    
    return new Vektor(x1, y1, x2, y2, color(255));
}

function oppositeVektor(v) {
    const x1 = v.x1;
    const y1 = v.y1;
    const x2 = 2 * v.x1 - v.x2;
    const y2 = 2 * v.y1 - v.y2;

    return new Vektor(x1, y1, x2, y2, color(255, 0, 0));
}