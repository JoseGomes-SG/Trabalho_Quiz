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
let acceptingAnswers = true;
let currentQuestion = {}
let questionCounter = 0;
let avaliableQuestions = [];

const MAX_QUESTIONS = 10;

// Iniciar Quiz 
var startGame = (questions) => {
    questionCounter = 0;
    avaliableQuestions = [...questions];
    getNewQuestion();
}

// Atualiza questões 
var getNewQuestion = () => {
    if (questionCounter == MAX_QUESTIONS) {
        quizResults.innerHTML += "<a href='index.html' class='btn btn-primary btn-lg float-end rounded-pill'>Voltar Ao Início</a>";
        return showReview();
    }

    questionCounter++;
    progressText.innerHTML = "Questão " + questionCounter + " de " + MAX_QUESTIONS;

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
        }, 500);
    });
})

var updateResults = function(selectedChoice,isCorrect) {
    quizResults.innerHTML += "<h2 class='question' style='font-weight:bold;'>Questão " + questionCounter +" </h2>";
    quizResults.innerHTML += "<hr>";
    quizResults.innerHTML += "<p class='question '>" + currentQuestion.enunciado +" </p>";
    if (isCorrect == "incorrect"){
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