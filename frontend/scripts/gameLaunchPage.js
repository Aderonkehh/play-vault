// edit forgotPassword functions and login functions
// ensure validation for input and check correctness or display error message

// Function to navigate back to home page
function goBackHome() {
    window.location.href = 'index.html';
}

// Function for registering a new account (dummy implementation)
function register() {
    window.location.href = 'index.html#About';
}

// Open the forgot password modal when the "Forgot password" link is clicked
function forgotPassword() {
    document.getElementById('forgot-password-modal').classList.remove('hidden');
}


async function checkUsername() {
  const username = document.getElementById('forgot-username').value.trim();

  if (!username) {
    alert("Please enter a username.");
    return;
  }

  try {
    const res = await fetch('/check-username', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username })
    });

    const data = await res.json();

    if (data.success) {
      document.getElementById('username-error').classList.add('hidden');
      document.getElementById('set-password-section').classList.remove('hidden');
    } else {
      document.getElementById('username-error').classList.remove('hidden');
    }
  } catch (err) {
    console.error("Error checking username:", err);
  }
}

async function setNewPassword() {
  const username = document.getElementById('forgot-username').value.trim();
  const newPassword = document.getElementById('new-password').value.trim();

  if (!newPassword) {
    alert("Please enter a new password.");
    return;
  }

  try {
    const res = await fetch('/reset-password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, newPassword })
    });

    const data = await res.json();

    if (data.success) {
      alert("Password updated successfully!");
      closeForgotPasswordModal();
    } else {
      alert(data.message || "Failed to update password.");
    }
  } catch (err) {
    console.error("Error setting new password:", err);
    alert("Something went wrong.");
  }
}


// Login function to verify username and password, then start session and navigate
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        const result = await response.json();

        if (result.success) {
            // Save user session to local storage
            sessionStorage.setItem('user', JSON.stringify(result.user));

            // Redirect to the game interface page
            window.location.href = 'gameInterface.html';
        } else {
            alert('Invalid username or password.');
        }
    } catch (error) {
        console.error('Error logging in:', error);
        alert('An error occurred while logging in.');
    }
};

// Close the forgot password modal
function closeForgotPasswordModal() {
  document.getElementById('forgot-password-modal').classList.add('hidden');

  // Optional: Reset modal state
  document.getElementById('forgot-username').value = '';
  document.getElementById('forgot-username').disabled = false;
  document.getElementById('new-password').value = '';
  document.getElementById('set-password-section').classList.add('hidden');
  document.getElementById('username-error').classList.add('hidden');
}

// Call this function when the "Forgot password" link is clicked
document.querySelector('a[href="#"]').addEventListener('click', forgotPassword);
