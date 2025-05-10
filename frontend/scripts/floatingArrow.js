// Toggle scroll between top and bottom
const scrollArrow = document.getElementById('scrollArrow');

scrollArrow.addEventListener('click', () => {
  const atTop = window.scrollY < window.innerHeight / 2;
  if (atTop) {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});

// Change icon depending on scroll position
window.addEventListener('scroll', () => {
  const atTop = window.scrollY < window.innerHeight / 2;
  scrollArrow.innerHTML = atTop ? '🔻' : '🔺';
});