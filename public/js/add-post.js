async function addPostFormHandler(e) {
  e.preventDefault();

  const title = document.querySelector("#post_title").value.trim();
  const content = document.querySelector("#post_content").value.trim();

  if (content) {
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        response.json().then(postData => {
          //document.location.replace('/post/' + postData.id);
          document.location.replace('/dashboard');
        });
    } else {
        alert(response.statusText);
    }
  }
}

document
  .querySelector(".add-post-form")
  .addEventListener("submit", addPostFormHandler);
