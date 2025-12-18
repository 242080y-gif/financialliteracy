// Navigation & Modals
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

function openModal(id) { document.getElementById(id).style.display = "block"; }
function closeModal(id) { document.getElementById(id).style.display = "none"; }

// Advanced Budget Advisor (50/30/20 Rule)
function calculateAdvancedBudget() {
    const income = parseFloat(document.getElementById('calc-income').value);
    const result = document.getElementById('calc-result');
    
    if (isNaN(income) || income <= 0) {
        result.innerHTML = "Please enter a valid amount.";
        return;
    }

    const needs = (income * 0.5).toFixed(2);
    const wants = (income * 0.3).toFixed(2);
    const savings = (income * 0.2).toFixed(2);

    result.innerHTML = `
        <h3>Your Personalized Plan:</h3>
        <ul>
            <li><strong>Essentials (50%):</strong> $${needs} (Food, Transport, School)</li>
            <li><strong>Wants (30%):</strong> $${wants} (Movies, Snacks, Games)</li>
            <li><strong>Savings/Invest (20%):</strong> $${savings} (Future Wealth)</li>
        </ul>
        <p><em>Pro Tip: If you save that $${savings} every month with 7% interest, you'll be a millionaire in your 50s!</em></p>
    `;
}

// Enhanced Quiz
const quizData = [
    { q: "What is 'Compound Interest'?", a: ["Interest on the principal only", "Interest on principal plus accumulated interest", "A type of bank fee"], correct: 1 },
    { q: "What is an Asset?", a: ["Something that puts money IN your pocket", "Something that takes money OUT", "A debt you owe"], correct: 0 },
    { q: "What does 'Inflation' do to your money?", a: ["Increases its value", "Decreases its purchasing power", "Makes it stay the same"], correct: 1 },
    { q: "What is a 'Stock'?", a: ["A type of loan to the government", "Partial ownership in a company", "A guaranteed way to get rich"], correct: 1 }
];

let currentQ = 0;
let score = 0;

function loadQuiz() {
    const q = quizData[currentQ];
    document.getElementById('quiz-question').innerText = q.q;
    const optionsDiv = document.getElementById('quiz-options');
    optionsDiv.innerHTML = "";
    q.a.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(i);
        optionsDiv.appendChild(btn);
    });
}

function checkAnswer(idx) {
    if (idx === quizData[currentQ].correct) {
        score++;
        document.getElementById('quiz-feedback').innerText = "Correct! 🎉";
    } else {
        document.getElementById('quiz-feedback').innerText = "Wrong! Keep learning! 📚";
    }
    currentQ++;
    if (currentQ < quizData[currentQ - 1] ? quizData.length : 0) { // Safety check
        setTimeout(() => {
            document.getElementById('quiz-feedback').innerText = "";
            if (currentQ < quizData.length) loadQuiz();
            else document.getElementById('quiz-container').innerHTML = `<h3>Quiz Over! Your score: ${score}/${quizData.length}</h3>`;
        }, 1500);
    }
    document.getElementById('quiz-score-display').innerText = `Score: ${score}`;
}

// Initialize
window.onload = () => {
    loadQuiz();
};
