const boardSize = 3; // Define the size of the grid (3x3)
const board = Array(boardSize * boardSize).fill(null);
let currentPlayer = "X";
let gameActive = true;
const message = document.getElementById("message");
const boardElement = document.querySelector(".board");

function createBoard() {
    boardElement.innerHTML = "";

    boardElement.style.gridTemplateColumns = `repeat(${boardSize}, 120px)`;
    boardElement.style.gridTemplateRows = `repeat(${boardSize}, 120px)`;

    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;

        const card = document.createElement("div");
        card.classList.add("card");

        const front = document.createElement("div");
        front.classList.add("front");

        const back = document.createElement("div");
        back.classList.add("back");

        card.appendChild(front);
        card.appendChild(back);
        cell.appendChild(card);

        cell.addEventListener("click", handleCellClick);

        boardElement.appendChild(cell);
    }
}

function handleCellClick(e) {
    const cell = e.currentTarget;
    const index = cell.dataset.index;

    if (board[index] || !gameActive) return;

    board[index] = currentPlayer;
    cell.querySelector(".back").textContent = currentPlayer;
    cell.classList.add("clicked");

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
    } else if (board.every((cell) => cell)) {
        message.textContent = "Draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        message.textContent = `Turn: ${currentPlayer}`;
    }
}

// Function to check for a win
function checkWin() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winningCombinations.some((combination) => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetGame() {
    board.fill(null);
    currentPlayer = "X";
    gameActive = true;
    message.textContent = `Turn: ${currentPlayer}`;
    createBoard();
}

createBoard();
