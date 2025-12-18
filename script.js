// 1. Navigation Logic
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(p => p.style.display = 'none');
    document.getElementById(pageId).style.display = 'block';
}

// 2. Budget Tool Logic
function calculateBudget() {
    const income = document.getElementById('calc-income').value;
    const expense = document.getElementById('calc-expense').value;
    const result = document.getElementById('calc-result');
    
    if (income && expense) {
        const remaining = income - expense;
        result.innerHTML = remaining >= 0 
            ? `<p style="color:green">Great! You have $${remaining} left to save.</p>` 
            : `<p style="color:red">Warning: You are overspending by $${Math.abs(remaining)}!</p>`;
    }
}

// 3. Quiz Logic
function checkQuiz(isCorrect) {
    const feedback = document.getElementById('quiz-feedback');
    feedback.innerText = isCorrect ? "Correct! Needs are essential for survival." : "Not quite. Remember, wants are optional luxuries.";
    feedback.style.color = isCorrect ? "green" : "red";
}

// 4. Game Logic: Life on Allowance
let cash = 20;
let savings = 0;
let week = 1;

function playTurn(choice) {
    if (week > 4) return;

    let eventMsg = "";
    // Random Event (25% chance)
    if (Math.random() > 0.75) {
        const events = [
            { text: "Unexpected birthday gift! +$10", amt: 10 },
            { text: "Lost your water bottle. Buy new one: -$5", amt: -5 }
        ];
        const evt = events[Math.floor(Math.random() * events.length)];
        cash += evt.amt;
        eventMsg = `<br><strong>Event:</strong> ${evt.text}`;
    }

    if (choice === 'save') {
        savings += 10;
        cash -= 10;
        document.getElementById('game-message').innerHTML = "Smart move! You put $10 into your savings account." + eventMsg;
    } else {
        cash -= 10;
        document.getElementById('game-message').innerHTML = "You bought a treat! It was fun, but your savings didn't grow." + eventMsg;
    }

    week++;
    if (week <= 4) {
        cash += 20; // Weekly allowance
        updateGameUI();
    } else {
        endGame();
    }
}

function updateGameUI() {
    document.getElementById('game-week').innerText = week;
    document.getElementById('game-savings').innerText = savings;
    document.getElementById('game-cash').innerText = cash;
}

function endGame() {
    const success = savings >= 40;
    document.getElementById('game-options').innerHTML = `<button onclick="location.reload()">Restart Game</button>`;
    document.getElementById('game-message').innerHTML = success 
        ? "<strong>You Won!</strong> You reached your goal. Lesson: Consistent saving beats impulse buying." 
        : "<strong>Game Over.</strong> You didn't save enough. Lesson: Small spends add up quickly!";
}
