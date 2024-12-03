import React, { useState } from 'react';
import { useStore } from '../../store';
import * as math from 'mathjs';
import { SlGraph } from 'react-icons/sl';

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
                    <button type="submit">
                        <SlGraph size={20} />
                        Graph
                    </button>
                </form>
                {error && <p className="error">{error}</p>}
                <p>Give a function in terms of z.</p>
            </div>
        </aside>
    );
};

export default Sidebar;
