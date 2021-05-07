import { Ui } from "./Ui.js";
export class Counter extends Ui {
  value = 10;
  element = null;

  init() {
    this.element = this.getElement(this.UiSelector.counter);
  }
  setValue(value) {
    this.value = value;
    this.updateValue();
  }
  increment() {
    this.value++;
    this.updateValue();
  }
  decrement() {
    this.value--;
    this.updateValue();
  }
  updateValue() {
    if (this.value < 10) {
      this.element.textContent = `00${this.value}`;
    } else if (this.value < 100) {
      this.element.textContent = `0${this.value}`;
    } else {
      this.element.textContent = this.value;
    }
  }
}
