import { navScroll } from "../components/navbar.js";
import { hamburgerClicked } from "../components/navbar.js";
import { toTopButton } from "../components/totopbtn.js";
import { validateEmail } from "../components/formValidation.js";

toTopButton();
navScroll();
hamburgerClicked();
validateEmail();

const newsLetter = document.querySelector(".newsletter");
const newsInput = document.querySelector(".news-input");
const newsError = document.querySelector(".newsletter-error");
const newsSuccess = document.querySelector(".newsletter-success");
const newsBtn = document.querySelector(".news-button");


function validateNewsletter(event){
  event.preventDefault();
  if (validateEmail(newsInput.value) === true) {
    newsError.style.display = "none";
    newsSuccess.style.display = "block";
  } else {
    newsError.style.display = "block";
    newsSuccess.style.display = "none";
  };
}
newsBtn.addEventListener("click", validateNewsletter);
