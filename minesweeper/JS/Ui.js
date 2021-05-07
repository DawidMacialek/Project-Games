export class Ui {
  UiSelector = {
    board: "[data-board]",
    cell: "[data-cell]",
    counter: "[data-counter]",
    emotionFace: "[data-emotion]",
    reset: "[data-emotion]",
    timer: "[data-timer]",
    easyButton: "[data-easy-btn]",
    mediumButton: "[data-medium-btn]",
    expertButton: "[data-expert-btn]",
    boardFormBtn: "[data-input-btn]",
    modal: "[data-modal]",
    modalHeader: "[data-modal-header]",
    modalBtn: "[data-modal-button]",
    unstandardBoard: "[data-unstandard-board]",
    inputRows: "[data-input-rows]",
    inputCols: "[data-input-cols]",
    inputMines: "[data-input-mines]",
    inputSubmitBtn: "[data-input-submit-btn]",
    cancelInputFormBtn: "[data-cancel-input-form]",
    submitFormBtn: "[data-input-submit-btn]",
  };

  getElement(selector) {
    return document.querySelector(selector);
  }
  getElements(selector) {
    return document.querySelectorAll(selector);
  }
}
