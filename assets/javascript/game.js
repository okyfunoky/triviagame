$(document).ready(function () {
    var timerId;
    var isRunning;

    window.onload = function () {
        $('#trueButton').on("click", checkAnswer);
        $('#falseButton').on("click", checkAnswer);
    };

    var questionAndAnwer = {
        question: "How much wood could a wood chuck chuck, if a wood chuck could chuck wood?",
        answer: true,
        number: 0,
    }

    var game = {
        questionAndAnwers: {
            questionOne: {
                question: "How much wood could a wood chuck chuck, if a wood chuck could chuck wood?",
                answer: true,
                number: 0
            },
        },
        questionsAsked: [],
        score: 0,
        currentQuestion: ""
    }

    function startGame() {
        choseQuestion();
    }


    function choseQuestion() {
        game.currentQuestion = game.questionAndAnwers.questionOne;
        $('#question').text(game.currentQuestion.question);
        game.questionsAsked.push(game.currentQuestion.number);
        console.log("current question number" + game.questionsAsked[0])
        if (!isRunning) {
            isRunning = true;
            console.log("got here");
            timerId = setTimeout(displayFailure, 3000);
        }
    }

    function resetGame() {

    }

    function displayTimeRemaining() {

    }

    function checkAnswer() {
        if (String(game.currentQuestion.answer) == this.value) {
            console.log("correct");
            score++;
            displaySuccess();
        } else {
            console.log("incorrect");
            displayFailure();
        }
    }

    function displaySuccess() {
        //actually display success
        setTimeout(choseQuestion, 3000);
    }

    function displayFailure() {
        if (isRunning) {
            clearTimeout(timerId);
            isRunning = false;
        }
        $('#question').text("Failure");
        //actually display failure
        setTimeout(choseQuestion, 3000);

    }

    function displayScore() {

    }

    startGame();
});