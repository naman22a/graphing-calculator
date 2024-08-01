import { SketchProps } from '@p5-wrapper/react';

export type GraphingProps = {
    expression: string;
    graph: boolean;
    step: number;
    vectorLength: number;
};

export type MySketchProps = SketchProps & GraphingProps;
