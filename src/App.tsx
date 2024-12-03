import React from 'react';
import { P5CanvasInstance, ReactP5Wrapper } from '@p5-wrapper/react';
import { Point } from './lib';
import { domainColoring } from './lib/draw';
import { GraphingProps, MySketchProps } from './interfaces';
import { useStore } from './store';
import { Sidebar } from './components';
import * as math from 'mathjs';
import { Vector } from 'p5';

const CANVAS_HEIGHT = window.innerHeight;
const CANVAS_WIDTH = window.innerWidth;

function sketch(p5: P5CanvasInstance<MySketchProps>) {
    const points: Vector[] = [];

    p5.setup = () => {
        p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p5.P2D);
        p5.pixelDensity(2);
        p5.angleMode(p5.DEGREES);
        p5.noiseDetail(1, 0);

        const density = 30;

        for (let x = -p5.width; x <= p5.width; x += p5.width / density) {
            for (let y = -p5.height; y <= p5.height; y += p5.height / density) {
                const p = p5.createVector(
                    x + p5.random(-10, 10),
                    y + p5.random(-10, 10)
                );
                points.push(p);
            }
        }

        p5.background(40);
    };

    let expression = '';
    let graph = false;
    let step: number;
    let vectorLength: number;

    p5.updateWithProps = (props: GraphingProps) => {
        graph = props.graph;
        if (props.graph) {
            expression = props.expression;
            step = props.step;
            vectorLength = props.vectorLength;
        }
    };

    p5.draw = () => {
        p5.stroke(255);
        p5.line(CANVAS_WIDTH / 2, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT);
        p5.line(0, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT / 2);

        p5.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

        if (graph && expression) {
            for (let i = 0; i < points.length; i++) {
                const point = points[i];
                const input = { x: point.x, y: point.y };

                const complexOutput: math.Complex = math.evaluate(
                    expression.replaceAll('z', '(x - i*y)'),
                    input
                );
                const output = new Point(complexOutput.re, complexOutput.im);

                const theta = Math.atan2(
                    output.y - input.y,
                    output.x - input.x
                );

                const mult = 2.5;
                const newP2 = new Point(
                    (vectorLength * Math.cos(theta) + input.x) * mult,
                    (vectorLength * Math.sin(theta) + input.y) * mult
                );

                point.add(p5.createVector(p5.cos(theta), p5.sin(theta)));
                p5.stroke(domainColoring(input, output));
                p5.point(newP2.x, newP2.y);
            }
        }
    };
}

const App: React.FC = () => {
    const { expression, graph, step, vectorLength } = useStore();

    return (
        <div className="container">
            <Sidebar />
            <ReactP5Wrapper
                sketch={sketch}
                graph={graph}
                expression={expression}
                step={step}
                vectorLength={vectorLength}
            />
        </div>
    );
};

export default App;
