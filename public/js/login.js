async function loginFormHandler(e) {
  e.preventDefault();

  // get user inputs
  const username = document.querySelector("#username_input").value.trim();
  const password = document.querySelector("#password_input").value;

  // setup invalid elements
  const username_wrapper = document.querySelector(".username_wrapper");
  const username_input = document.querySelector("#username_input");
  const invalid_username = document.querySelector(
    ".username_wrapper .invalid-feedback"
  );
  const password_wrapper = document.querySelector(".password_wrapper");
  const password_input = document.querySelector("#password_input");
  const invalid_password = document.querySelector(
    ".password_wrapper .invalid-feedback"
  );

  // reset any invalid elements from last submit
  username_input.classList.remove("is-invalid");
  username_wrapper.classList.remove("has-danger");
  password_input.classList.remove("is-invalid");
  password_wrapper.classList.remove("has-danger");

  // check if user provided both username and password
  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    // redirect to dashboard or provide invalid feedback
    if (response.ok) {
      document.location.replace("/dashboard");
    } else if (response.statusText === "Not Found") {
      invalid_username.textContent = "Sorry, username not found. Please try again.";
      username_input.classList.add("is-invalid");
      username_wrapper.classList.add("has-danger");
    } else if (response.statusText === "Bad Request") {
      invalid_password.textContent = "Invalid password! Please try again.";
      password_input.classList.add("is-invalid");
      password_wrapper.classList.add("has-danger");
    }
  }
  
  // if username left blank, prompt user to provide
  if (!username) {
    invalid_username.textContent = "Please enter your username.";
    username_input.classList.add("is-invalid");
    username_wrapper.classList.add("has-danger");
  }
  
  // if password left blank, prompt user to provide
  if (!password) {
    invalid_password.textContent = "Please enter your password.";
    password_input.classList.add("is-invalid");
    password_wrapper.classList.add("has-danger");
  }
}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
