export class Quote { 
    constructor(wordToGuess) {
        this.wordToGuess = wordToGuess;
        this.guessed = [];
        this.wrong = [];
    }
    drawContent() {
        let content = "";
        for (const char of this.wordToGuess) {
            if (char == " " || this.guessed.includes(char)) {
                content += char;
            } else {
                content += "_";
            }
        }
        return content;  
    }

    
    guess(letter) {
        if (this.wordToGuess.includes(letter)) {
            if (!this.guessed.includes(letter)) {
                this.guessed.push(letter);   
            } 
            return true;
        } 
        else {
            if (!this.wrong.includes(letter)) {
            this.wrong.push(letter); 
            return false;
            }
            return true;
        }  
    }
}