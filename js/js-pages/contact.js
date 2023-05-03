import { navScroll } from "../components/navbar.js";
import { hamburgerClicked } from "../components/navbar.js";
import { toTopButton } from "../components/totopbtn.js";
import { validateNewsletter } from "../components/newsletter.js";

toTopButton();
navScroll();
hamburgerClicked();

// Nesletter
const newsBtn = document.querySelector(".news-button");
newsBtn.addEventListener("click", validateNewsletter);
