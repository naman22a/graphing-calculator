import React from 'react';
import { P5CanvasInstance, ReactP5Wrapper } from '@p5-wrapper/react';
import { Point } from './lib';
import { drawVector } from './lib/draw';
import { MySketchProps } from './interfaces';
import { useStore } from './store';
import { Sidebar } from './components';
import * as math from 'mathjs';

const CANVAS_HEIGHT = window.innerHeight;
const CANVAS_WIDTH = window.innerWidth;

function sketch(p5: P5CanvasInstance<MySketchProps>) {
    p5.setup = () => p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p5.P2D);

    const step = 20;

    let expression = '';
    let graph = false;
    p5.updateWithProps = (props) => {
        graph = props.graph;
        if (props.graph) {
            expression = props.expression;
        }
    };

    p5.draw = () => {
        p5.background(40);

        p5.stroke(255);
        p5.line(CANVAS_WIDTH / 2, 0, CANVAS_WIDTH / 2, CANVAS_HEIGHT);
        p5.line(0, CANVAS_HEIGHT / 2, CANVAS_WIDTH, CANVAS_HEIGHT / 2);

        p5.translate(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);

        p5.stroke('red');
        if (graph && expression) {
            // plot the graph for points at regular interval
            for (let i = -CANVAS_WIDTH / 2; i < CANVAS_WIDTH / 2; i += step) {
                for (
                    let j = -CANVAS_WIDTH / 2;
                    j < CANVAS_WIDTH / 2;
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

                    drawVector(p5, input, output);
                }
            }
        }
    };
}

const App: React.FC = () => {
    const { expression, graph } = useStore();

    return (
        <div className="container">
            <Sidebar />
            <ReactP5Wrapper
                sketch={sketch}
                graph={graph}
                expression={expression}
            />
        </div>
    );
};

export default App;
