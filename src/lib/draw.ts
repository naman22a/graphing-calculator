import { P5CanvasInstance } from '@p5-wrapper/react';
import Point from './point';

export const drawVector = (
    p5: P5CanvasInstance,
    p1: Point,
    p2: Point
): void => {
    drawLine(p5, p1, p2);
    // TODO: draw arrow head
};

export const drawLine = (p5: P5CanvasInstance, p1: Point, p2: Point) => {
    p5.line(p1.x, -p1.y, p2.x, -p2.y);
};
