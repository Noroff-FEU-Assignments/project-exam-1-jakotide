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

const nameComment = document.querySelector(".input-comment-name");
const comment = document.querySelector(".comment");
const commentForm = document.querySelector(".comment-form");

let comments = [];

let encoded; // Declare the encoded variable

commentForm.addEventListener("submit", async function (event) {
  event.preventDefault();
  try {
    const user = "wordpress.tidemand-goose.no";
    const psw = "g1w4 rM2S K8Wa z9Z5 UQsm gvry";
    encoded = btoa(user + ":" + psw); // Assign the value to encoded

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
      // Fetch the comments again to update the comment section
      await fetchComments();
      renderComment(); // Render the updated comments
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
      const commentObj = {
        commentId: item.id,
        id: item.post,
        postDate: item.date,
        nameComment: item.author_name,
        commentContent: item.content.rendered
          .replace(/(<([^>]+)>)/gi, "")
          .replace(/&[a-z]+;/gi, ""),
      };
      comments.push(commentObj);
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

    if (comments.length > maxComments) {
      // Remove previous comments if the maximum limit is reached
      comments.splice(0, comments.length - maxComments);
    }

    comments.slice().reverse().forEach((comment) => {
      const commentContainer = document.createElement("div");
      commentContainer.classList.add("comment-container");

      const nameContainer = document.createElement("div");
      nameContainer.classList.add("name-container");

      const name = document.createElement("h4");
      name.classList.add("comment-name");
      name.textContent = `${comment.nameComment},`;

      // const commentDate = document.createElement("div");
      // commentDate.classList.add("comment-date");
      // const formattedDate = new Date(comment.postDate).toLocaleString(); // Format the date
      // commentDate.textContent = formattedDate + ":";

      const commentDate = document.createElement("div");
  commentDate.classList.add("comment-date");
  const dateOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  const formattedDate = new Date(comment.postDate).toLocaleDateString([], dateOptions); // Format the date and time
  commentDate.textContent = formattedDate + ":";



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




