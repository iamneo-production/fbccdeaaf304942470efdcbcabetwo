// JavaScript code for Tic Tac Toe game logic

// Variables to keep track of game state
let currentPlayer = 'X';
let gameEnded = false;

// Function to handle player's move
function handleMove(event) {
    const inputField = event.target;

    // Check if the input field is empty and the game is not ended
    if (inputField.value === '' && !gameEnded) {
        inputField.value = currentPlayer;
        inputField.classList.add('disabled');

        // Check for a winning condition
        if (checkWin()) {
            endGame(`${currentPlayer} wins!`);
        } else if (checkDraw()) {
            endGame("It's a draw!");
        } else {
            // Switch to the next player
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            document.querySelector('.result').textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

// Function to check for a winning condition
function checkWin() {
    const grid = document.querySelectorAll('.btn');

    // Define winning combinations
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    // Check if any winning combination is achieved
    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (grid[a].value !== '' && grid[a].value === grid[b].value && grid[a].value === grid[c].value) {
            return true;
        }
    }

    return false;
}

// Function to check for a draw condition
function checkDraw() {
    const grid = document.querySelectorAll('.btn');

    // Check if all input fields are filled
    for (const inputField of grid) {
        if (inputField.value === '') {
            return false;
        }
    }

    return true;
}

// Function to end the game
function endGame(result) {
    gameEnded = true;
    document.querySelector('.result').textContent = result;
    document.getElementById('reset-btn').disabled = false;
}

// Event listener for player's move
const inputFields = document.querySelectorAll('.btn');
for (const inputField of inputFields) {
    inputField.addEventListener('click', handleMove);
}

// Event listener for reset button
document.getElementById('reset-btn').addEventListener('click', function () {
    location.reload();
});
