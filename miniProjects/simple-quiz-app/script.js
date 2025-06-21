// Data and variables
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        answer: 2
    },
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },
    {
        question: "What is 2 + 3?",
        options: ["3", "4", "5", "6"],
        answer: 2
    },{
        question: "What is 2 * 2 ?",
        options: ["3", "4", "5", "6"],
        answer: 1
    },{
        question: "What is 2 * 3?",
        options: ["3", "4", "5", "6"],
        answer: 3
    },{
        question: "What is 13 - 8?",
        options: ["3", "4", "5", "6"],
        answer: 2
    },{
        question: "What is 21 / 3?",
        options: ["3", "4", "5", "6"],
        answer: 0
    },{
        question: "What is 20 % 3?",
        options: ["3", "4", "2", "6"],
        answer: 2
    },{
        question: "What is 23 + 2?",
        options: ["31", "42", "25", "63"],
        answer: 2
    },{
        question: "What is the largest planet in our solar system?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        answer: 2
    }
];

let currentQuestionIndex = 0;
let score = 0;

// DOM elements
const quizContainer = document.getElementById('quiz');
const startButton = document.getElementById('startQuiz');
const restartButton = document.getElementById('restartQuiz');
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const finalScoreSpan = document.getElementById('finalScoreValue');
const resultMessage = document.getElementById('resultMessage');
const scoreDisplay = document.getElementById('score');

function renderQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    quizContainer.innerHTML = `
        <h1>Quiz App</h1>
        <h2>Question ${currentQuestionIndex + 1} of ${questions.length}</h2>
        <h2 id="score">Current Score: ${score}</h2>
        <h2>${currentQuestion.question}</h2>
        <ul>
            ${currentQuestion.options.map((option, index) => `
                <li>
                    <input type="radio" name="option" value="${index}" id="option${index}">
                    <label for="option${index}">${option}</label>
                </li>
            `).join('')}
        </ul>
        <button id="next-button" disabled>Next Question</button>
    `;

    // Attach event listener after rendering new question options
    document.querySelectorAll('input[name="option"]').forEach(input => {
        input.addEventListener('change', checkAnswer);
    });

    const nextBtn = document.getElementById('next-button');
    nextBtn.disabled = true; // Disable until an option is selected
    nextBtn.onclick = nextQuestion; // Set the function to go next
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('first-page').style.display = 'none';
    quizPage.style.display = 'block';
    resultPage.style.display = 'none';
    renderQuestion();
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    const nextBtn = document.getElementById('next-button');

    if (selectedOption) {
        const answerIndex = parseInt(selectedOption.value);
        const currentQuestion = questions[currentQuestionIndex];

        if (answerIndex === currentQuestion.answer) {
            score++;
        }

        // Enable the next button
        nextBtn.disabled = false;
    }
    updateScoreDisplay();
}

function updateScoreDisplay() {
    // Optionally, you can keep a real-time score display
    // in this example, we update the current score in renderQuestion
    // so this function can be expanded if needed.
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        renderQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById('quiz-page').style.display = 'none';
    resultPage.style.display = 'block';

    // Show message based on score
    if (score > 8) {
        resultMessage.innerText = `Congratulations 🎉! You passed with a score of ${score}/${questions.length}.`;
    } else {
        resultMessage.innerText = `Sorry 😢! You scored ${score}/${questions.length}. Try again!`;
    }
    finalScoreSpan.innerText = score;
    restartButton.style.display ='block'
}

// Restart the quiz
restartButton.onclick = startQuiz;

// Start quiz on button click
startButton.onclick = startQuiz;

// Load the first question initially if needed
// startQuiz(); // Uncomment if you want to start on load