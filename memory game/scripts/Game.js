import { Common } from "./Common.js";
import { Timer, sec, min } from "./Timer.js";
import { Board, matchedCardsArray, movesCounter } from "./Board.js";
import { Cards } from "./Cards.js";
import { MovesCounter } from "./MovesCounter.js";

const HTML_RESTART_BUTTON = "restart-button";
const HTML_MODAL = "modal";
const HTML_MODAL_BUTTON = "play-again-button";
const HTML_MODAL_TEXT = "score";
// let movesCounter = 0

let clickedCard = null;
let numberOfCards = 30;
class Game extends Common {
  constructor() {
    super();

    this.init();
    const modal = this.bindToElement(HTML_MODAL);
  }
  init() {
    this.cards = new Cards(numberOfCards);
    this.board = new Board(clickedCard);
    this.timer = new Timer();
    this.counter = new MovesCounter();
    this.timer.setTimer();
    this.cards.drawBoard();
    this.handleClicks();
  }
  handleClicks() {
    window.addEventListener("click", (event) => {
      clickedCard = event.target;
      this.board.matchingCards(clickedCard);
      this.counter.drawCounter();
      this.checkEndOfTheGame();
    });
    const playAgainButton = this.bindToElement(HTML_MODAL_BUTTON);
    playAgainButton.addEventListener("click", () => {
      this.hideModal();
      this.restartGame();
    });
    const restartButton = this.bindToElement(HTML_RESTART_BUTTON);
    restartButton.addEventListener("click", () => {
      console.log("restartuje,y gre");
      // this.counter.restartCounter();
      this.timer.stopTimer();

      this.restartGame();
    });
  }
  checkEndOfTheGame() {
    const modalText = this.bindToElement(HTML_MODAL_TEXT);
    if (matchedCardsArray.length === numberOfCards) {
      modalText.textContent = `Your score: 
      ${min} minutes ${sec} seconds in ${movesCounter} moves `;

      this.showModal();
      this.timer.stopTimer();
    }
  }
  restartGame() {
    console.log("restaryujemy gre");
    this.cards.clearBoard();
    this.board.restartBoard();
    this.init();
  }
  hideModal() {
    modal.classList.add("hide");
  }
  showModal() {
    modal.classList.remove("hide");
  }
}
const game = new Game();
