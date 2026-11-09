
// Generate a random number between 1 and 100
let secretNumber = Math.floor(Math.random() * 100) + 1;

// Store the number of attempts
let attempts = 0;

// Store the best score
let bestScore = localStorage.getItem("bestScore") || null;

// Get HTML elements
const guessInput = document.getElementById("guessInput");
const guessBtn = document.getElementById("guessBtn");
const restartBtn = document.getElementById("restartBtn");
const message = document.getElementById("message");
const attemptsDisplay = document.getElementById("attempts");
const bestScoreDisplay = document.getElementById("bestScore");

// Display saved best score
bestScoreDisplay.textContent = bestScore || "--";

// Function to check the guess
function checkGuess() {

    const guess = Number(guessInput.value);

    // Check if input is valid
    if (guessInput.value === "" || !Number.isInteger(guess) || guess < 1 || guess > 100) {
        message.textContent = "Please enter a number between 1 and 100!";
        return;
    }

    // Increase attempts
    attempts++;

    attemptsDisplay.textContent = attempts;

    // Compare guess with secret number
    if (guess < secretNumber) {

        message.textContent = "Too low! Try a higher number ↑";

    } 
    
    else if (guess > secretNumber) {

        message.textContent = "Too high! Try a lower number ↓";

    } 
    
    else {

        message.textContent = "🎉 Congratulations! You guessed it!";

        // Update best score
        if (bestScore === null || attempts < Number(bestScore)) {

            bestScore = attempts;

            localStorage.setItem("bestScore", bestScore);

            bestScoreDisplay.textContent = bestScore;
        }

        guessBtn.disabled = true;
        guessInput.disabled = true;
    }

    guessInput.value = "";
    guessInput.focus();
}

// Function to restart the game
function restartGame() {

    secretNumber = Math.floor(Math.random() * 100) + 1;

    attempts = 0;

    attemptsDisplay.textContent = 0;

    message.textContent = "Your adventure starts here!";

    guessInput.value = "";

    guessInput.disabled = false;
    guessBtn.disabled = false;

    guessInput.focus();
}

// Button events
guessBtn.addEventListener("click", checkGuess);

restartBtn.addEventListener("click", restartGame);

// Allow Enter key to submit guess
guessInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {
        checkGuess();
    }

});
