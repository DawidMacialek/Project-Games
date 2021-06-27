import { Common } from "./Common.js";

const TIMER_HTML = "timer";
let sec = 0;
let min = 0;

export class Timer extends Common {
  constructor() {
    super();
  }
  drawTimer() {
    const element = this.bindToElement(TIMER_HTML);
    sec++;
    if (sec <= 9) {
      element.textContent = `${min}:0${sec}`;
    }
    if (sec > 9) {
      element.textContent = `${min}:${sec}`;
    }
    if (sec >= 19) {
      sec = 0;
      min++;
      element.textContent = `${min}:${sec}0`;
    }
    if (min >= 10) {
      sec = 0;
      min = 0;
      element.textContent = `${min}:${sec}0`;
    }
  }

  setTimer() {
    const runTimer = setInterval(() => {
      this.drawTimer();
    }, 1000);
  }
  restartTimer() {
    clearInterval(runTimer);
  }
}
