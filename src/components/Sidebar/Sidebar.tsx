import React from 'react';
import { useStore } from '../../store';

interface Props {}

const Sidebar: React.FC<Props> = () => {
    const { expression, setExpression, setGraph } = useStore();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (expression) {
            setGraph(true); // start drawing the graph
        }
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-container">
                <h1>Function</h1>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type="text"
                        value={expression}
                        onChange={(e) => setExpression(e.target.value)}
                        autoComplete="off"
                    />
                    <button type="submit">Graph</button>
                </form>
            </div>
        </aside>
    );
};

export default Sidebar;
