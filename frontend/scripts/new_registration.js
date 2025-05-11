// Insert javascript here for registering new user from index page
// check if username exists in DB before creating new user
// if username is taken, display error message
// else create new user and display success message

// ---------------------------------------------------Registrations
//register a student when /register route triggered
async function registerStudent() {
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();
  const confirmpassword = document.getElementById('confirmPassword').value.trim();

  if (!username || !password || !confirmpassword) {
    alert("Please fill in all fields");
    return;
  }

  const data = { username, password, confirmpassword };

  try {
    const res = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
      document.getElementById("successMsg").classList.remove("hidden");
      alert(result.message);
    } else {
      document.getElementById("usernameError").classList.remove("hidden");
      alert(result.message);
    }

  } catch (error) {
    alert("An error occurred while registering.");
    console.error(error);
  }
}



