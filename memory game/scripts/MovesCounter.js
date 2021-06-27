import { Common } from "./Common.js";
import { movesCounter } from "./Board.js";

const COUNTER_HTML = "counter";

export class MovesCounter extends Common {
  drawCounter() {
    const counter = this.bindToElement(COUNTER_HTML);
    console.log(counter);
    if (movesCounter < 10) {
      counter.textContent = `MOVES: 0${movesCounter}`;
    }
    if (movesCounter >= 10) {
      counter.textContent = `MOVES: ${movesCounter}`;
    }
  }
}
