let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const guess = Number(document.querySelector("#guessInput").value);
    const message = document.querySelector("#message");
    const attemptsDisplay = document.querySelector("#attempts");

    if (!guess || guess < 1 || guess > 100) {
        message.textContent = "Enter a valid number between 1 and 100!";
        message.style.color = "red";
        return;
    }

    attempts++;

    if (guess === randomNumber) {
        message.textContent = "🎉 Correct! You guessed it!";
        message.style.color = "green";
    } else if (guess < randomNumber) {
        message.textContent = "Too low! Try again.";
        message.style.color = "orange";
    } else {
        message.textContent = "Too high! Try again.";
        message.style.color = "orange";
    }

    attemptsDisplay.textContent = "Attempts: " + attempts;
}

function restartGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    document.getElementById("message").textContent = "";
    document.getElementById("attempts").textContent = "";
    document.getElementById("guessInput").value = "";
}