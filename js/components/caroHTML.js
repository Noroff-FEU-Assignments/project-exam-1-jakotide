const baseUrl = "https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed";

async function fetchPosts() {
  try {
    const response = await fetch(baseUrl);
    const posts = await response.json();
    console.log(posts);
    const card = document.querySelector(".card");
    console.log(card)
    return posts;
    } catch(error) {
    console.log(error);
    }
}

function createPostsHTML(posts){;
  for(let i=0; i < posts.length; i++) {
  const post = posts[i];
  let image = posts[i]._embedded["wp:featuredmedia"][0].source_url;
  let title = post.title.rendered;
  let subHeader = post.excerpt.rendered.replace(/<\/?p>/g, "");
  
  let dateString = post.date;
  let dateObject = new Date(dateString);
  let formattedDate = dateObject.toLocaleDateString("en-GB");
  
  console.log(formattedDate)  
  console.log(title)
  console.log(image)
  console.log(subHeader)
  
  createPostHTML(image, title, subHeader, formattedDate);
  }
  }
  
  async function main() {
  const posts = await fetchPosts();
  createPostsHTML(posts);
  }
  
  main();





// function createPostHTML(image, title, subHeader, formattedDate){
//   const wrapper = document.querySelector(".wrapper");
//     wrapper.innerHTML = `<i id="left" class="fa-solid fa-caret-left fa-4x arrow-left"></i>
//     <ul class="carousel">
//       <li class="card">
//         <div class="carousel-img-container">
//           <img src="${image}" class="carousel-image">
//           <div class="carousel-img-tag">Hardware</div>
//         </div>
//         <div class="carousel-info-container">
//           <div class="info-content">
//             <h2 class="carousel-h2">${title}</h2>
//             <p class="carousel-p">${subHeader}</p>
//             <div class="dot-flex">
//               <p class="carousel-date">${formattedDate}</p>
//               <div class="dot-group">
//                 <div class="dot dot-active"></div>
//                 <div class="dot"></div>
//                 <div class="dot"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </li>
//       <li class="card">
//         <div class="carousel-img-container">
//           <img src="${image[i]}" class="carousel-image">
//           <div class="carousel-img-tag">Hardware</div>
//         </div>
//         <div class="carousel-info-container">
//           <div class="info-content">
//             <h2 class="carousel-h2">${title[i]}</h2>
//             <p class="carousel-p"></p>
//             <div class="dot-flex">
//               <p class="carousel-date"></p>
//               <div class="dot-group">
//                 <div class="dot"></div>
//                 <div class="dot dot-active"></div>
//                 <div class="dot"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </li>
//       <li class="card">
//         <div class="carousel-img-container">
//           <img src="${image[i]}" class="carousel-image">
//           <div class="carousel-img-tag">Hardware</div>
//         </div>
//         <div class="carousel-info-container">
//           <div class="info-content">
//             <h2 class="carousel-h2">${title[i]}</h2>
//             <p class="carousel-p"></p>
//             <div class="dot-flex">
//               <p class="carousel-date"></p>
//               <div class="dot-group">
//                 <div class="dot"></div>
//                 <div class="dot"></div>
//                 <div class="dot dot-active"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </li>
//     </ul>
//     <i id="right" class="fa-solid fa-caret-right fa-4x"></i>`;
// }

const renderCarousel = async () => {
  try {
    const response = await fetchPosts("/wp/v2/posts", "?per_page=12&_embed");
    const carousel = document.querySelector(".carousel");
  const arrowButtons = document.querySelectorAll(".wrapper i");
  const firstCardWidth = document.querySelector(".card").offsetWidth;
  const carouselChildrens = [...carousel.children];

  let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
  let timeoutId;
    carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
      carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
  });

  carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
  });

  function arrowClick(){
      arrowButtons.forEach(btn => {
        btn.addEventListener("click", () => {
          console.log("YO")
          carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
        })
      })
  }

  arrowClick();

  const infiniteScroll = () => {
    if(carousel.scrollLeft === 0){
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
      carousel.classList.remove("no-transition");
    } else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if(!carousel.matches(":hover")) autoPlay();
  }

  const autoPlay = () => {
      if(window.innerWidth < 800) return;
      timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 3000);
  }

  autoPlay();

  carousel.addEventListener("scroll", infiniteScroll);
  carousel.addEventListener("mouseenter", () => clearTimeout(timeoutId));
  carousel.addEventListener("mouseleave", autoPlay);
    
  } catch (error) {
    console.log(error);
    carouselSection.innerHTML = "";
    carouselSection.append(renderAlertDialog("alert", "Oops, latest posts failed to load. Please try again later"));
  }
};

console.log("HEKLLLO")

// Setup
export const setupIndex = () => {
  
 
  renderCarousel();
};

