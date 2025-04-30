const defaultTextDesktop = 'Hover over a game to learn more!';
const defaultTextMobile = 'Click on a game to learn more!';
const gameInfo = document.getElementById('game-info');
const playButton = document.querySelector('.play-button');
let currentGameURL = null;

// Detect screen type
const isDesktop = () => window.innerWidth >= 1024;

// Update game info and store URL
function updateGameInfo(card) {
  const description = card.getAttribute('data-description');
  const gameUrl = card.getAttribute('data-url');
  gameInfo.textContent = description;
  currentGameURL = gameUrl;
}

// Reset game info
function resetGameInfo() {
  gameInfo.textContent = isDesktop() ? defaultTextDesktop : defaultTextMobile;
  currentGameURL = null;
}

// Navigate to selected game
function navigateToGamePage() {
  if (currentGameURL) {
    window.location.href = currentGameURL;
  }
}

// Attach all behavior dynamically
function setupGameCardEvents() {
  const cards = document.querySelectorAll('.game-card');

  cards.forEach(card => {
    const gameUrl = card.getAttribute('data-url');

    if (isDesktop()) {
      // Desktop: hover updates, click navigates
      card.addEventListener('mouseenter', () => updateGameInfo(card));
      card.addEventListener('mouseleave', resetGameInfo);
      card.addEventListener('click', () => {
        currentGameURL = gameUrl;
        navigateToGamePage();
      });
    } else {
      // Mobile: click updates, play button navigates
      card.addEventListener('click', () => updateGameInfo(card));
    }
  });
}

// Play button click
playButton.addEventListener('click', navigateToGamePage);

// Run setup on load and optionally on resize
setupGameCardEvents();

window.addEventListener('resize', () => {
  resetGameInfo();
  setupGameCardEvents();
});
