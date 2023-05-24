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

const postId = new URLSearchParams(window.location.search).get("id");
const postBaseUrl = `https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts/`;

async function getPost() {
  try {
    const response = await fetch(postBaseUrl + postId + "?_embed");
    
    const results = await response.json();
   
    return results;

  } catch(error) {
    console.log(error);
  }
}

getPost();

// Modal Image

function showModal(imageSrc) {
  document.body.style.overflow = "hidden";

  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  const modalImage = document.createElement("img");
  modalImage.classList.add("modal-image");
  modalImage.src = imageSrc;

  const modalClose = document.createElement("i");
  modalClose.classList.add("far", "fa-times-circle");
  modalClose.addEventListener("click", hideModal);

  modalContainer.addEventListener("click", (event) => {
    if (event.target === modalContainer) {
      hideModal();
    }
  });

  modalContainer.appendChild(modalClose);
  modalContainer.appendChild(modalImage);
  document.body.appendChild(modalContainer);
}

function hideModal() {
  document.body.style.overflow = "visible";
  const modalContainer = document.querySelector(".modal-container");
  modalContainer.remove();
}


async function createPostHTML() {
  try {
    const post = await getPost();

    const title = new DOMParser().parseFromString(post.title.rendered, "text/html").body.textContent;
    document.title = `${title} | Goose`;

    const postSection = document.querySelector(".post-section");

    const postContainer = document.createElement("div");
    postContainer.classList.add("post-specific-container");

    const postHeader = document.createElement("div");
    postHeader.classList.add("post-specific-header");

    const articleContentContainer = document.createElement("div");
    articleContentContainer.classList.add("article-content-container")

    const articleFlexOne = document.createElement("div");
    articleFlexOne.classList.add("article-flex-one");

    const articleFlexTwo = document.createElement("div");
    articleFlexTwo.classList.add("article-flex-one");

    const postImage = document.createElement("img");
    postImage.classList.add("post-specific-image");
    postImage.src = post._embedded["wp:featuredmedia"][0].source_url;
    postImage.alt = post._embedded["wp:featuredmedia"][0].alt_text;

    postImage.addEventListener("click", () => {
      showModal(post._embedded["wp:featuredmedia"][0].source_url);
    });

    const renderImageTwo = post.content.rendered;
    const parser = new DOMParser();
    const doc = parser.parseFromString(renderImageTwo, 'text/html');
    const imgElement = doc.querySelector('figure img');

    const imageTwo = document.createElement("img");
    imageTwo.classList.add("post-image-two");

    imageTwo.addEventListener("click", () => {
      showModal(imageTwo.src);
    });


    if (imgElement) {
      const imageSrc = imgElement.src;
      const imageAlt = imgElement.alt;
      imageTwo.src = imageSrc;
      imageTwo.alt = imageAlt;
    };

    const articleTag = document.createElement("div");
    articleTag.classList.add("article-tag");
    articleTag.innerText = post._embedded["wp:term"][0][0].name;
    if (post._embedded["wp:term"][0][0].name === "Synths"){
      articleTag.style.backgroundColor = "#F1ABB9";
    } else if (post._embedded["wp:term"][0][0].name === "Devices"){
      articleTag.style.backgroundColor = "#65A4BA";
    } else if (post._embedded["wp:term"][0][0].name === "News"){
      articleTag.style.backgroundColor = "#39C5AF";
    };

    const postTitle = document.createElement("h1");
    postTitle.classList.add("post-h1-article");
    postTitle.innerHTML = new DOMParser().parseFromString(post.title.rendered, "text/html").body.textContent;

    const postTextOne = document.createElement("div");
    postTextOne.classList.add("post-text-one");

    const postTextTwo = document.createElement("div");
    postTextTwo.classList.add("post-text-two");

    const content = post.content.rendered;

    const textParser = new DOMParser();
    const textDoc = textParser.parseFromString(content, 'text/html');

    // Remove <figure> elements
    const figureElements = textDoc.querySelectorAll('figure');
    figureElements.forEach(element => element.remove());

    // Get the <p> elements
    const paragraphElements = textDoc.querySelectorAll('p');

    // Extract the first four paragraphs with <br> tags
    let extractedContent = '';
    let extractedContentTwo = '';
    for (let i = 0; i < 3 && i < paragraphElements.length; i++) {
      extractedContent += paragraphElements[i].outerHTML;
    }
    for (let i = 4; i < 6 && i < paragraphElements.length; i++) {
      extractedContentTwo += paragraphElements[i].outerHTML;
    }

    postTextOne.innerHTML = extractedContent;

    postTextTwo.innerHTML = extractedContentTwo;

    let dateString = post.date;
    let dateObject = new Date(dateString);
    let formattedDate = dateObject.toLocaleDateString("en-GB");
    const postDate = document.createElement("div");
    postDate.classList.add("article-date");
    postDate.innerText = formattedDate;

    postSection.append(postContainer);
    postContainer.append(articleTag, postHeader, articleContentContainer);
    postHeader.append(postTitle, postDate);
    articleContentContainer.append(articleFlexOne, articleFlexTwo);
    articleFlexOne.append(postTextOne, postImage);
    articleFlexTwo.append(imageTwo, postTextTwo);


  } catch(error) {
    console.log(error);
  }
}

createPostHTML();
