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

  // Reset messages
  document.getElementById("usernameError").classList.add("hidden");
  document.getElementById("passwordError").classList.add("hidden");
  document.getElementById("successMsg").classList.add("hidden");

  if (!username || !password || !confirmpassword) {
    alert("Please fill in all fields");
    return;
  }

  if (password !== confirmpassword) {
    document.getElementById("passwordError").classList.remove("hidden");
    return;
  }

  try {
    const response = await fetch('/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, confirmpassword })
    });

    const result = await response.json();

    console.log("Status:", response.status);
    console.log("Result:", result);

    // Only proceed if backend confirms success explicitly
    if (response.ok && response.status === 201 && result.success === true) {
      document.getElementById("successMsg").classList.remove("hidden");
      setTimeout(() => {
        document.getElementById("signupForm").reset();
        window.location.href = "gameInteface.html";
      }, 2000);
    } else {
      // Show detailed errors
      if (result.message?.toLowerCase().includes("username")) {
        document.getElementById("usernameError").classList.remove("hidden");
      }
      if (result.message?.toLowerCase().includes("password")) {
        document.getElementById("passwordError").classList.remove("hidden");
      }

      alert(result.message || "Registration failed.");
    }

  } catch (error) {
    console.error("Fetch error:", error);
    alert("Something went wrong. Please try again.");
  }
}









