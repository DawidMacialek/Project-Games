import { Common } from "./Common.js";

const BOARD_HTML = "board";
const NUMBER_OF_CARDS = 30;
export const cards = [];
export let card = null;
let clickedCardsIndex = [];
let clickedCardsHtml = [];
const matchedCardsArray = [];

export class Board extends Common {
  constructor(cardQ) {
    super();
    this.cardQ = cardQ;
  }
  createCards() {
    for (let i = 1; i <= NUMBER_OF_CARDS; i++) {
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
  hideCard() {
    clickedCardsHtml.forEach((item) => {
      if (!matchedCardsArray.includes(item)) {
        item.style.setProperty(
          "background-image",
          `url(images/card-background.jpg`
        );
      }
    });
  }
  removeCard() {
    clickedCardsHtml.length = 2;
    clickedCardsHtml.forEach((item) => {
      item.style.setProperty("background-image", `none`);
      item.style.setProperty("border", `none`);
    });
  }
  clearArrays() {
    clickedCardsHtml = [];
    clickedCardsIndex = [];
  }

  matchingCards(clickedCard) {
    let clickedCardIndex = clickedCard.getAttribute("data-id");
    // sprawdzenie czy jest to div
    if (isNaN(clickedCardIndex) || clickedCardIndex == null) return;
    // klikniecie tej samej karty
    if (clickedCardsHtml.length <= 2 && clickedCardsHtml.length <= 2) {
      clickedCardsHtml.push(clickedCard);
      if (clickedCardsHtml[0] === clickedCardsHtml[1]) {
        clickedCardsHtml.length = 1;
        return;
      }
    }
    if (matchedCardsArray.includes(clickedCard)) {
      return;
    }
    clickedCardsIndex.push(clickedCardIndex);

    if (clickedCardsIndex.length <= 2) {
      clickedCard.style.setProperty(
        "background-image",
        `url(images/card-${clickedCardIndex}.png`
      );

      if (
        clickedCardsIndex.length === 2 &&
        clickedCardsIndex[0] !== clickedCardsIndex[1]
      ) {
        window.setTimeout(() => {
          this.hideCard();
          this.clearArrays();
        }, 2000);
        return;
      }
      if (
        clickedCardsIndex.length === 2 &&
        clickedCardsHtml.length === 2 &&
        clickedCardsIndex[0] === clickedCardsIndex[1]
      ) {
        matchedCardsArray.push(...clickedCardsHtml);
        window.setTimeout(() => {
          this.removeCard();
          this.clearArrays();
        }, 1000);
        return;
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
