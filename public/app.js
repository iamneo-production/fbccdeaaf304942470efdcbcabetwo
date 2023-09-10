// Initial game state
let cells = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let result = document.querySelector('.result');
let btns = document.querySelectorAll('.btn');
let conditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Function to handle player's move
function ticTacToe(btn, index) {
    if (btn.value === '' && !gameEnded) {
        btn.value = currentPlayer;
        btn.classList.add('disabled');
        cells[index] = currentPlayer;

        if (checkWin()) {
            endGame(`${currentPlayer} wins!`);
        } else if (checkDraw()) {
            endGame("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            result.textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

// Function to check for a winning condition
function checkWin() {
    for (const condition of conditions) {
        const [a, b, c] = condition;
        if (cells[a] !== '' && cells[a] === cells[b] && cells[a] === cells[c]) {
            return true;
        }
    }
    return false;
}

// Function to check for a draw condition
function checkDraw() {
    return cells.every(cell => cell !== '');
}

// Function to end the game
function endGame(resultText) {
    gameEnded = true;
    result.textContent = resultText;
    document.getElementById('reset-btn').disabled = false;
}

// Function to reset the game
function resetGame() {
    cells = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    result.textContent = "Player X's Turn";
    btns.forEach(btn => {
        btn.value = '';
        btn.classList.remove('disabled');
    });
    gameEnded = false;
    document.getElementById('reset-btn').disabled = true;
}

// Event listeners
btns.forEach((btn, i) => {
    btn.addEventListener('click', () => ticTacToe(btn, i));
});

document.querySelector('#reset-btn').addEventListener('click', resetGame);
