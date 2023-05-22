const postBaseUrl = `https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts/`;
const commentUrl = "https://wordpress.tidemand-goose.no/wp-json/wp/v2/comments";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

console.log(id);

async function getPost() {
  try {
    const response = await fetch(postBaseUrl + id + "?_embed");
    const results = await response.json();
    console.log(results);
    return results;
  } catch (error) {
    console.log(error);
  }
}

getPost();

const nameComment = document.querySelector(".comment-name");
const comment = document.querySelector(".comment");
const commentForm = document.querySelector(".comment-form");

let comments = [];

commentForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  try {
    const response = await fetch(`${commentUrl}?post=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: id,
        author_name: nameComment.value,
        content: comment.value,
      }),
    });
    if (response.ok) {
      console.log("Comment posted successfully");
      location.reload();
    } else {
      console.log("Failed to post comment");
    }
  } catch (error) {
    console.log(error);
  }
});


async function fetchComments() {
  try {
    const response = await fetch(`${commentUrl}?post=${id}`);
    const data = await response.json();

    for (const item of data) {
      const commentObj = {
        commentId: item.id,
        id: item.postId,
        postDate: item.date,
        commentName: item.author_name,
        commentContent: item.content.rendered.replace(/(<([^>]+)>)/gi, "").replace(/&[a-z]+;/gi, ""),
      };
      comments.push(commentObj);
    }
    return data;
  } catch (error) {
    console.log(error);
  }
}

fetchComments();

const commentsList = document.querySelector(".comment-list");

if (comments.length === 0) {
  const noComment = document.createElement("div");
  noComment.classList.add("no-comment");
  noComment.innerHTML = "Be the first to comment!";
  commentsList.append(noComment);
} else {
  comments.forEach((comment) => {
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");
    commentsList.append(commentContainer);

    const name = document.createElement("h4");
    name.classList.add("comment-name");
    name.textContent = `${comment.commentName}:`;
    commentContainer.append(name);

    const message = document.createElement("p");
    message.classList.add("comment-content");
    message.textContent = `${comment.commentContent}`;
    commentContainer.append(message);
  });
}



// function validateCommentForm() {
//   const isNameValid = nameComment.value.trim() !== "";
//   const isCommentValid = comment.value.trim() !== "";

//   const isFormValid = isNameValid && isCommentValid;
//   const submitButton = document.getElementById("submit-comment");
//   submitButton.disabled = !isFormValid;
// }

// commentName.addEventListener("input", validateCommentForm);
// commentContent.addEventListener("input", validateCommentForm);
