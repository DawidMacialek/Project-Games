import { Common } from "./Common.js";
import { Timer } from "./Timer.js";

class Game extends Common {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.timer = new Timer();
    this.timer.setTimer();
  }
}
const game = new Game();
