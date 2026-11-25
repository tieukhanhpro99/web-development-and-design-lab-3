import './App.css';

const sampleBoard = [
    'X', '', 'O',
    '', 'O', '',
    'X', '', '',
];

const sampleScores = [
    { label: 'Player X', wins: 3 },
    { label: 'Draws', wins: 1 },
    { label: 'Player O', wins: 2 },
];

function Scoreboard({ scores }) {
    return (
        <div className="scoreboard">
            {scores.map(({ label, wins }) => (
                <div key={label}>
                    <p>{label}</p>
                    <h2>{wins}</h2>
                </div>
            ))}
        </div>
    );
}

function GameStatus({ currentPlayer }) {
    return <h3 id="status">Player {currentPlayer}'s turn</h3>;
}

function Cell({ value, position }) {
    const cellClass = value ? `cell ${value.toLowerCase()}` : 'cell';

    return (
        <button
            type="button"
            className={cellClass}
            aria-label={`Cell ${position}: ${value || 'empty'}`}
            disabled
        >
            {value}
        </button>
    );
}

function Board({ cells }) {
    return (
        <div className="board" role="group" aria-label="Tic-Tac-Toe board">
            {cells.map((value, index) => (
                <Cell key={index} value={value} position={index + 1} />
            ))}
        </div>
    );
}

export default function App() {
    return (
        <main className="game">
            <h1>Tic-Tac-Toe</h1>
            <Scoreboard scores={sampleScores} />
            <GameStatus currentPlayer="X" />
            <Board cells={sampleBoard} />
            <button type="button" id="newRound" disabled>↻ New Round</button>
        </main>
    );
}
