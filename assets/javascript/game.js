$(document).ready(function () {
    var timerId;
    var isRunning;

    $('#trueButton').on("click", checkAnswer);
    $('#falseButton').on("click", checkAnswer);

    var game = {
        questionAndAnwers: [
            questionOne = {
                question: "The fastest land animal in the world is the zebra.",
                answer: false,
                number: 0,
                successImage: "./assets/images/cheetah.gif",
                failureImage: "./assets/images/wrong.gif",
            },
            questionTwo = {
                question: "Yogurt is produced by bacterial fermentation of milk",
                answer: true,
                number: 1,
                successImage: "./assets/images/yogurt.jpeg",
                failureImage: "./assets/images/wrong.gif",
            },
            questionThree = {
                question: "Your ears are important when it comes to staying balanced.",
                answer: true,
                number: 2,
                successImage: "./assets/images/balance.jpg",
                failureImage: "./assets/images/wrong.gif",
            },
            questionFour = {
                question: "Snakes have slimy skin.",
                answer: false,
                number: 3,
                successImage: "./assets/images/snek.jpg",
                failureImage: "./assets/images/wrong.gif",
            },
            questionFive = {
                question: "Mice live for up to 10 years.",
                answer: false,
                number: 4,
                successImage: "./assets/images/mouse.jpg",
                failureImage: "./assets/images/wrong.gif",
            },
            questionSix = {
                question: "Owls are far-sighted, meaning that anything within a few inches of their eyes can’t be seen properly.",
                answer: true,
                number: 5,
                successImage: "./assets/images/owl.jpg",
                failureImage: "./assets/images/wrong.gif",
            },
            questionSeven = {
                question: " An adult human body has over 500 bones.",
                answer: false,
                number: 6,
                successImage: "./assets/images/bones.gif",
                failureImage: "./assets/images/wrong.gif",
            },
            questionEight = {
                question: "Rabbits are born blind.",
                answer: true,
                number: 7,
                successImage: "./assets/images/bugs.jpg",
                failureImage: "./assets/images/wrong.gif",
            },
            questionNine = {
                question: "DNA is the shortened form of the term ‘Deoxyribonucleic acid’.",
                answer: true,
                number: 8,
                successImage: "./assets/images/dna.jpg",
                failureImage: "./assets/images/wrong.gif",
            },
            questionTen = {
                question: "Crocodiles have no sweat glands so they use their mouths to release heat.",
                answer: true,
                number: 9,
                successImage: "./assets/images/croc.jpg",
                failureImage: "./assets/images/wrong.gif",
            },
        ],
        questionsAsked: 0,
        score: 0,
        incorrectScore: 0,
        currentQuestion: "",
        countDownTotal: 31, //seconds
    }

    function startGame() {
        choseQuestion();
    }

    function choseQuestion() {
        updateDisplayForNewQuestion();
        if(game.currentQuestion === ""){
            game.currentQuestion = game.questionAndAnwers[0]; 
        }else if(game.questionsAsked === 10){
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
            game.countDownTotal = 31;
            displayFailure();
        }
        if(isRunning){
            $('#timer').text(game.countDownTotal);
        }

    }

    function resetGame() {
        game.countDownTotal = 31;
        game.currentQuestion = "";
        game.questionsAsked = 0;
        game.score = 0;
        $(".score").hide();
        startGame();
    }

    function checkAnswer() {
        if (String(game.currentQuestion.answer) == this.value) {
            console.log("correct");
            game.score++;
            displaySuccess();
        } else {
            console.log("incorrect");
            game.incorrectScore++;
            displayFailure();
        }
        game.countDownTotal = 31;
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
        $('#timer').text("");
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
        $("#question").hide();
        $('#scoreCount').text(game.score);
        $('#incorrectScoreCount').text(game.incorrectScore);
        $("#trueButton").hide();
        $("#falseButton").hide();
        $('.score').css("visibility","visible")
    }

    startGame();
});