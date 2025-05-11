//implement logout() clear sessionStorage and navigate to gameLaunch.html
//implement deleteProfile() - confirm with user before deleting profile
//implement viewgamehistory() display game history in modal

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

// Logout function to clear session and redirect
function logout() {
    if (confirm("Are you sure you want to logout? Your game progress will be lost.")) {
        sessionStorage.removeItem('user');
        window.location.href = 'gameLaunch.html';
    }
}

// Check if the user is logged in (session management)
function checkLoginStatus() {
    const user = sessionStorage.getItem('user');
    if (!user) {
        window.location.href = 'gameLaunch.html'; // Redirect to login page if not logged in
    }
}

// Toggle dropdown menu
function toggleDropdown() {
  document.getElementById('profile-dropdown').classList.toggle('hidden');
}

// Close dropdown if clicked outside
document.addEventListener('click', function(event) {
  const dropdown = document.getElementById('profile-dropdown');
  const profileIcon = document.querySelector('img[alt="Profile"]');
  if (!dropdown.contains(event.target) && !profileIcon.contains(event.target)) {
    dropdown.classList.add('hidden');
  }
});

// View Play History
async function viewPlayHistory() {
  const modal = document.getElementById('history-modal');
  const list = document.getElementById('history-list');
  const usernameHeader = document.getElementById('history-username');

  modal.classList.remove('hidden');

  try {
    const username = localStorage.getItem('username');
    usernameHeader.textContent = username;

    const response = await fetch(`https://your-backend-api.com/user-history?username=${username}`);
    const result = await response.json();

    list.innerHTML = ''; // Clear old entries

    if (result.history && result.history.length) {
      result.history.forEach(entry => {
        const li = document.createElement('li');
        li.textContent = `Game: ${entry.game}, Score: ${entry.score}, Time: ${entry.timestamp}`;
        list.appendChild(li);
      });
    } else {
      list.innerHTML = '<li>No history found.</li>';
    }

  } catch (error) {
    console.error('Error fetching history:', error);
    alert('Could not fetch play history.');
  }
}

// Close history modal
function closeHistoryModal() {
  document.getElementById('history-modal').classList.add('hidden');
}

// Close modal on outside click
document.getElementById('history-modal').addEventListener('click', function(event) {
  if (event.target.id === 'history-modal') {
    closeHistoryModal();
  }
});

// Confirm and delete account
function confirmDeleteAccount() {
  if (confirm("Are you sure you want to permanently delete your account? This cannot be undone.")) {
    deleteAccount();
  }
}

// Delete account function
async function deleteAccount() {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const username = user?.username;
  if (!username) {
    alert("No username found in session storage.");
    return;
  }

  try {
    const response = await fetch('/delete-account', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username }),
    });

    const result = await response.json();
    if (result.success) {
      alert("Your account has been deleted.");
      sessionStorage.clear();
      window.location.href = 'index.html';
    } else {
      alert(result.message || "Failed to delete account.");
    }
  } catch (error) {
    console.error('Error deleting account:', error);
    alert("An error occurred while deleting your account.");
  }
}




updateCarousel();