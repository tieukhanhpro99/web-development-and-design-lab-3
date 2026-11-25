// DOM elements
const boardElement = document.querySelector('#board');
const statusElement = document.querySelector('#status');

const xWinsElement = document.querySelector('#xWins');
const oWinsElement = document.querySelector('#oWins');
const drawsElement = document.querySelector('#draws');

const newRoundBtn = document.querySelector('#newRound');


// Game data
let board = Array(9).fill('');

let currentPlayer = 'X';

let gameOver = false;


// Scoreboard
let scores = {
    X: 0,
    O: 0,
    draws: 0
};


// Winning combinations
const winningCombinations = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];


// Create 9 cells
boardElement.innerHTML = Array.from(
    { length: 9 },
    (_, index) => `
        <button
            class="cell"
            data-index="${index}">
        </button>
    `
).join('');


// 1. Check winner
function checkWinner() {

    return winningCombinations.find(([a, b, c]) => {

        return (
            board[a] !== '' &&
            board[a] === board[b] &&
            board[b] === board[c]
        );

    });

}


// 2. Update board
function renderBoard() {

    const cells = boardElement.querySelectorAll('.cell');

    cells.forEach((cell, index) => {

        cell.textContent = board[index];

        cell.classList.toggle('x', board[index] === 'X');
        cell.classList.toggle('o', board[index] === 'O');

        cell.disabled = gameOver || board[index] !== '';

    });

}


// 3. Update scoreboard
function renderScore() {

    xWinsElement.textContent = scores.X;

    oWinsElement.textContent = scores.O;

    drawsElement.textContent = scores.draws;

}


// 4. Handle cell click
boardElement.addEventListener('click', (e) => {

    const cell = e.target.closest('.cell');

    if (!cell) return;

    const index = Number(cell.dataset.index);

    // Ignore invalid moves
    if (gameOver || board[index] !== '') {
        return;
    }

    // Place X or O
    board[index] = currentPlayer;


    // Check winner
    const winningLine = checkWinner();

    if (winningLine) {

        gameOver = true;

        scores[currentPlayer]++;

        statusElement.textContent =
            `Player ${currentPlayer} wins!`;

    }

    // Check draw
    else if (board.every(cell => cell !== '')) {

        gameOver = true;

        scores.draws++;

        statusElement.textContent = "It's a draw!";

    }

    // Switch player
    else {

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

        statusElement.textContent =
            `Player ${currentPlayer}'s turn`;

    }

    renderBoard();

    renderScore();

});


// 5. Start new round
function startNewRound() {

    board = Array(9).fill('');

    currentPlayer = 'X';

    gameOver = false;

    statusElement.textContent = "Player X's turn";

    renderBoard();

}


// New Round button
newRoundBtn.addEventListener('click', startNewRound);


// Initial render
renderBoard();

renderScore();