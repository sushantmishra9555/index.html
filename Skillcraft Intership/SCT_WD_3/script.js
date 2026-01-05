const boardElement = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const modeRadios = document.querySelectorAll('input[name="mode"]');

let gameActive = true;
let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameMode = "pvp"; // Default: Player vs Player

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const clickedIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedIndex] !== "" || !gameActive) return;

    executeMove(clickedCell, clickedIndex);

    // If it's Computer's turn
    if (gameActive && gameMode === "pvc" && currentPlayer === "O") {
        boardElement.style.pointerEvents = "none"; // Disable clicks during AI "thought"
        setTimeout(computerMove, 500); // 0.5s delay for realism
    }
}

function executeMove(cell, index) {
    gameState[index] = currentPlayer;
    cell.innerText = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    
    if (checkResult()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
}

function computerMove() {
    // 1. Logic: Try to take the middle first, otherwise random
    const availableIndices = gameState.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
    
    let move;
    if (availableIndices.includes(4)) {
        move = 4; // Strategic center move
    } else {
        move = availableIndices[Math.floor(Math.random() * availableIndices.length)];
    }

    const targetCell = document.querySelector(`.cell[data-index="${move}"]`);
    executeMove(targetCell, move);
    boardElement.style.pointerEvents = "auto";
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} Wins!`;
        gameActive = false;
        return true;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerText = "It's a Draw!";
        gameActive = false;
        return true;
    }
    return false;
}

// Reset and Mode Switching
function resetGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerText = "Player X's Turn";
    boardElement.style.pointerEvents = "auto";
    document.querySelectorAll('.cell').forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('x', 'o');
    });
}

modeRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        gameMode = e.target.value;
        resetGame();
    });
});

boardElement.addEventListener('click', handleCellClick);
resetBtn.addEventListener('click', resetGame);


