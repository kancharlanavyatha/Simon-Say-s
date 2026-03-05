// Game variables
let buttonColors = ["red", "green", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let score = 0;


// Start game
document.addEventListener("keypress", function () {

    if (!started) {
        level = 0;
        score = 0;
        gamePattern = [];
        document.getElementById("score").textContent = "";
        nextSequence();
        started = true;
    }

});


// Generate next sequence
function nextSequence() {

    userClickedPattern = [];
    level++;
    score = level - 1;

    document.getElementById("status").textContent = "Level " + level;

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    animatePress(randomChosenColor);
}


// Button clicks
let buttons = document.querySelectorAll(".btn");

buttons.forEach(function (button) {

    button.addEventListener("click", function () {

        let userChosenColor = this.classList[1];

        userClickedPattern.push(userChosenColor);

        animatePress(userChosenColor);

        checkAnswer(userClickedPattern.length - 1);

    });

});


// Check answer
function checkAnswer(currentIndex) {

    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {

        if (userClickedPattern.length === gamePattern.length) {

            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    } else {

        document.getElementById("status").textContent =
            "Game Over! Press any key to restart";

        document.getElementById("score").textContent =
            "Your Score: " + score;

        startOver();
    }

}


// Animation
function animatePress(color) {

    let activeButton = document.querySelector("." + color);

    activeButton.classList.add("pressed");

    setTimeout(function () {
        activeButton.classList.remove("pressed");
    }, 200);

}


// Restart
function startOver() {

    level = 0;
    gamePattern = [];
    started = false;

}