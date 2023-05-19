import { navScroll } from "../components/navbar.js";
import { hamburgerClicked } from "../components/navbar.js";
import { toTopButton } from "../components/totopbtn.js";
import { drawSvgPaths } from "../components/svg.js";
import { getPosts } from "../components/api.js";
import { validateNewsletter } from "../components/newsletter.js";
import { drawGramophone } from "../components/svg.js";

toTopButton();
navScroll();
drawSvgPaths();
drawGramophone();
hamburgerClicked();
getPosts();

// Newsletter
const newsBtn = document.querySelector(".news-button");

// Attach the event listener to newsBtn
newsBtn.addEventListener("click", validateNewsletter);
