const navBar = document.querySelector(".navbar");
const navContent = document.querySelector(".nav-content");
const navMenu = document.querySelector(".nav-ul");
const hamburger = document.querySelector(".hamburger");
// const bars = document.querySelector(".bar");

export function navScroll(){
  document.addEventListener("scroll", () => {
    if(window.scrollY > 0 ){
      navBar.classList.add("navbar-scrolled");
      navContent.classList.add("nav-content-scrolled");
    } else {
      navBar.classList.remove("navbar-scrolled");
      navContent.classList.remove("nav-content-scrolled");
    }
  })
};

export function hamburgerClicked(){
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  })
};

