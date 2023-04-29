// const carousel = document.querySelector(".carousel");
// const arrowButtons = document.querySelectorAll(".wrapper i");
// const firstCardWidth = document.querySelector(".card").offsetWidth;
// const carouselChildrens = [...carousel.children];

// let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// let timeoutId;


// carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
//     carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
// });

// carouselChildrens.slice(0, cardPerView).forEach(card => {
//   carousel.insertAdjacentHTML("beforeend", card.outerHTML);
// });

// function arrowClick(){
//     arrowButtons.forEach(btn => {
//       btn.addEventListener("click", () => {
//         console.log("YO")
//         carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
//       })
//     })
// }

// arrowClick();

// const infiniteScroll = () => {
//   if(carousel.scrollLeft === 0){
//     carousel.classList.add("no-transition");
//     carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
//     carousel.classList.remove("no-transition");
//   } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
//     carousel.classList.add("no-transition");
//     carousel.scrollLeft = carousel.offsetWidth;
//     carousel.classList.remove("no-transition");
//   }

//   clearTimeout(timeoutId);
//   if(!carousel.matches(":hover")) autoPlay();
// }




// const autoPlay = () => {
//     if(window.innerWidth < 800) return;
//     timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 3000);
// }

// autoPlay();

// carousel.addEventListener("scroll", infiniteScroll);
// carousel.addEventListener("mouseenter", () => clearTimeout(timeoutId));
// carousel.addEventListener("mouseleave", autoPlay);


// document.addEventListener("DOMContentLoaded", function() {
// const carousel = document.querySelector(".carousel");
// const arrowButtons = document.querySelectorAll(".wrapper i");
// const firstCardWidth = document.querySelector(".card").offsetWidth;

// const carouselChildrens = [...carousel.children];

// let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// let timeoutId;


// carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
//     carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
// });

// carouselChildrens.slice(0, cardPerView).forEach(card => {
//   carousel.insertAdjacentHTML("beforeend", card.outerHTML);
// });

// function arrowClick(){
//     arrowButtons.forEach(btn => {
//       btn.addEventListener("click", () => {
//         console.log("YO")
//         carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
//       })
//     })
// }

// arrowClick();

// const infiniteScroll = () => {
//   if(carousel.scrollLeft === 0){
//     carousel.classList.add("no-transition");
//     carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
//     carousel.classList.remove("no-transition");
//   } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
//     carousel.classList.add("no-transition");
//     carousel.scrollLeft = carousel.offsetWidth;
//     carousel.classList.remove("no-transition");
//   }

//   clearTimeout(timeoutId);
//   if(!carousel.matches(":hover")) autoPlay();
// }




// const autoPlay = () => {
//     if(window.innerWidth < 800) return;
//     timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 3000);
// }

// autoPlay();

// carousel.addEventListener("scroll", infiniteScroll);
// carousel.addEventListener("mouseenter", () => clearTimeout(timeoutId));
// carousel.addEventListener("mouseleave", autoPlay);
// });












  // const carousel = document.querySelector(".carousel");
  // const arrowButtons = document.querySelectorAll(".wrapper i");
  // const firstCardWidth = document.querySelector(".card").offsetWidth;
  // const carouselChildrens = [...carousel.children];

  // let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  // let timeoutId;

  // carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  //     carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  // });

  // carouselChildrens.slice(0, cardPerView).forEach(card => {
  //   carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  // });

  // function arrowClick(){
  //     arrowButtons.forEach(btn => {
  //       btn.addEventListener("click", () => {
  //         console.log("YO")
  //         carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  //       })
  //     })
  // }

  // arrowClick();

  // const infiniteScroll = () => {
  //   if(carousel.scrollLeft === 0){
  //     carousel.classList.add("no-transition");
  //     carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
  //     carousel.classList.remove("no-transition");
  //   } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
  //     carousel.classList.add("no-transition");
  //     carousel.scrollLeft = carousel.offsetWidth;
  //     carousel.classList.remove("no-transition");
  //   }

  //   clearTimeout(timeoutId);
  //   if(!carousel.matches(":hover")) autoPlay();
  // }

  // const autoPlay = () => {
  //     if(window.innerWidth < 800) return;
  //     timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 3000);
  // }

  // autoPlay();

  // carousel.addEventListener("scroll", infiniteScroll);
  // carousel.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  // carousel.addEventListener("mouseleave", autoPlay);



  // console.log("Script loaded");
  // document.addEventListener("DOMContentLoaded", () => {
  //   console.log("DOM content loaded");
  //   async function main() {
  //     console.log("Main function executing...");
  //     const carousel = document.querySelector(".carousel");
  //     const arrowButtons = document.querySelectorAll(".wrapper i");
  //     const firstCardWidth = document.querySelector(".card").offsetWidth;
  //     const carouselChildrens = [...carousel.children];
  //     let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  //     let timeoutId;
  
  //     carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
  //       carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  //     });
  
  //     carouselChildrens.slice(0, cardPerView).forEach(card => {
  //       carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  //     });
  
  //     const infiniteScroll = () => {
  //       if(carousel.scrollLeft === 0){
  //         carousel.classList.add("no-transition");
  //         carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
  //         carousel.classList.remove("no-transition");
  //       } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
  //         carousel.classList.add("no-transition");
  //         carousel.scrollLeft = carousel.offsetWidth;
  //         carousel.classList.remove("no-transition");
  //       }
  
  //       clearTimeout(timeoutId);
  //       if(!carousel.matches(":hover")) autoPlay();
  //     };
  
  //     const autoPlay = () => {
  //       if(window.innerWidth < 800) return;
  //       timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 3000);
  //     };
  
  //     autoPlay();
  
  //     carousel.addEventListener("scroll", infiniteScroll);
  //     carousel.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  //     carousel.addEventListener("mouseleave", autoPlay);
  
  //     function arrowClick(){
  //       arrowButtons.forEach(btn => {
  //         console.log("Hello from arrow");
  //         btn.addEventListener("click", () => {
  //           carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  //         });
  //       });
  //     }
  
  //     arrowClick();
  //   }
  
  //   main();
  // });
  
  


  
 
  


  