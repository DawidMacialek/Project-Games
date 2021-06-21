export class Common {
  constructor(htmlElement) {
    if (typeof htmlElement === "undefined") return;

    this.htmlElement = this.bindToElement(htmlElement);
  }
  bindToElement(elementToFindById) {
    const element = document.getElementById(elementToFindById);
    if (!element) {
      throw new Error("that html element do not exist");
    }
    return element;
  }
}
