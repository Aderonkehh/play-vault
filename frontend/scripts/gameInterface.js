
const cards = document.querySelectorAll('.card');
const carousel = document.getElementById('carousel');
let currentIndex = 0;
const radius = 300;

function updateCarousel() {
    cards.forEach((card, index) => {
    const angle = ((index - currentIndex) / cards.length) * 2 * Math.PI;
    const x = Math.sin(angle) * radius;
    const z = Math.cos(angle) * radius;

    card.style.transform = `translateX(${x}px) translateZ(${z}px)`;
    card.style.zIndex = Math.round(z);

    card.classList.toggle('active', index === currentIndex);
    });
}

function nextCard() {
    currentIndex = (currentIndex + 1) % cards.length;
    updateCarousel();
}

function prevCard() {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateCarousel();
}

function goToGame(url) {
    window.location.href = url;
}

function goBackHome() {
    // alert('Going back to Home page!')
    window.location.href = 'index.html';
}

function logout() {
  if (confirm("Are you sure you want to logout? Your game progress will be lost.")) {
    window.location.href = "gamelaunch.html";
  }
}

updateCarousel();