import { SketchProps } from '@p5-wrapper/react';

export type MySketchProps = SketchProps & {
    expression: string;
    graph: boolean;
};
