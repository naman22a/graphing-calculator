import { create } from 'zustand';

interface GlobalState {
    expression: string;
    setExpression: (expression: string) => void;

    graph: boolean;
    setGraph: (graph: boolean) => void;
}

export const useStore = create<GlobalState>((set) => ({
    expression: '',
    setExpression: (expression) => set(() => ({ expression })),

    graph: false,
    setGraph: (graph) => set(() => ({ graph }))
}));
