import { navScroll } from "./components/navbar.js";
import { hamburgerClicked } from "./components/navbar.js";
import { toTopButton } from "./components/totopbtn.js";
import { drawSvgPaths } from "./components/svg.js";
import { getPosts } from "./components/api.js";
import { validateNewsletter } from "./components/newsletter.js";


toTopButton();
navScroll();
drawSvgPaths();
hamburgerClicked();
getPosts();

// Nesletter
const newsBtn = document.querySelector(".news-button");
newsBtn.addEventListener("click", validateNewsletter);

// Trending section
function createIndexHTML(post, imgData, altText, formattedDate, postId){
    const trendingContainer = document.querySelector(".trending-container");

    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");
    postContainer.id = post.id;

    const postImageContainer = document.createElement("a");
    postImageContainer.classList.add("post-image-container");
    postImageContainer.href = "/pages/post.html?id=" + postId;
    
    const postImage = document.createElement("img");
    postImage.classList.add("post-image");
    postImage.src = imgData;
    postImage.alt = altText;

    const postContent = document.createElement("div");
    postContent.classList.add("post-content");

    const postTitle = document.createElement("h3");
    postTitle.classList.add("post-header");
    postTitle.innerText = post.title.rendered;
    postTitle.innerHTML = new DOMParser().parseFromString(post.title.rendered, "text/html").body.textContent;
    
    const postExcerpt = document.createElement("p");
    postExcerpt.classList.add("post-excerpt");
    postExcerpt.innerText = post.excerpt.rendered.replace(/<\/?p>/g, "");
    postExcerpt.innerHTML = new DOMParser().parseFromString(post.excerpt.rendered, "text/html").body.textContent;

    const postLink = document.createElement("a");
    postLink.classList.add("post-link");
    postLink.innerText = "Read More";
    postLink.href = "/pages/post.html?id=" + postId;

    const postBotFlex = document.createElement("div");
    postBotFlex.classList.add("post-bot-flex");

    const postDate = document.createElement("div");
    postDate.classList.add("post-date");
    postDate.innerText = formattedDate;

    const postTag = document.createElement("div");
    postTag.classList.add("post-tag");
    postTag.innerText = post._embedded["wp:term"][0][0].name;
    if (post._embedded["wp:term"][0][0].name === "Synths"){
      postTag.style.backgroundColor = "#F1ABB9";
    } else if (post._embedded["wp:term"][0][0].name === "Devices"){
      postTag.style.backgroundColor = "#65A4BA";
    } else if (post._embedded["wp:term"][0][0].name === "News"){
      postTag.style.backgroundColor = "#39C5AF";
    };

    trendingContainer.append(postContainer);
    postContainer.append(postImageContainer, postContent);
    postImageContainer.append(postImage, postTag)
    postContent.append(postTitle, postExcerpt, postBotFlex);
    postBotFlex.append(postDate, postLink);
 
};

function loopIndexHTML(posts){
  for(let i = 0; i < posts.length; i++){
    const post = posts[i];
    const postId = post.id;
    console.log(postId)
    const imgData = post._embedded["wp:featuredmedia"][0].source_url;
    let altText = post._embedded["wp:featuredmedia"][0].alt_text;
    let dateString = post.date;
    let dateObject = new Date(dateString);
    let formattedDate = dateObject.toLocaleDateString("en-GB");
    console.log(formattedDate);
    createIndexHTML(post, imgData, altText, formattedDate, postId);
  }
};

async function main(){
  const startIndex = 4;
  const posts = await getPosts(4, startIndex);
  loopIndexHTML(posts);
};

main();


