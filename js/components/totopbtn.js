const toTopBtn = document.querySelector(".to-top-btn");


function toTopButton(){
  window.addEventListener("scroll", () => {
    if(window.pageYOffset > 500) {
      toTopBtn.classList.add("active");
    } else {
      toTopBtn.classList.remove("active");
    }
  });
}

export {toTopButton};