import { navScroll } from "../components/navbar.js";
import { hamburgerClicked } from "../components/navbar.js";
import { toTopButton } from "../components/totopbtn.js";
import { drawSvgPaths } from "../components/svg.js";
import { getPosts } from "../components/api.js";
import { validateNewsletter } from "../components/newsletter.js";

toTopButton();
navScroll();
drawSvgPaths();
hamburgerClicked();
getPosts();
validateNewsletter();


function createPostHTML() {

  const postSection = document.querySelector(".post-container");
  
  const postHeaderSection = document.createElement("section");

  const postImageMain = document.createElement("img");
  postImageMain.classList.add("post-image-main");
  postImageMain.src = imgData;
  postImageMain.alt = altText;

  postSection.append(postHeaderSection);
  postHeaderSection.append(postImageMain);

}

function loopPostHTML() {
  for(i = 0; i < posts.length; i++){
    const post = posts[i];
    const imgData = post._embedded["wp:featuredmedia"][0].source_url;
    let altText = post._embedded["wp:featuredmedia"][0].alt_text;
    let dateString = post.date;
    let dateObject = new Date(dateString);
    let formattedDate = dateObject.toLocaleDateString("en-GB");
    console.log(formattedDate);
    createPostHTML(post, imgData, altText, formattedDate);
  }
}

async function mainPost() {
  const numberPost = 1;
  posts = await getPosts(numberPosts);
  console.log(posts);
  loopPostHTML();
}

mainPost();