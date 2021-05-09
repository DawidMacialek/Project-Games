import { Cell } from "./Cell.js";
import { Ui } from "./Ui.js";
import { Counter } from "./Counter.js";
import { Timer } from "./Timer.js";
import { Modal } from "./Modal.js";
import { UnstandardBoard } from "./UnstandardBoard.js";

class Game extends Ui {
  config = {
    easy: {
      rows: 8,
      cols: 8,
      mines: 10,
    },
    medium: {
      rows: 16,
      cols: 16,
      mines: 40,
    },
    expert: {
      rows: 16,
      cols: 30,
      mines: 99,
    },
  };
  counter = new Counter();
  timer = new Timer();
  modal = new Modal();
  unstandardBoard = new UnstandardBoard();
  cells = [];
  #board = null;
  cellElements = null;
  cellsToReveal = 0;
  revealedCells = 0;

  initialize() {
    this.handleElements();
    this.counter.init();
    this.timer.init();
    this.newGame();
    this.addButtonsEventListeners();
  }
  newGame(
    rows = this.config.easy.rows,
    cols = this.config.easy.cols,
    mines = this.config.easy.mines
  ) {
    this.numberOfRows = rows;
    this.numberOfCols = cols;
    this.numberOfMines = mines;

    this.cellsToReveal = 0;
    this.revealedCells = 0;

    this.counter.setValue(this.numberOfMines);
    this.setNumberOfColStyle();
    this.generateCells();
    this.renderBoard();
    this.placeMines();
    this.timer.resetTimer();
    this.cellElements = this.getElements(this.UiSelector.cell);

    this.addCellsEventListeners();
  }
  handleElements() {
    this.#board = this.getElement(this.UiSelector.board);
    this.resetBtn = this.getElement(this.UiSelector.reset);
    this.emotionFace = this.getElement(this.UiSelector.emotionFace);
    this.easyBtn = this.getElement(this.UiSelector.easyButton);
    this.mediumBtn = this.getElement(this.UiSelector.mediumButton);
    this.expertBtn = this.getElement(this.UiSelector.expertButton);
    this.playAgainModalBtn = this.getElement(this.UiSelector.modalBtn);
    this.boardFormBtn = this.getElement(this.UiSelector.boardFormBtn);
    this.cancelFormBtn = this.getElement(this.UiSelector.cancelInputFormBtn);
    this.submitFormBtn = this.getElement(this.UiSelector.submitFormBtn);
  }
  // event listeners
  addButtonsEventListeners() {
    this.playAgainModalBtn.addEventListener("click", () => {
      this.modal.toggleModal();
    });
    this.easyBtn.addEventListener("click", () => {
      this.handleNewGameClick(
        this.config.easy.rows,
        this.config.easy.cols,
        this.config.easy.mines
      );
    });
    this.mediumBtn.addEventListener("click", () => {
      this.handleNewGameClick(
        this.config.medium.rows,
        this.config.medium.cols,
        this.config.medium.mines
      );
    });
    this.expertBtn.addEventListener("click", () => {
      this.handleNewGameClick(
        this.config.expert.rows,
        this.config.expert.cols,
        this.config.expert.mines
      );
    });
    this.emotionFace.addEventListener("click", () => {
      this.handleNewGameClick();
    });
    this.boardFormBtn.addEventListener("click", () => {
      this.timer.stopTimer();
      this.unstandardBoard.toggleFormBoard();
    });
    this.cancelFormBtn.addEventListener("click", () => {
      this.timer.startTimer();
      this.unstandardBoard.toggleFormBoard();
    });
    this.submitFormBtn.addEventListener("click", () => {
      this.unstandardBoard.validateInputValue();
      if (this.unstandardBoard.valid) {
        this.handleNewGameClick(
          this.unstandardBoard.inputRows,
          this.unstandardBoard.inputCols,
          this.unstandardBoard.inputMines
        );
        this.unstandardBoard.toggleFormBoard();
      }
    });
  }
  addCellsEventListeners() {
    this.cellElements.forEach((element) => {
      element.addEventListener("click", this.handleCellClick);
      element.addEventListener("contextmenu", this.handleCellContextmenu);
    });
  }
  removeCellsEventListener() {
    this.cellElements.forEach((element) => {
      element.removeEventListener("click", this.handleCellClick);
      element.removeEventListener("contextmenu", this.handleCellContextmenu);
    });
  }

  handleNewGameClick(
    rows = this.numberOfRows,
    cols = this.numberOfCols,
    mines = this.numberOfMines
  ) {
    this.emotionFace.classList.remove("win", "lost");
    this.newGame(rows, cols, mines);
    console.log("new game");
  }

  generateCells() {
    this.cells.length = 0;
    for (let row = 0; row < this.numberOfRows; row++) {
      this.cells[row] = [];
      for (let col = 0; col < this.numberOfCols; col++) {
        this.cells[row].push(new Cell(col, row));
      }
    }
    console.log(this.cellElements);
  }
  renderBoard() {
    while (this.#board.firstChild) {
      this.#board.removeChild(this.#board.lastChild);
    }
    this.cells.flat().forEach((cell) => {
      this.#board.insertAdjacentHTML("beforeend", cell.createElement());
      cell.element = cell.getElement(cell.selector);
    });
  }
  handleCellClick = (e) => {
    const target = e.target;
    target.classList.add("revealed");
    const rowIndex = parseInt(target.getAttribute("data-y"), 10);
    const colIndex = parseInt(target.getAttribute("data-x"), 10);
    const cell = this.cells[rowIndex][colIndex];
    this.clickCell(cell);
  };
  handleCellContextmenu = (e) => {
    e.preventDefault();
    const target = e.target;
    const rowIndex = parseInt(target.getAttribute("data-y"), 10);
    const colIndex = parseInt(target.getAttribute("data-x"), 10);
    const cell = this.cells[rowIndex][colIndex];

    if (cell.isRevealed) return;

    if (cell.isFlagged) {
      this.counter.increment();
      cell.toggleFlag();
      return;
    }
    if (!!this.counter.value) {
      this.counter.decrement();
      cell.toggleFlag();
    }
  };
  clickCell(cell) {
    if (cell.isFlagged) {
      cell.toggleFlag();
    }
    if (cell.isMine) {
      this.endGameLost();
      return;
    }
    this.setCellValue(cell);
    this.endGameWin();
  }
  endGameLost() {
    this.emotionFace.classList.add("lost");
    this.cells
      .flat()
      .filter(({ isMine }) => isMine)
      .forEach((cell) => {
        cell.revealCell();
        if (cell.isMine) {
          cell.cellIsMine(cell);
        }
      });
    this.timer.stopTimer();
    this.modal.infoText = "You lost!";
    this.modal.setModalText();
    this.modal.toggleModal();
    this.removeCellsEventListener();
  }
  endGameWin() {
    this.cellsToReveal =
      this.numberOfRows * this.numberOfCols - this.numberOfMines;

    if (this.cellsToReveal === this.revealedCells) {
      this.emotionFace.classList.add("win");
      console.log("win");
      this.timer.stopTimer();
      this.modal.infoText = `You Win in ${this.timer.numberOfSeconds} seconds Congratulations!`;
      this.modal.setModalText();
      this.modal.toggleModal();
      this.removeCellsEventListener();
    }
  }
  setCellValue(cell) {
    let countMines = 0;
    for (
      let rowIndex = Math.max(cell.y - 1, 0);
      rowIndex <= Math.min(cell.y + 1, this.numberOfRows - 1);
      rowIndex++
    ) {
      for (
        let colIndex = Math.max(cell.x - 1, 0);
        colIndex <= Math.min(cell.x + 1, this.numberOfCols - 1);
        colIndex++
      ) {
        if (this.cells[rowIndex][colIndex].isMine) {
          countMines++;
        }
      }
    }
    cell.value = countMines;
    cell.revealCell(cell);
    this.revealedCells++;
    if (cell.value === 0) {
      for (
        let rowIndex = Math.max(cell.y - 1, 0);
        rowIndex <= Math.min(cell.y + 1, this.numberOfRows - 1);
        rowIndex++
      ) {
        for (
          let colIndex = Math.max(cell.x - 1, 0);
          colIndex <= Math.min(cell.x + 1, this.numberOfCols - 1);
          colIndex++
        ) {
          const cell = this.cells[rowIndex][colIndex];
          if (!cell.isRevealed) {
            this.clickCell(cell);
          }
        }
      }
    }
  }

  placeMines() {
    let numberOfMinesToPlace = this.numberOfMines;
    while (numberOfMinesToPlace) {
      const rowIndex = this.getRandomNumber(0, this.numberOfRows - 1);
      const colIndex = this.getRandomNumber(0, this.numberOfCols - 1);

      const cell = this.cells[rowIndex][colIndex];
      const cellHasMine = cell.isMine;

      if (!cellHasMine) {
        cell.addMine();
        numberOfMinesToPlace--;
      }
    }
  }
  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) - min;
  }
  setNumberOfColStyle() {
    document.documentElement.style.setProperty(
      "--cols-number",
      this.numberOfCols
    );
  }
}

window.onload = function () {
  const game = new Game();
  game.initialize();
};
