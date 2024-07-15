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
    const standardVectorLength = 10;
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
