document.addEventListener("DOMContentLoaded", function () {
  const board = document.getElementById("board");
  let currentPlayer = "X";
  let gameBoard = Array(9).fill("");

  board.addEventListener("click", handleCellClick);

  function handleCellClick(event) {
    const cell = event.target;
    if (!cell.classList.contains("cell")) return;

    const index = cell.dataset.index;

    if (gameBoard[index] === "") {
      gameBoard[index] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWin(currentPlayer)) {
        alert(`Gracz ${currentPlayer} wygrywa!`);
        resetGame();
      } else if (checkDraw()) {
        alert("Remis!");
        resetGame();
      } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
      }
    }
  }

  function checkWin(player) {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let combination of winConditions) {
      let win = true;
      for (let index of combination) {
        if (gameBoard[index] !== player) {
          win = false;
          break;
        }
      }
      if (win) return true;
    }
    return false;
  }

  function checkDraw() {
    for (let cell of gameBoard) {
      if (cell === "") return false;
    }
    return true;
  }

  function resetGame() {
    gameBoard.fill("");
    currentPlayer = "X";
    const cells = board.querySelectorAll(".cell");
    for (let cell of cells) {
      cell.textContent = "";
    }
  }
});
