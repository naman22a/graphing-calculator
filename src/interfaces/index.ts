import { SketchProps } from '@p5-wrapper/react';

export type GraphingProps = {
    expression: string;
    graph: boolean;
};

export type MySketchProps = SketchProps & GraphingProps;
