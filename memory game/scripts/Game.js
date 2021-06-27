import { Common } from "./Common.js";
import { Timer } from "./Timer.js";
import { Board } from "./Board.js";
import { Cards } from "./Cards.js";
import { MovesCounter } from "./MovesCounter.js";

let clickedCard = null;
let numberOfCards = 30;
class Game extends Common {
  constructor() {
    super();
    this.init();
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
    });
  }
}
const game = new Game();
