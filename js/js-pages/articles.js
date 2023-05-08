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

let posts;

// Nesletter
const newsBtn = document.querySelector(".news-button");
newsBtn.addEventListener("click", validateNewsletter);

const synthsBtn = document.querySelector(".synths-btn");
const newsFilterBtn = document.querySelector(".news-btn");
const devicesBtn = document.querySelector(".device-btn");

synthsBtn.addEventListener("click", () => filterPosts("Synths"));
newsFilterBtn.addEventListener("click", () => filterPosts("News"));
devicesBtn.addEventListener("click", () => filterPosts("Devices"));


// Create articles

function createIndexHTML(post, imgData, altText, formattedDate){
  const articleSection = document.querySelector(".article-section");

  const articleContainer = document.createElement("div");
  articleContainer.classList.add("article-container");
  articleContainer.id = post.id;

  const articleImageContainer = document.createElement("a");
  articleImageContainer.classList.add("article-image-container");
  articleImageContainer.href = "post.html?id=" + post.id;
  
  const articleImage = document.createElement("img");
  articleImage.classList.add("article-image");
  articleImage.src = imgData;
  articleImage.alt = altText;

  const articleContent = document.createElement("div");
  articleContent.classList.add("article-content");

  const articleTitle = document.createElement("h3");
  articleTitle.classList.add("article-header");
  articleTitle.innerText = post.title.rendered;
  articleTitle.innerHTML = new DOMParser().parseFromString(post.title.rendered, "text/html").body.textContent;
  
  const articleExcerpt = document.createElement("p");
  articleExcerpt.classList.add("article-excerpt");
  articleExcerpt.innerText = post.excerpt.rendered.replace(/<\/?p>/g, "");
  articleExcerpt.innerHTML = new DOMParser().parseFromString(post.excerpt.rendered, "text/html").body.textContent;

  const articleLink = document.createElement("a");
  articleLink.classList.add("article-link");
  articleLink.innerText = "Read More";
  articleLink.href = "post.html?id=" + post.id;

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

function filterPosts(tag) {
  // Clear the existing posts
  const articleSection = document.querySelector(".article-section");
  articleSection.innerHTML = "";

  // Filter the posts based on the selected tag
  const filteredPosts = posts.filter((post) => {
    return post._embedded["wp:term"][0][0].name === tag;
  });

  // Display the filtered posts
  loopIndexHTML(filteredPosts);
}


async function main(){
const numberPosts = 10;
posts = await getPosts(numberPosts);
loopIndexHTML(posts);

const showMoreBtn = document.querySelector(".show-more-btn");
showMoreBtn.addEventListener("click", async () => {
  let startIndex = 10;
  const newPosts = await getPosts(14, startIndex);
  loopIndexHTML(newPosts);
  showMoreBtn.style.display = "none";
});
};

main();


