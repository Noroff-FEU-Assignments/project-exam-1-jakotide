const baseUrl = "https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed";

async function fetchPosts() {
  try {
    const response = await fetch(baseUrl);
    const posts = await response.json();
    console.log(posts);
    return posts;
  } catch (error) {
    console.log(error);
  }
}

function createPostHTML(image, title, subHeader, formattedDate, categoryName) {
  return `<li class="card">
    <div class="carousel-img-container">
      <img src="${image}" class="carousel-image">
      <div class="carousel-img-tag">${categoryName}</div>
    </div>
    <div class="carousel-info-container">
      <div class="info-content">
        <h2 class="carousel-h2">${title}</h2>
        <p class="carousel-p">${subHeader}</p>
        <div class="dot-flex">
          <p class="carousel-date">${formattedDate}</p>
          <div class="dot-group">
            <div class="dot dot-active"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div>
        </div>
      </div>
    </div>
  </li>`;
}

async function createPostsHTML(posts) {
  const wrapper = document.querySelector(".wrapper");
  let postHTML = "";
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    let image = post._embedded["wp:featuredmedia"][0].source_url;
    let title = post.title.rendered;
    let subHeader = post.excerpt.rendered.replace(/<\/?p>/g, "");
    let dateString = post.date;
    let dateObject = new Date(dateString);
    let formattedDate = dateObject.toLocaleDateString("en-GB");
    let categoryName = post._embedded["wp:term"][0][0].name;
    console.log(categoryName)
    console.log(formattedDate);
    console.log(title);
    console.log(image);
    console.log(subHeader);
    postHTML += createPostHTML(image, title, subHeader, formattedDate, categoryName);
  }
  wrapper.innerHTML = `<i id="left" class="fa-solid fa-caret-left fa-4x arrow-left"></i>
    <ul class="carousel">${postHTML}</ul>
    <i id="right" class="fa-solid fa-caret-right fa-4x"></i>`;
}

async function main() {
  const posts = await fetchPosts();
  createPostsHTML(posts);
  // const carouselSection = document.querySelector(".carousel-section");
  // renderCarousel(carouselSection);
}

main();








  
