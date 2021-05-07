import { Ui } from "./Ui.js";

export class Cell extends Ui {
  constructor(x, y) {
    super();
    this.x = x;
    this.y = y;
    this.value = 0;
    this.isMine = false;
    this.isFlagged = false;
    this.isRevealed = false;

    this.element = null;
    this.selector = `[data-x="${this.x}"][data-y="${this.y}"]`;
  }
  createElement() {
    const element = `<div class="cell" data-cell data-x=${this.x} data-y=${this.y}></div>`;
    return element;
  }
  toggleFlag() {
    this.isFlagged = !this.isFlagged;
    this.element.classList.toggle("cell-is-flag");
  }
  cellIsMine(element) {
    this.element.classList.add("cell-is-mine");
  }
  revealCell() {
    this.isRevealed = true;
    this.element.classList.add("revealed");
    if (this.value && !this.isMine) {
      this.element.textContent = this.value;
      this.element.classList.add(`cell-info-${this.value}`);
    }
  }
  addMine() {
    this.isMine = true;
  }
}
