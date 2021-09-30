// Controle dos formulários 
const start = document.getElementById("quiz-start");
const game = document.getElementById("quiz-game");
const ending = document.getElementById("quiz-ending");

const highscore = document.getElementById("quiz-value");

const startQuiz = document.getElementById("startQuiz");
const restartQuiz = document.getElementById("restartQuiz");

// Visibilidade 
start.style.display = "block";
game.style.display = "none";
ending.style.display ="none";

// Mostra a tela do quiz 
startQuiz.onclick = function startQuizForm() {
    game.style.display = "block";
    start.style.display = "none";
}

restartQuizForm = function () {
    game.style.display = "none";
    ending.style.display = "block";
}

restartQuiz.onclick = function (){
    window.location.reload();
}

// Associa o formulário do quiz 
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");

// Variáveis do quiz 
let currentQuestion = {}
let acceptingAnswers = true 
let questionCounter = 0
let avaliableQuestions = [] 
score = 0 

// Questões (depois irei colocar o banco)
let questions = [
    {
        question: "Qual desses NÃO é um mamífero?",
        choice1: "Gerbil",
        choice2: "Baleia",
        choice3: "Capivara",
        choice4: "Nenhuma das alternativas acima",
        answer: 4,
    },
    {
        question: "Em qual cidade se localiza o maior prédio?",
        choice1: "Dubai",
        choice2: "New York",
        choice3: "Shangai",
        choice4: "Moscou",
        answer: 1,
    },
    {
        question: "Qual é o maior país?",
        choice1: "Australia",
        choice2: "Russia",
        choice3: "China",
        choice4: "Coreia do Norte",
        answer: 2,
    }
]

// Pontuações 
const SCORE_POINTS = 100;
const MAX_QUESTIONS = 3;

// Iniciar Quiz 
startGame = () => {
    questionCounter = 0;
    score = 0;
    avaliableQuestions = [...questions];
    getNewQuestion();
}

// Atualiza questões 
getNewQuestion = () => {
    if (avaliableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
        highscore.innerHTML = "A sua pontuação foi de " + score + " pontos";
        restartQuizForm();
        return;
    }

    questionCounter++;
    progressText.innerHTML = "Questão " + questionCounter + " de " + MAX_QUESTIONS;

    const questionsIndex = Math.floor(Math.random() * avaliableQuestions.length);
    currentQuestion = avaliableQuestions[questionsIndex];
    question.innerHTML = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    avaliableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

// Adiciona um evento nas opções 
choices.forEach(choice => {
    choice.addEventListener("click", e=> {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        let classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        if (classToApply === "correct"){
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);
    });
})

// Aumenta a pontuação 
incrementScore = num => {
    score += num;
}

// Inicia o quiz 
startGame();