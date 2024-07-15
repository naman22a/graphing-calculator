import React, { useState } from 'react';
import { useStore } from '../../store';
import * as math from 'mathjs';

interface Props {}

const Sidebar: React.FC<Props> = () => {
    const { expression, setExpression, setGraph } = useStore();
    const [error, setError] = useState('');

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
                        onChange={(e) => setExpression(e.target.value)}
                        autoComplete="off"
                    />
                    <button type="submit">Graph</button>
                </form>
                {error && <p className="error">{error}</p>}
            </div>
        </aside>
    );
};

export default Sidebar;
