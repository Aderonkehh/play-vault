
const cardImages = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];
const difficultySettings = {
    easy: { pairs: 4, timeLimit: 60 },
    medium: { pairs: 6, timeLimit: 90 },
    hard: { pairs: 8, timeLimit: 120 }
};

let cards = [];
let flippedCards = [];
let moves = 0;
let gameOver = false;
let score = 0;
let timeLeft = 0;
let gameStarted = false;
let difficulty = 'easy';
let timerInterval;

const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const gameOverScreen = document.getElementById('game-over-screen');
const cardGrid = document.getElementById('card-grid');
const movesDisplay = document.getElementById('moves');
const timeLeftDisplay = document.getElementById('time-left');
const scoreDisplay = document.getElementById('score');
const startGameButton = document.getElementById('start-game-button');
const playAgainButton = document.getElementById('play-again-button');
const difficultyButtons = document.querySelectorAll('.difficulty-button');
const gameOverTitle = document.getElementById('game-over-title');
const gameOverMessage = document.getElementById('game-over-message');
const finalScoreDisplay = document.getElementById('final-score');
const goBackButtonGame = document.getElementById('go-back-button-game');
const goBackButtonOver = document.getElementById('go-back-button-over');

function initializeGame() {
    const { pairs, timeLimit } = difficultySettings[difficulty];
    const selectedImages = cardImages.slice(0, pairs);
    const cardPairs = [...selectedImages, ...selectedImages].map((image, index) => ({
        id: index,
        image,
        flipped: false,
        matched: false
    }));
    cards = cardPairs.sort(() => Math.random() - 0.5);
    flippedCards = [];
    moves = 0;
    score = 0;
    gameOver = false;
    timeLeft = timeLimit;
    gameStarted = true;

    movesDisplay.textContent = moves;
    timeLeftDisplay.textContent = timeLeft + 's';
    scoreDisplay.textContent = score;
    cardGrid.innerHTML = '';
    gameOverScreen.style.display = 'none';
    gameScreen.style.display = 'block';

    cards.forEach(card => {
        const cardContainer = document.createElement('div');
        cardContainer.classList.add('card-container');
        cardContainer.dataset.id = card.id;

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');
        cardFront.textContent = '?';

        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        cardBack.textContent = card.image;

        cardElement.appendChild(cardFront);
        cardElement.appendChild(cardBack);
        cardContainer.appendChild(cardElement);
        cardGrid.appendChild(cardContainer);

        cardContainer.addEventListener('click', () => handleCardClick(card.id, cardContainer));
    });

    clearInterval(timerInterval);
    timerInterval = setInterval(updateTimer, 1000);
}

function handleCardClick(id, cardContainer) {
    if (gameOver || flippedCards.length === 2 || flippedCards.includes(id)) return;
    const card = cards.find(c => c.id === id);
    if (card.matched) return;

    card.flipped = true;
    cardContainer.querySelector('.card').classList.add('flipped');
    flippedCards.push(id);

    if (flippedCards.length === 2) {
        moves++;
        movesDisplay.textContent = moves;

        const [id1, id2] = flippedCards;
        const card1 = cards.find(c => c.id === id1);
        const card2 = cards.find(c => c.id === id2);

        if (card1.image === card2.image) {
            card1.matched = true;
            card2.matched = true;
            flippedCards = [];

            if (cards.every(c => c.matched)) {
                endGame(true);
            }
        } else {
            setTimeout(() => {
                document.querySelector(`.card-container[data-id="${id1}"] .card`).classList.remove('flipped');
                document.querySelector(`.card-container[data-id="${id2}"] .card`).classList.remove('flipped');
                card1.flipped = false;
                card2.flipped = false;
                flippedCards = [];
            }, 1000);
        }
    }
}

function updateTimer() {
    if (!gameStarted || gameOver) return;
    timeLeft--;
    timeLeftDisplay.textContent = timeLeft + 's';
    if (timeLeft <= 0) endGame(false);
}

function calculateScore() {
    const { pairs, timeLimit } = difficultySettings[difficulty];
    const maxMoves = pairs * 2;
    const timeBonus = Math.max(0, Math.floor((timeLeft / timeLimit) * 100));
    const moveEfficiency = Math.max(0, 100 - Math.floor(Math.max(0, moves - maxMoves) * (100 / (maxMoves * 2))));
    const baseScore = pairs * 50;
    const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3;
    return Math.floor((baseScore + timeBonus + moveEfficiency) * difficultyMultiplier);
}

function endGame(win) {
    gameOver = true;
    gameStarted = false;
    clearInterval(timerInterval);
    score = calculateScore();
    scoreDisplay.textContent = score;

    gameOverScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    startScreen.style.display = 'none';

    if (win) {
        gameOverTitle.textContent = '🎉 Congratulations! 🎉';
        gameOverMessage.textContent = `You found all matches in ${moves} moves with ${timeLeft} seconds left!`;
    } else {
        gameOverTitle.textContent = '⏰ Time\'s up!';
        gameOverMessage.textContent = `You found ${cards.filter(c => c.matched).length / 2} out of ${cards.length / 2} pairs.`;
    }

    finalScoreDisplay.textContent = `Your Score: ${score}`;
}

startGameButton.addEventListener('click', () => {
    startScreen.style.display = 'none';
    initializeGame();
});

playAgainButton.addEventListener('click', () => {
    startScreen.style.display = 'block';
    gameOverScreen.style.display = 'none';
    initializeGame();
});

difficultyButtons.forEach(button => {
    button.addEventListener('click', function () {
        difficulty = this.dataset.difficulty;
        difficultyButtons.forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
    });
});

goBackButtonGame.addEventListener('click', () => {
    startScreen.style.display = 'block';
    gameScreen.style.display = 'none';
    clearInterval(timerInterval);
});

goBackButtonOver.addEventListener('click', () => {
    startScreen.style.display = 'block';
    gameOverScreen.style.display = 'none';
    clearInterval(timerInterval);
});

function confirmClose() {
    if (confirm('Are you sure you want to close this game? Your progress will be lost.')) {
        window.location.href = 'gameInterface.html';
    }
}