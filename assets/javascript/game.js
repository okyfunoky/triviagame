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
                number: 0,
                successImage: "./assets/images/captainmarvel.jpg",
                failureImage: "./assets/images/doctorstrange.jpg",
            },
            questionTwo = {
                question: "What is the average air speed of a swallow?",
                answer: true,
                number: 1,
                successImage: "./assets/images/captainmarvel.jpg",
                failureImage: "./assets/images/doctorstrange.jpg",
            },
            questionThree = {
                question: "An african swallow or a european swallow?",
                answer: true,
                number: 2,
                successImage: "./assets/images/captainmarvel.jpg",
                failureImage: "./assets/images/doctorstrange.jpg",
            },
            questionFour = {
                question: "I don't know. Wait, what, nooooo?",
                answer: true,
                number: 3,
                successImage: "./assets/images/captainmarvel.jpg",
                failureImage: "./assets/images/doctorstrange.jpg",
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
        updateDisplayForNewQuestion();
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
        $("#score").hide();
        startGame();
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

    function updateDisplayForNewQuestion(){
        $("#resultImage").css("display","none");
        $("#trueButton").show();
        $("#falseButton").show();
        $("#question").show();
    }

    function updateDisplayOnAnswer(){
        if (isRunning) {
            clearInterval(timerId);
            isRunning = false;
        }
        $("#trueButton").hide();
        $("#falseButton").hide();
        $("#question").hide();
        setTimeout(choseQuestion, 3000);
    }

    function displaySuccess() {
        updateDisplayOnAnswer();
        //actually display success
        $("#resultImage").attr("src",game.currentQuestion.successImage);
        $("#resultImage").css("display","inherit");
    }

    function displayFailure() {
        updateDisplayOnAnswer();
        //actually display failure
        $("#resultImage").attr("src",game.currentQuestion.failureImage);
        $("#resultImage").css("display","inherit");
    }

    function displayScore() {
        console.log("display score: isRunning: " + isRunning);
        if(isRunning){
            clearInterval(timerId);
            isRunning = false;
        }
        setTimeout(resetGame, 10000);
        $('#scoreCount').text(game.score);
        $('#score').css("visibility","visible")
    }

    startGame();
});