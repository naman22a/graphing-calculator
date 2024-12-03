import { create } from 'zustand';

interface GlobalState {
    expression: string;
    setExpression: (expression: string) => void;

    graph: boolean;
    setGraph: (graph: boolean) => void;

    step: number;
    setStep: (step: number) => void;

    vectorLength: number;
    setVectorLength: (vectorLength: number) => void;

    resetParameters: () => void;
}

const DEFAULT_STEP_VALUE = 50;
const DEFAULT_VECTOR_LENGTH = 20;

export const useStore = create<GlobalState>((set) => ({
    expression: 'z^3',
    setExpression: (expression) => set(() => ({ expression })),

    graph: true,
    setGraph: (graph) => set(() => ({ graph })),

    step: DEFAULT_STEP_VALUE,
    setStep: (step) => set(() => ({ step })),

    vectorLength: DEFAULT_VECTOR_LENGTH,
    setVectorLength: (vectorLength) =>
        set(() => ({ vectorLength: vectorLength })),

    resetParameters: () =>
        set(() => ({
            step: DEFAULT_STEP_VALUE,
            vectorLength: DEFAULT_VECTOR_LENGTH
        }))
}));
