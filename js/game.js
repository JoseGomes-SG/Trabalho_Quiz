// Variáveis referentes ao quiz 
const quizResults = document.querySelector("#quiz-results");
const quizArea = document.querySelector("#quiz-game");

// Relacionando as variáveis do formulário 
const choices = Array.from(document.querySelectorAll(".choice-text"));
const question = document.querySelector(".question");
const progressText = document.querySelector("#progressText");

// Esconde a tela de revisão
quizResults.style.display = "none";

// Variáveis referentes a lógica do quiz 
const questions = [];
let acceptingAnswers = true;
let currentQuestion = {}
let questionCounter = 0;
let avaliableQuestions = [];

// Coleta as questões do banco 
const Http = new XMLHttpRequest();
const url = "https://form-f5d6e-default-rtdb.firebaseio.com/provas/2018/questao.json";
Http.open("GET", url);
Http.send();

// Iniciar Quiz 
var startGame = () => {
    questionCounter = 0;
    avaliableQuestions = [...questions];
    getNewQuestion();
}

// Atualiza questões 
var getNewQuestion = () => {
    if (avaliableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        return showReview();
    }

    questionCounter++;
    progressText.innerHTML = "Questão " + questionCounter;

    const questionsIndex = Math.floor(Math.random() * avaliableQuestions.length);
    currentQuestion = avaliableQuestions[questionsIndex];
    question.innerHTML = currentQuestion.enunciado;

    choices.forEach(choice => {
        const option = choice.dataset["option"];
        choice.innerText = currentQuestion["option" + option];
    });

    avaliableQuestions.splice(questionsIndex, 1);
    acceptingAnswers = true;
}

// Adiciona um evento nas opções 
choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["option"];

        let classToApply = selectedAnswer == currentQuestion.resposta ? "correct" : "incorrect";

        // Muda a cor das alternativas 
        selectedChoice.parentElement.classList.add(classToApply);

        // Coloca na review 
        updateResults(selectedAnswer,classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
})

var updateResults = function(selectedChoice,isCorrect) {
    quizResults.innerHTML += "<h2 class='question' style='font-weight:bold;'>Questão " + questionCounter +" </h2>";
    quizResults.innerHTML += "<hr>";
    quizResults.innerHTML += "<p class='question '>" + currentQuestion.enunciado +" </p>";
    if (isCorrect === "incorrect"){
        quizResults.innerHTML += "<p class='choice-text incorrect'>" 
        + currentQuestion["option" + selectedChoice] + "</p>";
    }
    quizResults.innerHTML += "<p class='choice-text correct'>" 
    + currentQuestion["option" + currentQuestion.resposta] + "</p>";
    quizResults.innerHTML += "<br>";
}

// Mostra os resultados do teste 
var showReview = function(){
    quizArea.style.display = "none";
    quizResults.style.display = "block";
}

// Relaciona as questões as variáveis 
Http.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        let archieve = JSON.parse(Http.responseText);
        Object.keys(archieve).forEach(function (key) {
            let values = archieve[key];
            questions.push({
                enunciado: values.enunciado,
                optionA: values.alternativas["A"],
                optionB: values.alternativas["B"],
                optionC: values.alternativas["C"],
                optionD: values.alternativas["D"],
                optionE: values.alternativas["E"],
                resposta: values.resposta
            });
        });
        MAX_QUESTIONS = questions.length;
        return startGame();
    }
}