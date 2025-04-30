// Function to update the game description on hover
function updateGameInfo(card) {
    const description = card.getAttribute('data-description');
    const gameInfo = document.getElementById('game-info');
    gameInfo.textContent = description;
  }
  
// Function to reset the game description when hover is removed
function resetGameInfo() {
    const gameInfo = document.getElementById('game-info');
    gameInfo.textContent = 'Hover over a game to learn more!';
}

function navigateToGamePage() {
    window.location.href = 'play.html'; 
  }
  
// Add event listener for game cards
    const gameCards = document.querySelectorAll('.game-card');
    gameCards.forEach(card => {
    card.addEventListener('click', navigateToGamePage);
});
  