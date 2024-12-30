const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const playAgainButton = document.getElementById('play-again');
let boardState = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== "")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    if (currentPlayer === "O") {
        botMove();
    }
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => boardState[index] === currentPlayer);
    });
}

function botMove() {
    let emptyCells = boardState.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    boardState[randomIndex] = currentPlayer;
    document.querySelector(`.cell[data-index="${randomIndex}"]`).textContent = currentPlayer;

    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (boardState.every(cell => cell !== "")) {
        statusDisplay.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function resetGame() {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    statusDisplay.textContent = "";
    document.querySelectorAll('.cell').forEach(cell => cell.textContent = "");
}

board.addEventListener('click', handleCellClick);
playAgainButton.addEventListener('click', resetGame);
