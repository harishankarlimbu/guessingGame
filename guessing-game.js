function generateWinningNumber() {
  return Math.ceil(Math.random() * 100);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class Game {
  constructor() {
    this.playersGuess = null;
    this.pastGuesses = [];
    this.winningNumber = generateWinningNumber();
  }
  difference() {
    return Math.abs(this.playersGuess - this.winningNumber);
  }

  isLower() {
    return this.playersGuess < this.winningNumber;
  }

  playersGuessSubmission() {
    const inputValue = document.getElementById("guess-input").value;
    const num = Number(inputValue);

    if (isNaN(num) || num < 1 || num > 100) {
      document.getElementById("result").textContent =
        "Result: That is an invalid guess.";
      return;
    }

    this.playersGuess = num;
    const result = this.checkGuess();
    document.getElementById("result").textContent = `Result: ${result}`;
    document.getElementById("guesses-left").textContent =
      5 - this.pastGuesses.length;
  }

  checkGuess() {
    if (this.playersGuess === this.winningNumber) return "You Win!";
    if (this.pastGuesses.includes(this.playersGuess))
      return "You have already guessed that number.";

    this.pastGuesses.push(this.playersGuess);

    if (this.pastGuesses.length === 5) return "You Lose.";

    let diff = this.difference();
    if (diff < 10) return "You're burning up!";
    if (diff < 25) return "You're lukewarm.";
    if (diff < 50) return "You're a bit chilly.";
    return "You're ice cold!";
  }

  provideHint() {
    const hints = [
      this.winningNumber,
      generateWinningNumber(),
      generateWinningNumber(),
    ];
    return shuffle(hints);
  }
}

const game = new Game();

function submitGuess() {
  return game.playersGuessSubmission();
}

function showHint() {
  if (game.pastGuesses.length === 4) {
    const hintArray = game.provideHint();
    document.getElementById("result").textContent = `Hint: ${hintArray.join(", ")}`;
  } else {
    document.getElementById("result").textContent = "Hint is only available on your last attempt.";
  }
}

