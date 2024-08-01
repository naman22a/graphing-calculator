import React from 'react';
import { P5CanvasInstance, ReactP5Wrapper } from '@p5-wrapper/react';
import { Point } from './lib';
import { domainColoring, drawVector } from './lib/draw';
import { GraphingProps, MySketchProps } from './interfaces';
import { useStore } from './store';
import { Sidebar } from './components';
import * as math from 'mathjs';

const CANVAS_HEIGHT = window.innerHeight;
const CANVAS_WIDTH = window.innerWidth;

function sketch(p5: P5CanvasInstance<MySketchProps>) {
    p5.setup = () => p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p5.P2D);

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
        p5.background(40);

        p5.strokeWeight(3);
        p5.stroke(255);
        p5.line(CANVAS_WIDTH / 2, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT);
        p5.line(0, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT / 2);

        p5.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

        if (graph && expression) {
            // draw arrow for (0, 0) as it may be missed some times, due to view port width
            const input = new Point(0, 0);
            const complexOutput: math.Complex = math.evaluate(
                expression.replace('z', '(x + i*y)'),
                { x: 0, y: 0 }
            );
            const output = new Point(complexOutput.re, complexOutput.im);
            p5.stroke(domainColoring(input, output));
            drawVector(p5, input, output, vectorLength);

            // plot the graph for points at regular interval
            for (
                let i = -Math.max(CANVAS_WIDTH, CANVAS_HEIGHT) / 2;
                i < Math.max(CANVAS_WIDTH, CANVAS_HEIGHT) / 2;
                i += step
            ) {
                for (
                    let j = -Math.max(CANVAS_WIDTH, CANVAS_HEIGHT) / 2;
                    j < Math.max(CANVAS_WIDTH, CANVAS_HEIGHT) / 2;
                    j += step
                ) {
                    const input = new Point(i, j);

                    const scope = { x: i, y: j };
                    const complexOutput: math.Complex = math.evaluate(
                        expression.replace('z', '(x + i*y)'),
                        scope
                    );
                    const output = new Point(
                        complexOutput.re,
                        complexOutput.im
                    );

                    p5.stroke(domainColoring(input, output));
                    drawVector(p5, input, output, vectorLength);
                }
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
