import React, { useState } from 'react';
import { useStore } from '../../store';
import * as math from 'mathjs';

interface Props {}

const Sidebar: React.FC<Props> = () => {
    const {
        expression,
        setExpression,
        setGraph,
        step,
        setStep,
        vectorLength,
        setVectorLength,
        resetParameters
    } = useStore();
    const [error, setError] = useState('');

    const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStep(Number(e.target.value));
    };

    const handleVectorLengthChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        setVectorLength(Number(e.target.value));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // validate expression
        if (!expression) {
            return;
        }

        const scope = {
            z: 1 // is defined
        };

        try {
            // validate expression
            math.evaluate(expression, scope);
        } catch (error) {
            setError('Invalid input');
            console.error(error);
            return;
        }

        setError('');
        setGraph(true); // start drawing the graph
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-container">
                <h1>Function</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={expression}
                        onChange={(e) => {
                            setGraph(false);
                            setExpression(e.target.value);
                        }}
                        autoComplete="off"
                        placeholder="For example sin(z)"
                    />
                    <button type="submit">Graph</button>
                </form>
                {error && <p className="error">{error}</p>}
                <p>Give a function in terms of z.</p>
                <div className="input-range">
                    <label>Step</label>
                    <input
                        type="range"
                        min="25"
                        max="175"
                        step="25"
                        value={step}
                        onChange={handleStepChange}
                    />
                    {step}
                </div>
                <div className="input-range">
                    <label>Vector Length</label>
                    <input
                        type="range"
                        min="10"
                        max="50"
                        step="5"
                        value={vectorLength}
                        onChange={handleVectorLengthChange}
                    />
                    {vectorLength}
                </div>

                <button type="reset" onClick={() => resetParameters()}>
                    Reset
                </button>
                <p>Reset Step and Vector Length parameters</p>
            </div>
        </aside>
    );
};

export default Sidebar;
