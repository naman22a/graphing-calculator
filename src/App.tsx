import React from 'react';
import { P5CanvasInstance, ReactP5Wrapper } from '@p5-wrapper/react';
import { Point } from './lib';
import { drawVector } from './lib/draw';
import { MySketchProps } from './interfaces';
import { useStore } from './store';
import { Sidebar } from './components';

const CANVAS_HEIGHT = window.innerHeight;
const CANVAS_WIDTH = window.innerWidth;

function sketch(p5: P5CanvasInstance<MySketchProps>) {
    p5.setup = () => p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p5.P2D);

    const p1 = new Point(20, 30);
    const p2 = new Point(140, 150);

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
            drawVector(p5, p1, p2);
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
