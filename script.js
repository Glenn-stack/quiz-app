const quizData = [
    {
        question: "What is the name of the oldest lake in the world?",
        options: ["Lake Baikal", "Caspian Sea", "Lake Tanganyika", "Lake Superior"],
        answer: "Lake Baikal"
    },
    {
        question: "Which scientist is known for the theory of evolution?",
        options: ["Isaac Newton", "Albert Einstein", "Charles Darwin", "Galileo Galilei"],
        answer: "Charles Darwin"
    },
    {
        question: "What is the capital city of Australia?",
        options: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
        answer: "Canberra"
    },
    {
        question: "Which ancient civilization built the pyramids?",
        options: ["Romans", "Greeks", "Egyptians", "Mayans"],
        answer: "Egyptians"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Diamond", "Gold", "Iron", "Quartz"],
        answer: "Diamond"
    }
];

let currentQuestionIndex = 0;
let score = 0;

const quizContainer = document.getElementById('quiz');
const nextButton = document.getElementById('nextButton');
const scoreContainer = document.getElementById('scoreContainer');
const scoreDisplay = document.getElementById('score');
const retryButton = document.getElementById('retryButton');

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    quizContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        ${currentQuestion.options.map((option, index) => `
            <div class="option" data-index="${index}">${option}</div>
        `).join('')}
    `;
    document.querySelectorAll('.option').forEach(option => {
        option.addEventListener('click', selectOption);
    });
}

function selectOption(e) {
    const selectedOption = e.target;
    const currentQuestion = quizData[currentQuestionIndex];

    if (selectedOption.innerText === currentQuestion.answer) {
        selectedOption.classList.add('correct');
        score++;
    } else {
        selectedOption.classList.add('wrong');
        document.querySelectorAll('.option').forEach(option => {
            if (option.innerText === currentQuestion.answer) {
                option.classList.add('correct');
            }
        });
    }

    document.querySelectorAll('.option').forEach(option => {
        option.classList.add('disabled');
    });

    nextButton.classList.remove('hidden');
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        nextButton.classList.add('hidden');
    } else {
        showScore();
    }
});

function showScore() {
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreDisplay.innerText = `${score} out of ${quizData.length}`;
    if (score === quizData.length) {
        scoreContainer.innerHTML += "<h3>Congratulations! You got all questions right!</h3>";
    } else {
        scoreContainer.innerHTML += "<h3>Good try! Better luck next time!</h3>";
    }
}

retryButton.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    loadQuestion();
});

loadQuestion();