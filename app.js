/*
GAME FUNCTION:
- Player must guess a number between a min and max (1-10)
- Player gets a certain amount of guesses.
- Notify the player of guesses remaining.
- Notify the player of the correct answer if loose.
- Let player choose to play again.
*/

// Game Values
let min = 1,
  max = 20,
  winningNum = getRandomNum(min, max),
  guessesLeft = 3;

// UI & Global Variables
const game = document.getElementById("game");
const minNum = document.querySelector(".min-num");
const maxNum = document.querySelector(".max-num");
const guessBtn = document.querySelector("#guess-btn");
const guessInput = document.querySelector("#guess-input");
const message = document.querySelector(".message");

minNum.textContent = min;
maxNum.textContent = max;

// Listen to guess Input
guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);

  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number from ${min} to ${max}.`, "red");
  } else {
    // Check if Won
    if (guess === winningNum) {
      //Game over WON
      gameOver(true, `${winningNum} is correct, you WIN!`);
    } else {
      //Wrong Number
      guessesLeft -= 1;
      if (guessesLeft === 0) {
        //Game over - Lost
        gameOver(
          false,
          `Game Over, you lost. The correct number was ${winningNum}`
        );
      } else {
        //Game continous - answer wrong
        guessInput.style.borderColor = "red";
        guessInput.value = "";
        setMessage(
          `${guess} is not correct, ${guessesLeft} guesses left`,
          "red"
        );
      }
    }
  }
});

// Get Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Set the Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// Game Over Function
function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");

  guessInput.disabled = true;
  guessInput.style.borderColor = color;
  message.style.color = color;
  setMessage(msg);

  //Play Again
  guessBtn.textContent = "Play Again";
  guessBtn.classList.add("play-again");

  //Play Again Event Listener
  document.querySelector(".play-again").addEventListener("click", () => {
    window.location.reload();
  });
}
