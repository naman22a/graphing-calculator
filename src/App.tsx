import React from 'react';
import p5Types from 'p5';
import { P5CanvasInstance, ReactP5Wrapper } from '@p5-wrapper/react';
import { Point } from './lib';
import { domainColoring, drawVector } from './lib/draw';
import { GraphingProps, MySketchProps } from './interfaces';
import { useStore } from './store';
import { Sidebar } from './components';
import * as math from 'mathjs';

const CANVAS_HEIGHT = window.innerHeight;
const CANVAS_WIDTH = window.innerWidth;
const PARTICLES_NUMBER = 1000;

class Particle {
    private p5: P5CanvasInstance<MySketchProps>;
    public position: p5Types.Vector;
    public velocity: p5Types.Vector;
    public accelration: p5Types.Vector;

    constructor(p5: P5CanvasInstance<MySketchProps>) {
        this.p5 = p5;
        // this.position = p5.createVector(this.p5.width / 2, 0);
        this.position = p5.createVector(
            p5.random(p5.width, -p5.width),
            p5.random(-p5.height, p5.height)
        );
        // this.velocity = p5.createVector(0, 0);
        this.velocity = p5.createVector(
            this.p5.random(this.p5.width / 2) * 0.01, // slow down the speed
            this.p5.random(this.p5.height / 2) * 0.01
        );
        // this.velocity = p5Types.Vector.random2D(); // ! NOT WORKING
        this.accelration = p5.createVector(0, 0);
    }

    update() {
        this.velocity.add(this.accelration);
        this.position.add(this.velocity);
        this.accelration.mult(0);
    }

    applyForce(force: p5Types.Vector) {
        this.accelration.add(force);
    }

    show() {
        this.p5.strokeWeight(10);
        this.p5.stroke(255, 0, 0);
        // this.p5.stroke(
        //     domainColoring(
        //         { x: 0, y: 0 },
        //         { x: this.position.x, y: this.position.y }
        //     )
        // );
        this.p5.point(this.position.x, this.position.y);
    }

    edges() {
        if (this.position.x > this.p5.width) this.position.x = -this.p5.width;
        if (this.position.x < -this.p5.width) this.position.x = this.p5.width;
        if (this.position.y > this.p5.height) this.position.y = -this.p5.height;
        if (this.position.y < -this.p5.height) this.position.y = this.p5.height;
    }
}

function sketch(p5: P5CanvasInstance<MySketchProps>) {
    let expression = '';
    let graph = false;
    let step: number;
    let vectorLength: number;
    const particles: Particle[] = [];

    p5.setup = () => {
        p5.createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT, p5.P2D);

        for (let i = 0; i < PARTICLES_NUMBER; i++) {
            particles[i] = new Particle(p5);
        }
    };

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
                expression.replaceAll('z', '(x - i*y)'),
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
                        expression.replaceAll('z', '(x - i*y)'),
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

            for (let i = 0; i < PARTICLES_NUMBER; i++) {
                particles[i].update();
                particles[i].show();
                particles[i].edges();
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
