// Banco de Dados de Perguntas
const questionsDB = {
    geral: [
        {
            question: "Qual é o primeiro livro da Bíblia?",
            answers: [
                { text: "Êxodo", correct: false },
                { text: "Gênesis", correct: true },
                { text: "Mateus", correct: false },
                { text: "Apocalipse", correct: false }
            ]
        },
        {
            question: "Quem construiu a arca para sobreviver ao dilúvio?",
            answers: [
                { text: "Moisés", correct: false },
                { text: "Abraão", correct: false },
                { text: "Noé", correct: true },
                { text: "Davi", correct: false }
            ]
        },
        {
            question: "Quantos mandamentos Deus deu a Moisés?",
            answers: [
                { text: "10", correct: true },
                { text: "12", correct: false },
                { text: "7", correct: false },
                { text: "5", correct: false }
            ]
        }
    ],
    antigo: [
        {
            question: "Qual profeta foi engolido por um grande peixe?",
            answers: [
                { text: "Isaías", correct: false },
                { text: "Jonas", correct: true },
                { text: "Elias", correct: false },
                { text: "Jeremias", correct: false }
            ]
        },
        {
            question: "Quem derrotou o gigante Golias?",
            answers: [
                { text: "Saul", correct: false },
                { text: "Salomão", correct: false },
                { text: "Davi", correct: true },
                { text: "Sansão", correct: false }
            ]
        }
    ],
    novo: [
        {
            question: "Onde Jesus nasceu?",
            answers: [
                { text: "Nazareth", correct: false },
                { text: "Jerusalém", correct: false },
                { text: "Belém", correct: true },
                { text: "Galileia", correct: false }
            ]
        },
        {
            question: "Qual discípulo traiu Jesus?",
            answers: [
                { text: "Pedro", correct: false },
                { text: "Judas Iscariotes", correct: true },
                { text: "João", correct: false },
                { text: "Tomé", correct: false }
            ]
        }
    ],
    personagens: [
        {
            question: "Quem foi a mãe de Samuel?",
            answers: [
                { text: "Sara", correct: false },
                { text: "Ana", correct: true },
                { text: "Rebeca", correct: false },
                { text: "Raquel", correct: false }
            ]
        },
        {
            question: "Quem teve o sonho da escada que chegava ao céu?",
            answers: [
                { text: "José", correct: false },
                { text: "Jacó", correct: true },
                { text: "Isaque", correct: false },
                { text: "Esaú", correct: false }
            ]
        }
    ]
};

// Variáveis de Estado
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;

// Elementos do DOM
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const categorySelect = document.getElementById('category');

const questionText = document.getElementById('question-text');
const answerButtonsElement = document.getElementById('answer-buttons');
const questionCountSpan = document.getElementById('question-count');
const scoreSpan = document.getElementById('score-display');
const finalScoreSpan = document.getElementById('final-score');
const totalQuestionsSpan = document.getElementById('total-questions');
const resultMessage = document.getElementById('result-message');

// Event Listeners
startBtn.addEventListener('click', startGame);
nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    setNextQuestion();
});
restartBtn.addEventListener('click', () => {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
});

// Funções Principais
function startGame() {
    const category = categorySelect.value;
    
    // Se for 'geral', misturamos todas as perguntas, senão pegamos da categoria
    if (category === 'geral') {
        currentQuestions = [
            ...questionsDB.antigo,
            ...questionsDB.novo,
            ...questionsDB.personagens
        ];
        // Embaralhar perguntas
        currentQuestions.sort(() => Math.random() - 0.5);
    } else {
        currentQuestions = [...questionsDB[category]];
    }

    currentQuestionIndex = 0;
    score = 0;
    
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    if (currentQuestionIndex < currentQuestions.length) {
        showQuestion(currentQuestions[currentQuestionIndex]);
        questionCountSpan.innerText = `Questão ${currentQuestionIndex + 1} de ${currentQuestions.length}`;
        scoreSpan.innerText = `Pontos: ${score}`;
    } else {
        showResults();
    }
}

function showQuestion(question) {
    questionText.innerText = question.question;
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
    });
}

function resetState() {
    nextBtn.style.display = 'none';
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    
    if (isCorrect) {
        selectedBtn.classList.add('correct');
        score++;
        scoreSpan.innerText = `Pontos: ${score}`;
    } else {
        selectedBtn.classList.add('wrong');
    }

    // Mostrar a resposta correta e desabilitar todos
    Array.from(answerButtonsElement.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add('correct');
        }
        button.disabled = true;
    });

    nextBtn.style.display = 'block';
}

function showResults() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    finalScoreSpan.innerText = score;
    totalQuestionsSpan.innerText = currentQuestions.length;
    
    const percentage = (score / currentQuestions.length) * 100;
    
    if (percentage === 100) {
        resultMessage.innerText = "Perfeito! Você é um mestre da Bíblia! 🌟";
    } else if (percentage >= 70) {
        resultMessage.innerText = "Muito bom! Continue estudando a Palavra. 📖";
    } else if (percentage >= 40) {
        resultMessage.innerText = "Bom esforço! Que tal revisar alguns capítulos? 🤔";
    } else {
        resultMessage.innerText = "Não desanime! A Bíblia é um livro fascinante para aprender. 💪";
    }
}