let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
};

let isAutoPlaying = false;
let autoPlayInterval;

const resultElement = document.querySelector('#result-text');
const movesElement = document.querySelector('.js-moves');
const scoreElement = document.querySelector('.js-score');
const rockButton = document.querySelector('.js-rock-button');
const paperButton = document.querySelector('.js-paper-button');
const scissorsButton = document.querySelector('.js-scissors-button');
const resetButton = document.querySelector('.js-reset-score-button');
const autoPlayButton = document.querySelector('.js-auto-play-button');

const playerChoiceImg = document.getElementById('player-choice-img');
const computerChoiceImg = document.getElementById('computer-choice-img');
const moveButtons = document.querySelectorAll('.move-button');

function getComputerMove() {
    const randomNumber = Math.random();
    if (randomNumber < 1 / 3) return 'rock';
    if (randomNumber < 2 / 3) return 'paper';
    return 'scissors';
}

function determineWinner(playerMove, computerMove) {
    if (playerMove === computerMove) {
        score.ties++;
        return 'Tie';
    } else if (
        (playerMove === 'rock' && computerMove === 'scissors') ||
        (playerMove === 'paper' && computerMove === 'rock') ||
        (playerMove === 'scissors' && computerMove === 'paper')
    ) {
        score.wins++;
        return 'You win!';
    } else {
        score.losses++;
        return 'You lose!';
    }
}

function updateDisplay(playerMove, computerMove, result) {
    movesElement.textContent = `You chose ${playerMove}. Computer chose ${computerMove}.`;
    resultElement.textContent = result;
    updateScoreElement();

    playerChoiceImg.src = `/assets/${playerMove}-emoji.png`;
    playerChoiceImg.style.display = 'block';
    computerChoiceImg.src = `/assets/${computerMove}-emoji.png`;
    computerChoiceImg.style.display = 'block';

    if (result.includes('win')) {
        playSound('win');
        resultElement.classList.add('win-text');
        resultElement.classList.remove('lose-text');
        createExplosion(getButtonByMove(playerMove));
    } else if (result.includes('lose')) {
        playSound('lose');
        resultElement.classList.add('lose-text');
        resultElement.classList.remove('win-text');
        createExplosion(getButtonByMove(computerMove));
    } else {
        playSound('tie');
        resultElement.classList.remove('win-text', 'lose-text');
    }

    // Restore buttons and clear result after 1.5s
    setTimeout(() => {
        moveButtons.forEach(btn => btn.classList.remove('opacity-0'));
        resultElement.textContent = '';
        movesElement.textContent = '';
        playerChoiceImg.style.display = 'none';
        computerChoiceImg.style.display = 'none';
    }, 3000);
}

function getButtonByMove(move) {
    if (move === 'rock') return rockButton;
    if (move === 'paper') return paperButton;
    return scissorsButton;
}

function updateScoreElement() {
    scoreElement.textContent = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
    localStorage.setItem('score', JSON.stringify(score));
}

function resetScore() {
    score = { wins: 0, losses: 0, ties: 0 };
    localStorage.removeItem('score');
    updateScoreElement();
    resultElement.textContent = '';
    movesElement.textContent = '';
    playSound('tie');
    playerChoiceImg.style.display = 'none';
    computerChoiceImg.style.display = 'none';
}

function autoPlay() {
    if (!isAutoPlaying) {
        autoPlayInterval = setInterval(() => {
            const playerMove = getComputerMove();
            const computerMove = getComputerMove();
            animateComputerMove(getButtonByMove(computerMove));
            hideOtherOptions(playerMove);
            setTimeout(() => {
                const result = determineWinner(playerMove, computerMove);
                updateDisplay(playerMove, computerMove, result);
            }, 800);
        }, 2000);
        autoPlayButton.textContent = 'Stop Auto Play';
        isAutoPlaying = true;
    } else {
        clearInterval(autoPlayInterval);
        autoPlayButton.textContent = 'Auto Play';
        isAutoPlaying = false;
    }
}

function hideOtherOptions(playerMove) {
    moveButtons.forEach(button => {
        if (button.dataset.move !== playerMove) {
            button.classList.add('opacity-0');
        }
    });
}

function handleMove(playerMove) {
    const computerMove = getComputerMove();
    animateComputerMove(getButtonByMove(computerMove));
    hideOtherOptions(playerMove);
    setTimeout(() => {
        const result = determineWinner(playerMove, computerMove);
        updateDisplay(playerMove, computerMove, result);
    }, 800);
}

// Manual button event listeners
rockButton.addEventListener('click', () => handleMove('rock'));
paperButton.addEventListener('click', () => handleMove('paper'));
scissorsButton.addEventListener('click', () => handleMove('scissors'));

resetButton.addEventListener('click', resetScore);
autoPlayButton.addEventListener('click', autoPlay);

function confirmClose() {
    if (confirm('Are you sure you want to close this game? Your progress will be lost.')) {
        window.location.href = 'gameInterface.html';
    }
}

// Initial call
updateScoreElement();
