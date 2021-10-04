window.sessionStorage.setItem("quizCode","2018/questao");
const quizCode = window.sessionStorage.getItem("quizCode");

// Faz um Array de opçoes 
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");

// Array onde as questões serão armazenadas 
const questions = [];
let acceptingAnswers = true;
let currentQuestion = {}
let questionCounter = 0;
let avaliableQuestions = [];
var score;

// Recebe as questões do banco de dados 
const Http = new XMLHttpRequest();
const url = "https://form-f5d6e-default-rtdb.firebaseio.com/provas/" + quizCode + ".json";
Http.open("GET", url);
Http.send();

// Pontuações 
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 6;

// Iniciar Quiz 
var startGame = () => {
    questionCounter = 0;
    score = 0;
    avaliableQuestions = [...questions];
    getNewQuestion();
}

// Atualiza questões 
var getNewQuestion = () => {
    if (avaliableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        console.log("A sua pontuação foi de " + score + " pontos");
        return;
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

        if (classToApply === "correct") {
            incrementScore(SCORE_POINTS);
        }

        // Muda a cor das alternativas 
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000);
    });
})

// Aumenta a pontuação 
var incrementScore = num => {
    score += num;
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
        return startGame();
    }
}