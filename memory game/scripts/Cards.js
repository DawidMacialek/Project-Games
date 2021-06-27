import { Common } from "./Common.js";

const BOARD_HTML = "board";
export const cards = [];
export let card = null;

export class Cards extends Common {
  constructor(numberOfCards) {
    super();
    this.numberOfCards = numberOfCards;
  }
  createCards() {
    for (let j = 0; j < 2; j++) {
      for (let i = 1; i <= this.numberOfCards / 2; i++) {
        card = document.createElement("div");
        card.setAttribute("class", `card `);
        card.setAttribute("data-id", `${i}`);
        card.style.setProperty(
          "background-image",
          `url(images/card-background.jpg`
        );
        cards.push(card);
      }
    }
  }
  shuttleCards() {
    this.createCards();
    let currentIndex = cards.length;
    let randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex--);
      [cards[currentIndex], cards[randomIndex]] = [
        cards[randomIndex],
        cards[currentIndex],
      ];
    }
    return cards;
  }
  drawBoard() {
    this.shuttleCards();
    const boardHTML = this.bindToElement(BOARD_HTML);
    cards.forEach((item) => {
      boardHTML.appendChild(item);
    });
  }
}