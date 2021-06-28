import { Common } from "./Common.js";
import { movesCounter } from "./Board.js";

const COUNTER_HTML = "counter";

export class MovesCounter extends Common {
  constructor() {
    super();
  }
  
  drawCounter() {
    console.log(movesCounter);
    const counter = this.bindToElement(COUNTER_HTML);
    if (movesCounter < 10) {
      counter.textContent = `moves: 0${movesCounter}`;
    }
    if (movesCounter >= 10) {
      counter.textContent = `moves: ${movesCounter}`;
    }
  }
}
