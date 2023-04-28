// const baseUrl = "https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed";

// async function getPosts() {
//   try {
//     const response = await fetch(baseUrl);
//     const posts = await response.json();
//     console.log(posts);
  
    
//     let i = 0;
//     let image = posts[i]._embedded["wp:featuredmedia"][0].source_url;
//     console.log(image);

//     createCarosel(posts, image); 

//     return posts;
//   } catch(error) {
//     console.log(error);
//   }
// }





// function createCarosel(posts, image) {
//   const wrapper = document.querySelector(".wrapper");
//   wrapper.innerHTML = `<i id="left" class="fa-solid fa-caret-left fa-4x arrow-left"></i>
//   <ul class="carousel">
//     <li class="card">
//       <div class="carousel-img-container">
//         <img src="${image}" class="carousel-image">
//         <div class="carousel-img-tag">Hardware</div>
//       </div>
//       <div class="carousel-info-container">
//         <div class="info-content">
//           <h2 class="carousel-h2"></h2>
//           <p class="carousel-p"></p>
//           <div class="dot-flex">
//             <p class="carousel-date"></p>
//             <div class="dot-group">
//               <div class="dot dot-active"></div>
//               <div class="dot"></div>
//               <div class="dot"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </li>
//     <li class="card">
//       <div class="carousel-img-container">
//         <img src="images/basshead.jpg" class="carousel-image">
//         <div class="carousel-img-tag">Hardware</div>
//       </div>
//       <div class="carousel-info-container">
//         <div class="info-content">
//           <h2 class="carousel-h2"></h2>
//           <p class="carousel-p"></p>
//           <div class="dot-flex">
//             <p class="carousel-date"></p>
//             <div class="dot-group">
//               <div class="dot"></div>
//               <div class="dot dot-active"></div>
//               <div class="dot"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </li>
//     <li class="card">
//       <div class="carousel-img-container">
//         <img src="images/colorsynth2.png" class="carousel-image">
//         <div class="carousel-img-tag">Hardware</div>
//       </div>
//       <div class="carousel-info-container">
//         <div class="info-content">
//           <h2 class="carousel-h2"></h2>
//           <p class="carousel-p"></p>
//           <div class="dot-flex">
//             <p class="carousel-date"></p>
//             <div class="dot-group">
//               <div class="dot"></div>
//               <div class="dot"></div>
//               <div class="dot dot-active"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </li>
//   </ul>
//   <i id="right" class="fa-solid fa-caret-right fa-4x"></i>`
// }



// createCarosel();

// getPosts();



const baseUrl = "https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed";

async function getPosts() {
  try {
    const response = await fetch(baseUrl);
    const posts = await response.json();
    console.log(posts);

    createCarosel(posts); // Pass the `posts` array to the `createCarousel` function

    return posts;
  } catch(error) {
    console.log(error);
  }
}

function createCarosel(posts) {
  const wrapper = document.querySelector(".wrapper");
  wrapper.innerHTML = `<i id="left" class="fa-solid fa-caret-left fa-4x arrow-left"></i>
  <ul class="carousel">
    ${posts.map((post, index) => {
      const image = post._embedded["wp:featuredmedia"][0].source_url;
      return `<li class="card ${index === 0 ? 'active' : ''}">
        <div class="carousel-img-container">
          <img src="${image}" class="carousel-image">
          <div class="carousel-img-tag">Hardware</div>
        </div>
        <div class="carousel-info-container">
          <div class="info-content">
            <h2 class="carousel-h2">${post.title.rendered}</h2>
            <p class="carousel-p">${post.excerpt.rendered}</p>
            <div class="dot-flex">
              <p class="carousel-date">${new Date(post.date).toLocaleDateString()}</p>
              <div class="dot-group">
                ${posts.map((_, i) => `<div class="dot ${i === index ? 'dot-active' : ''}"></div>`).join('')}
              </div>
            </div>
          </div>
        </div>
      </li>`;
    }).join('')}
  </ul>
  <i id="right" class="fa-solid fa-caret-right fa-4x"></i>`;
  
  initCarousel(); // Call the `initCarousel` function after creating the carousel elements
}

getPosts();

