const postBaseUrl = `https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts/`;
const commentUrl = "https://wordpress.tidemand-goose.no/wp-json/wp/v2/comments";

const queryString = document.location.search;
const params = new URLSearchParams(queryString);
const id = params.get("id");

async function getPost() {
  try {
    const response = await fetch(postBaseUrl + id + "?_embed");
    const results = await response.json();
   
    return results;
  } catch (error) {
    console.log(error);
  }
}

getPost();

const nameComment = document.querySelector(".input-comment-name");
const comment = document.querySelector(".comment");
const commentForm = document.querySelector(".comment-form");

let comments = [];

let encoded; 

commentForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  try {
    const user = "wordpress.tidemand-goose.no";
    const psw = "g1w4 rM2S K8Wa z9Z5 UQsm gvry";
    encoded = btoa(user + ":" + psw); 

    const response = await fetch(`${commentUrl}?post=${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${encoded}`,
      },
      body: JSON.stringify({
        post: id,
        author_name: nameComment.value,
        content: comment.value,
      }),
    });

    if (response.ok) {
      console.log("Comment posted successfully");

      // Update the comments array with the new comment
      const newComment = {
        commentId: Date.now().toString(),
        id: id,
        postDate: new Date().toISOString(),
        nameComment: nameComment.value,
        commentContent: comment.value,
      };
      comments.push(newComment);

      // Fetch the comments again to update the comment section
      await fetchComments();
      renderComment(); // Render the updated comments

      nameComment.value = "";
      comment.value = "";

      const commentSuccess = document.querySelector(".comment-success");
      commentSuccess.style.display = "block";
    } else {
      console.log("Error posting comment");
    }
  } catch (error) {
    console.log(error);
  }
});

async function fetchComments() {
  try {
    const response = await fetch(`${commentUrl}?post=${id}`);
    const data = await response.json();

    comments = []; // Clear the comments array

    for (const item of data) {
      const commentObject = {
        commentId: item.id,
        id: item.post,
        postDate: item.date,
        nameComment: item.author_name,
        commentContent: item.content.rendered
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/&[a-z]+;/gi, ""),
      };
      comments.push(commentObject);
    }
  } catch (error) {
    console.log(error);
  }
}

const commentsList = document.querySelector(".comment-list");

function renderComment() {
  commentsList.innerHTML = ""; // Clear the comments list

  if (comments.length === 0) {
    const noComment = document.createElement("div");
    noComment.classList.add("no-comment");
    noComment.innerHTML = "Be the first to comment!";
    commentsList.append(noComment);
  } else {
    const maxComments = 5; // Maximum number of comments allowed

    const startIndex = Math.max(0, comments.length - maxComments); // Calculate the start index for slicing the comments array
    const limitedComments = comments.slice(startIndex); // Get the limited number of comments

    limitedComments.forEach((comment) => {
      const commentContainer = document.createElement("div");
      commentContainer.classList.add("comment-container");

      const nameContainer = document.createElement("div");
      nameContainer.classList.add("name-container");

      const name = document.createElement("h4");
      name.classList.add("comment-name");
      name.textContent = `${comment.nameComment},`;

      const commentDate = document.createElement("div");
      commentDate.classList.add("comment-date");
      const formattedDate = new Date(comment.postDate).toLocaleDateString();
      commentDate.textContent = formattedDate;

      const message = document.createElement("p");
      message.classList.add("comment-content");
      message.textContent = `${comment.commentContent}`;

      nameContainer.append(name, commentDate);
      commentContainer.append(nameContainer, message);
      commentsList.prepend(commentContainer); // Prepend new comments to show the latest first
    });
  }
}

// Fetch and render comments initially
fetchComments().then(() => {
  renderComment();
});
