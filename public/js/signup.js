async function signupFormHandler(e) {
  e.preventDefault();

  // get user inputs
  const username = document.querySelector("#username_input").value.trim();
  const password = document.querySelector("#password_input").value;
  const reenter_password = document.querySelector("#reenter_password_input").value;

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
  const reenter_password_wrapper = document.querySelector(".reenter_password_wrapper");
  const reenter_password_input = document.querySelector("#reenter_password_input");
  const invalid_reenter_password = document.querySelector(
    ".reenter_password_wrapper .invalid-feedback"
  );

  // reset any invalid elements from last submit
  username_input.classList.remove("is-invalid");
  username_wrapper.classList.remove("has-danger");
  password_input.classList.remove("is-invalid");
  password_wrapper.classList.remove("has-danger");
  reenter_password_input.classList.remove("is-invalid");
  reenter_password_wrapper.classList.remove("has-danger");

  // check if user provided both username and password
  if (username && password && reenter_password && password === reenter_password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    // redirect to dashboard or provide invalid feedback
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      response.json().then(data => {
        console.log(data.errors[0].message)
        if (data.errors[0].message.includes("username must be unique")) {
          invalid_username.textContent = "Sorry, that username is taken. Please try again.";
          username_input.classList.add("is-invalid");
          username_wrapper.classList.add("has-danger");
        } else if (data.errors[0].message.includes("len on password failed")) {
          invalid_password.textContent = "Please enter a password that's at least 6 characters.";
          password_input.classList.add("is-invalid");
          password_wrapper.classList.add("has-danger");
        }
      });
    }

  }

  if (!username) {
    invalid_username.textContent = "Please enter a username.";
    username_input.classList.add("is-invalid");
    username_wrapper.classList.add("has-danger");
  }
  
  if (!password) {
    invalid_password.textContent = "Please enter a password.";
    password_input.classList.add("is-invalid");
    password_wrapper.classList.add("has-danger");
  }

  if (!reenter_password) {
    invalid_reenter_password.textContent = "Please re-enter your password.";
    reenter_password_input.classList.add("is-invalid");
    reenter_password_wrapper.classList.add("has-danger");
  }

  if (password !== reenter_password) {
    invalid_reenter_password.textContent = "Your passwords don't match. Please try again.";
    reenter_password_input.classList.add("is-invalid");
    reenter_password_wrapper.classList.add("has-danger");
  }
}

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);