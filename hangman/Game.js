import { Quote } from "./Quote.js";

class Game {
        
    text = [
        {
        wordToGuess: "table",
        catchWordClue: "set for dinner",
        },
        {
        wordToGuess: "matrix",
        catchWordClue: "fantastic movie",
        },   
        {
        wordToGuess: "house",
        catchWordClue: "building where people live",
        },   
        {
        wordToGuess: "jazz",
        catchWordClue: "kind of music",
        },   
        {
        wordToGuess: "flapjack",
        catchWordClue: "oats sweets",
        },   
        {
        wordToGuess: "kitchen",
        catchWordClue: "place in a house",
        },   
        {
        wordToGuess: "mortal combat",
        catchWordClue: "old fight game",
        },   
        {
        wordToGuess: "gold fish",
        catchWordClue: "making whishes",
        },   
        {
        wordToGuess: "goalkeeper",
        catchWordClue: "most important defender on the pitch",
        },   
        {
        wordToGuess: "rocking chair",
        catchWordClue: "seat and swing",
        },   
    ]
        firstMistake = 0;
        lastMistake = 6;

    constructor({wrongLetters, figureParts, word, catchword, repeatedWord, playAgainBtn, endGame}) {
        this.wrongLetters = wrongLetters;
        this.figureParts = figureParts;
        this.word = word;
        this.catchword = catchword;
        this.repeatedWord = repeatedWord;
        this.playAgainBtn = playAgainBtn;
        this.endGame = endGame;

        
        
        const { wordToGuess, catchWordClue } = this.text[Math.floor(Math.random() * this.text.length)];

        this.word.innerHTML = wordToGuess;
        this.catchword.innerHTML = catchWordClue;

        this.quote = new Quote(wordToGuess);
        
        // Events
        window.addEventListener('keydown', this.check);
        
        this.playAgainBtn.addEventListener('click', this.playAgain);
        
    }
    check(e, letter) {
        if (e.keyCode >= 65 && e.keyCode <= 95) {
            let letter = e.key;
            game.keyDown(letter);   
        } 
    }
    keyDown(letter) {
       
        this.showNotification(letter);
            if (this.quote.guess(letter)) {
                this.drawQuote();    
            } else {
                this.figureParts[this.firstMistake].style.display = "block";
                this.firstMistake++
                this.drawWrongLetter();
                if (this.firstMistake === this.lastMistake) 
                {
                    this.loosing();
                }
            }      
    }
    hideNotification() {
        game.repeatedWord.classList.remove('show');
    }
    showNotification(letter) {
        window.clearTimeout(this.hideNotification);
        if (this.quote.guessed.includes(letter) || this.quote.wrong.includes(letter)) {
            this.repeatedWord.classList.add('show');
        }
        window.setTimeout(this.hideNotification, 1500);
    }
    drawWrongLetter() {
        const wrongLet = this.quote.wrong;
        this.wrongLetters.innerHTML = wrongLet;
    }
    loosing() {
        this.endGame.style.display = "block";
        const span = document.createElement("span");
        span.innerHTML = "You lost the game!"
        this.endGame.appendChild(span);
    }
    winning() {
        this.endGame.style.display = "block";
        const span = document.createElement("span");
        span.innerHTML = "You win the game!"
        this.endGame.appendChild(span);
    }
    drawQuote() {
        const content = this.quote.drawContent(); 
        this.word.innerHTML = content;
        
        if (!content.includes("_")) {
            this.winning();
            window.removeEventListener('keydown', this.check);
        }   
    }
    playAgain() {
        window.location.reload(true);
    }
    start() {  
        this.drawQuote();
    }
    
}

const game = new Game(
    {
    wrongLetters: document.getElementById('wrong-letters'),
    figureParts: document.querySelectorAll('.figure-part'),
    word: document.getElementById('word'),
    catchword: document.getElementById('catchword'),
    repeatedWord: document.getElementById('reapeted-word'),
    playAgainBtn: document.getElementById('playAgain'),
    endGame: document.querySelector('.endGame')
    }
)

game.start();