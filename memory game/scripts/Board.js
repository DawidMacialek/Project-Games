let clickedCardsIndex = [];
let clickedCardsHtml = [];
export let matchedCardsArray = [];
export let movesCounter = 0;

export class Board {
  constructor(clickedCard) {
    this.clickedCard = clickedCard;
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
  restartBoard() {
    movesCounter = 0;
    matchedCardsArray.length = 0;
  }
  matchingCards(clickedCard) {
    let clickedCardIndex = clickedCard.getAttribute("data-id");
    // sprawdzenie czy jest to div
    if (isNaN(clickedCardIndex) || clickedCardIndex == null) return;
    // klikniecie tej samej karty
    if (clickedCardsHtml.length <= 2 && clickedCardsHtml.length <= 2) {
      console.log(matchedCardsArray.length);
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
        movesCounter++;
        window.setTimeout(() => {
          this.hideCard();
          this.clearArrays();
        }, 1000);
        return;
      }
      if (
        clickedCardsIndex.length === 2 &&
        clickedCardsHtml.length === 2 &&
        clickedCardsIndex[0] === clickedCardsIndex[1]
      ) {
        matchedCardsArray.push(...clickedCardsHtml);
        movesCounter++;
        window.setTimeout(() => {
          this.removeCard();
          this.clearArrays();
        }, 1000);
        return;
      }
    }
  }
}
