import { Ui } from "./Ui.js";

export class Modal extends Ui {
  infoText =  "";
  modal = this.getElement(this.UiSelector.modal);
  infoResult = this.getElement(this.UiSelector.modalHeader);
  
  toggleModal() {
    this.modal.classList.toggle("hide");
  }
  setModalText() {
    this.infoResult.textContent = this.infoText;
  }
}
