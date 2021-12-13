async function editPostFormHandler(e) {
  e.preventDefault();

  const title = document.querySelector("#post_title").value.trim();
  const content = document.querySelector("#post_content").value.trim();
  const post_id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  if (content) {
    const response = await fetch(`/api/posts/${post_id}`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // response.json().then(postData => {
      //   document.location.replace('/post/' + postData.id);
      // });
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
}

document
  .querySelector(".edit-post-form")
  .addEventListener("submit", editPostFormHandler);
