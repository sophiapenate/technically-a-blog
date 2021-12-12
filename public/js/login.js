async function loginFormHandler(e) {
  e.preventDefault();

  // get user inputs
  const username = document.querySelector("#username_input").value.trim();
  const password = document.querySelector("#password_input").value;

  // setup invalid elements
  const username_wrapper = document.querySelector(".username_wrapper");
  const username_input = document.querySelector("#username_input");
  const password_wrapper = document.querySelector(".password_wrapper");
  const password_input = document.querySelector("#password_input");
  const invalid_feedback = document.createElement("div");
  invalid_feedback.classList.add("invalid-feedback");

  // reset any invalid elements from last submit
  username_input.classList.remove('is-invalid');
  username_wrapper.classList.remove('has-danger');

  // check if user provided both username and password
  if (username && password) {
    const response = await fetch("api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    // redirect to dashboard or provide invalid feedback
    if (response.ok) {
        document.location.replace('/dashboard');
    } else if (response.statusText === 'Not Found') {
        username_input.classList.add('is-invalid');
        invalid_feedback.textContent = 'Sorry, username not found.';
        username_wrapper.classList.add('has-danger');
        username_wrapper.appendChild(invalid_feedback);
    } else if (response.statusText === 'Bad Request') {
        password_input.classList.add('is-invalid');
        invalid_feedback.textContent = 'Incorrect password! Try again.';
        password_wrapper.classList.add('has-danger');
        password_wrapper.appendChild(invalid_feedback);
    }
  }
}

document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);
