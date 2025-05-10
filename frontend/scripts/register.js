const takenUsernames = ['admin', 'user123', 'test']; // Simulated taken usernames

const form = document.getElementById('signupForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const successMsg = document.getElementById('successMsg');

form?.addEventListener('submit', function (e) {
  e.preventDefault();

  usernameError.classList.add('hidden');
  passwordError.classList.add('hidden');
  successMsg.classList.add('hidden');

  const username = usernameInput.value.trim();
  const password = passwordInput.value;
  const confirmPassword = confirmPasswordInput.value;

  let isValid = true;

  if (takenUsernames.includes(username.toLowerCase())) {
    usernameError.classList.remove('hidden');
    isValid = false;
  }

  if (password !== confirmPassword) {
    passwordError.classList.remove('hidden');
    isValid = false;
  }

  if (isValid) {
    successMsg.classList.remove('hidden');
    form.reset();
  }
});




