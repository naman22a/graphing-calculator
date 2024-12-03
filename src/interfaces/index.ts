import { SketchProps } from '@p5-wrapper/react';
import { Vector } from 'p5';

export type GraphingProps = {
    expression: string;
    graph: boolean;
    step: number;
    vectorLength: number;
    points: Vector[];
};

export type MySketchProps = SketchProps & GraphingProps;
