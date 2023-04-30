import { navScroll } from "./components/navbar.js";
import { hamburgerClicked } from "./components/navbar.js";
import { toTopButton } from "./components/totopbtn.js";
// import { drawSvgPaths } from "./components/svg.js";
import { getPosts } from "./components/api.js";


toTopButton();
navScroll();
// drawSvgPaths();
hamburgerClicked();
getPosts();


// Trending section

function createIndexHTML(post, imgData, altText){
    const trendingContainer = document.querySelector(".trending-container");

    const postContainer = document.createElement("div");
    postContainer.classList.add("post-container");
    postContainer.id = post.id;
    
    const postImage = document.createElement("img");
    postImage.classList.add("post-image");
    postImage.src = imgData;
    postImage.alt = altText;
    console.log(postImage.alt);

};

function loopIndexHTML(posts){
  for(let i = 0; i < posts.length; i++){
    const post = posts[i];
    const imgData = post._embedded["wp:featuredmedia"][0].source_url;
    let altText = post._embedded["wp:featuredmedia"][0].alt_text;
    
    createIndexHTML(post, imgData, altText);
  }
};

async function main(){
  const posts = await getPosts();
  loopIndexHTML(posts);
};

main();
