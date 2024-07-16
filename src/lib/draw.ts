import { P5CanvasInstance } from '@p5-wrapper/react';
import Point from './point';
import { MySketchProps } from '../interfaces';

export const drawLine = (
    p5: P5CanvasInstance<MySketchProps>,
    p1: Point,
    p2: Point
) => {
    p5.line(p1.x, -p1.y, p2.x, -p2.y);
};

const drawArrowhead = (
    p5: P5CanvasInstance<MySketchProps>,
    base: Point,
    vec: Point
) => {
    const arrowSize = 7;
    const angle = Math.atan2(vec.y, vec.x);

    // Coordinates for the arrowhead
    const arrowX1 = base.x - arrowSize * Math.cos(angle - Math.PI / 6);
    const arrowY1 = base.y - arrowSize * Math.sin(angle - Math.PI / 6);
    const arrowX2 = base.x - arrowSize * Math.cos(angle + Math.PI / 6);
    const arrowY2 = base.y - arrowSize * Math.sin(angle + Math.PI / 6);

    p5.line(base.x, -base.y, arrowX1, -arrowY1);
    p5.line(base.x, -base.y, arrowX2, -arrowY2);
};

export const drawVector = (
    p5: P5CanvasInstance<MySketchProps>,
    p1: Point,
    p2: Point
): void => {
    // standardize vector length
    const standardVectorLength = 20;
    const theta = Math.atan2(p2.y - p1.y, p2.x - p1.x);

    const newP2 = new Point(
        standardVectorLength * Math.cos(theta) + p1.x,
        standardVectorLength * Math.sin(theta) + p1.y
    );

    // draw line
    drawLine(p5, p1, newP2);

    // Vector direction
    const vector = {
        x: newP2.x - p1.x,
        y: newP2.y - p1.y
    };

    drawArrowhead(p5, newP2, vector);
};

export function domainColoring(p1: Point, p2: Point): number[] {
    // Calculate the complex number z = p2 - p1
    const x = p2.x - p1.x;
    const y = p2.y - p1.y;

    // Calculate the angle (phase) and magnitude
    const angle = Math.atan2(y, x);
    const magnitude = Math.sqrt(x * x + y * y);

    // Convert the angle to degrees and normalize it to [0, 1] range
    const hue = angle / (2 * Math.PI) + 0.5;

    // Normalize magnitude
    const brightness = 1 - Math.exp(-magnitude / 10);

    // Convert HSV to RGB
    const rgb = hsvToRgb(hue, 1, brightness);

    return [rgb.r, rgb.g, rgb.b];
}

export function hsvToRgb(h: number, s: number, v: number) {
    let r: number, g: number, b: number;

    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);

    switch (i % 6) {
        case 0:
            (r = v), (g = t), (b = p);
            break;
        case 1:
            (r = q), (g = v), (b = p);
            break;
        case 2:
            (r = p), (g = v), (b = t);
            break;
        case 3:
            (r = p), (g = q), (b = v);
            break;
        case 4:
            (r = t), (g = p), (b = v);
            break;
        case 5:
            (r = v), (g = p), (b = q);
            break;
    }

    return {
        r: Math.round(r! * 255),
        g: Math.round(g! * 255),
        b: Math.round(b! * 255)
    };
}
