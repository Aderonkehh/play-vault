const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
const playButtons = document.querySelectorAll('.play-button');

// update active slide and indicator
function updateCarousel(index) {
  // reset opacity of all slides and hide others
  slides.forEach((slide, i) => {
    slide.classList.remove('opacity-100');
    slide.classList.add('opacity-0');
  });

  // Set the active slide without fading it out
  slides[index].classList.remove('opacity-0');
  slides[index].classList.add('opacity-100');

  // Update indicators
  indicators.forEach((indicator, i) => {
    indicator.classList.remove('bg-pink-500');
    indicator.classList.add('bg-gray-400', 'opacity-50');
    if (i === index) {
      indicator.classList.remove('opacity-50');
      indicator.classList.add('bg-pink-500');
    }
  });
}

// Event listeners for each indicator
indicators.forEach((indicator, index) => {
  indicator.addEventListener('click', () => updateCarousel(index));
});

// Auto slide functionality 
let currentSlide = 0;
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateCarousel(currentSlide);
}, 6000); // Slide every 5 seconds

// Function to navigate to the game page when button is clicked
function navigateToGamePage() {
  window.location.href = 'play.html'; 
}

// Add event listener for the button click
playButtons.forEach(button => {
    button.addEventListener('click', navigateToGamePage);
  });
