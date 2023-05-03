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

// Nesletter
const newsBtn = document.querySelector(".news-button");
newsBtn.addEventListener("click", validateNewsletter);

// Create articles

function createIndexHTML(post, imgData, altText, formattedDate){
  const articleSection = document.querySelector(".article-section");

  const articleContainer = document.createElement("div");
  articleContainer.classList.add("article-container");
  articleContainer.id = post.id;

  const articleImageContainer = document.createElement("a");
  articleImageContainer.classList.add("article-image-container");
  
  const articleImage = document.createElement("img");
  articleImage.classList.add("article-image");
  articleImage.src = imgData;
  articleImage.alt = altText;

  const articleContent = document.createElement("div");
  articleContent.classList.add("article-content");

  const articleTitle = document.createElement("h3");
  articleTitle.classList.add("article-header");
  articleTitle.innerText = post.title.rendered;
  
  const articleExcerpt = document.createElement("p");
  articleExcerpt.classList.add("article-excerpt");
  articleExcerpt.innerText = post.excerpt.rendered.replace(/<\/?p>/g, "");
  articleExcerpt.innerHTML = new DOMParser().parseFromString(post.excerpt.rendered, "text/html").body.textContent;

  const articleLink = document.createElement("a");
  articleLink.classList.add("article-link");
  articleLink.innerText = "Read More";

  const articleBotFlex = document.createElement("div");
  articleBotFlex.classList.add("article-bot-flex");

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

  articleSection.append(articleContainer);
  articleContainer.append(articleImageContainer, articleContent);
  articleImageContainer.append(articleImage, postTag)
  articleContent.append(articleTitle, articleExcerpt, articleBotFlex);
  articleBotFlex.append(postDate, articleLink);

};

function loopIndexHTML(posts){
for(let i = 0; i < posts.length; i++){
  const post = posts[i];
  const imgData = post._embedded["wp:featuredmedia"][0].source_url;
  let altText = post._embedded["wp:featuredmedia"][0].alt_text;
  let dateString = post.date;
  let dateObject = new Date(dateString);
  let formattedDate = dateObject.toLocaleDateString("en-GB");
  console.log(formattedDate);
  createIndexHTML(post, imgData, altText, formattedDate);
}
};

async function main(){
const perPage = "&_per_page=4";
const posts = await getPosts(10);
loopIndexHTML(posts);
};

main();