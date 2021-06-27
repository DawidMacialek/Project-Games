import { Common } from "./Common.js";
import { Timer } from "./Timer.js";
import { Board } from "./Board.js";

let clickedCard = null;

class Game extends Common {
  constructor() {
    super();
    this.init();
  }
  init() {
    this.board = new Board(clickedCard);
    this.timer = new Timer();
    this.timer.setTimer();
    this.board.drawBoard();
    this.handleClicks();
    // console.log(cards);
  }
  handleClicks() {
    window.addEventListener("click", (event) => {
      clickedCard = event.target;
      // clickedCard.getAttribute("class");
      // console.log(clickedCard.getAttribute("class"));
      // this.cardHidden = true;
      this.board.matchingCards(clickedCard);
    });
  }
}
const game = new Game();
