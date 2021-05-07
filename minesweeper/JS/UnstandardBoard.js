import { Ui } from "./Ui.js";

export class UnstandardBoard extends Ui {
  constructor(inputRows, inputCols, inputMines) {
    super();
    this.inputRows = inputRows;
    this.inputCols = inputCols;
    this.inputMines = inputMines;

    // boardForm = null;
    this.valid = false;
  }
  toggleFormBoard() {
    this.boardForm = this.getElement(this.UiSelector.unstandardBoard);
    this.boardForm.classList.toggle("show");
    console.log(this.inputRows);
  }

  validateInputValue(valid) {
    this.inputRows = this.getElement(this.UiSelector.inputRows).value;
    this.inputCols = this.getElement(this.UiSelector.inputCols).value;
    this.inputMines = this.getElement(this.UiSelector.inputMines).value;
    if (
      this.inputRows >= 8 &&
      this.inputRows <= 16 &&
      this.inputMines >= 10 &&
      this.inputMines <= (this.inputRows - 1) * (this.inputCols - 1) &&
      this.inputCols >= 8 &&
      this.inputCols <= 30
    ) {
      this.valid = true;
    } else if (this.inputRows < 8 || this.inputRows > 24) {
      alert("Please choose number of rows between 8 and 24");
      valid = false;
    } else if (this.inputCols < 8 || this.inputCols > 30) {
      alert("Please choose number of columns between 8 and 30");
      this.valid = false;
    } else if (this.inputMines > (this.inputRows - 1) * (this.inputCols - 1) || this.inputMines < 10) {
      alert(
        `Please choose number of mines between 10 and ${
          (this.inputRows - 1) * (this.inputCols - 1)
        }`
      );
      this.valid = false;
    }
  }
}
