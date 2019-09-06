$(document).ready(function () {
    var timerId;
    var isRunning;

    $('#trueButton').on("click", checkAnswer);
    $('#falseButton').on("click", checkAnswer);

    var game = {
        questionAndAnwers: [
            questionOne = {
                question: "How much wood could a wood chuck chuck, if a wood chuck could chuck wood?",
                answer: true,
                number: 0
            },
            questionTwo = {
                question: "What is the average air speed of a swallow?",
                answer: true,
                number: 1
            },
            questionThree = {
                question: "An african swallow or a european swallow?",
                answer: true,
                number: 2
            },
            questionFour = {
                question: "I don't know. Wait, what, nooooo?",
                answer: true,
                number: 3
            },
        ],
        questionsAsked: 0,
        score: 0,
        currentQuestion: "",
        countDownTotal: 30, //seconds
    }

    function startGame() {
        choseQuestion();
    }


    function choseQuestion() {
        if(game.currentQuestion === ""){
            game.currentQuestion = game.questionAndAnwers[0]; 
        }else if(game.questionsAsked === 4){
            console.log("here!")
            displayScore();
            return;
        }
        else{
            game.currentQuestion = game.questionAndAnwers[game.currentQuestion.number+1]
        }

        $('#question').text(game.currentQuestion.question);
        game.questionsAsked++;

        if (!isRunning) {
            isRunning = true;
            timerId = setInterval(countDown, 1000);
        }
    }

    function countDown(){
        game.countDownTotal--;
        if(game.countDownTotal === 0){
            clearInterval(timerId);
            isRunning = false;
            game.countDownTotal = 30;
            displayFailure();
        }
        if(isRunning){
            $('#timer').text(game.countDownTotal);
        }

    }

    function resetGame() {
        game.countDownTotal = 30;
        game.currentQuestion = "";
        game.questionsAsked = 0;
        game.score = 0;
        startGame();
    }

    function displayTimeRemaining() {

    }

    function checkAnswer() {
        if (String(game.currentQuestion.answer) == this.value) {
            console.log("correct");
            game.score++;
            displaySuccess();
        } else {
            console.log("incorrect");
            displayFailure();
        }
    }

    function displaySuccess() {
        if (isRunning) {
            clearInterval(timerId);
            isRunning = false;
            console.log("Success timer");
        }
        //actually display success
        $('#question').text("Success");
        setTimeout(choseQuestion, 3000);
    }

    function displayFailure() {
        if (isRunning) {
            clearInterval(timerId);
            isRunning = false;
            console.log("Failure timer");
        }   
        //actually display failure
        $('#question').text("Failure");
        setTimeout(choseQuestion, 3000);
    }

    function displayScore() {
        console.log("display score: isRunning: " + isRunning);
        if(isRunning){
            clearInterval(timerId);
            isRunning = false;
        }
        setTimeout(resetGame, 10000);
        $('#score').text(game.score);
    }

    startGame();
});