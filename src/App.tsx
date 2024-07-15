import React, { useState } from 'react';
import { P5CanvasInstance, ReactP5Wrapper } from '@p5-wrapper/react';
import { Point } from './lib';
import { drawVector } from './lib/draw';
import { MySketchProps } from './interfaces';

const CANVAS_HEIGHT = window.innerHeight;
const CANVAS_WIDTH = window.innerWidth;

function sketch(p5: P5CanvasInstance<MySketchProps>) {
    p5.setup = () => p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p5.P2D);

    const p1 = new Point(20, 30);
    const p2 = new Point(140, 150);

    let expression = '';
    p5.updateWithProps = (props) => {
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
        if (expression) {
            drawVector(p5, p1, p2);
        }
    };
}

const App: React.FC = () => {
    const [expression, setExpression] = useState('');
    const [graph, setGraph] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setGraph(true); // start drawing the graph
    };

    return (
        <div className="container">
            <aside className="sidebar">
                <div className="sidebar-container">
                    <h1>Function</h1>
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <input
                            type="text"
                            value={expression}
                            onChange={(e) => setExpression(e.target.value)}
                            autoComplete="off"
                        />
                        <button>Graph</button>
                    </form>
                </div>
            </aside>
            <ReactP5Wrapper
                sketch={sketch}
                graph={graph}
                expression={expression}
            />
        </div>
    );
};

export default App;
