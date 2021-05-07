import { Ui } from "./Ui.js";

export class Timer extends Ui {
  element = null;
  numberOfSeconds = 0;
  maxNumberOfSeconds = 999;
  setInterval = null;
  sec = 0;

  init() {
    this.element = this.getElement(this.UiSelector.timer);
  }

  startTimer() {
    this.setInterval = window.setInterval(() => this.updateTimer(), 1000);
  }
  stopTimer() {
    clearInterval(this.setInterval);
  }
  resetTimer() {
      this.numberOfSeconds = 0;
    this.stopTimer();
    this.startTimer();
    this.updateTimer();
  }
  updateTimer() {
    this.numberOfSeconds++;
    this.setTimerValue(this.numberOfSeconds);
    if (this.numberOfSeconds === this.maxNumberOfSeconds) {
      this.stopTimer();
    }
  }
  setTimerValue() {
    if (this.numberOfSeconds < 10) {
      this.element.textContent = `00${this.numberOfSeconds}`;
    }
    if (this.numberOfSeconds >= 10 && this.numberOfSeconds < 100) {
      this.element.textContent = `0${this.numberOfSeconds}`;
    }
    if (this.numberOfSeconds >= 100) {
      this.element.textContent = this.numberOfSeconds;
    }
  }
}
