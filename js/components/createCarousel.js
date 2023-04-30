// const baseUrl = "https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed";
// const perPage = "&per_page=3";

// async function fetchPosts() {
//   try {
//     const response = await fetch(baseUrl + perPage);
//     const posts = await response.json();
//     console.log(posts);
//     return posts;
//   } catch (error) {
//     console.log(error);
//   }
// }

const baseUrl = "https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed";
const perPage = "&per_page=3";
const sortOrder = "&order=asc";
const sortBy = "&orderby=date";

async function fetchPosts() {
  try {
    const response = await fetch(baseUrl + perPage + sortOrder + sortBy);
    const posts = await response.json();
    console.log(posts);
    return posts;
  } catch (error) {
    console.log(error);
  }
}

function createPostHTML(image, title, subHeader, formattedDate, categoryName, altText) {
  return `<li class="card">
    <div class="carousel-img-container">
      <img src="${image}" class="carousel-image" alt="${altText}">
      <div class="carousel-img-tag">${categoryName}</div>
    </div>
    <div class="carousel-info-container">
      <div class="info-content">
        <h2 class="carousel-h2">${title}</h2>
        <p class="carousel-p">${subHeader}</p>
        <div class="dot-flex">
          <p class="carousel-date">${formattedDate}</p>
          <img src="images/wavy2.png" class="wavy">
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
    let altText = post._embedded["wp:featuredmedia"][0].alt_text;
    let title = post.title.rendered;
    let subHeader = post.excerpt.rendered.replace(/<\/?p>/g, "");
    let dateString = post.date;
    let dateObject = new Date(dateString);
    let formattedDate = dateObject.toLocaleDateString("en-GB");
    let categoryName = post._embedded["wp:term"][0][0].name;
    console.log(altText)
    console.log(categoryName)
    console.log(formattedDate);
    console.log(title);
    console.log(image);
    console.log(subHeader);
    postHTML += createPostHTML(image, title, subHeader, formattedDate, categoryName, altText);
  }
  wrapper.innerHTML = `<i id="left" class="fa-solid fa-caret-left fa-4x arrow-left"></i>
    <ul class="carousel">${postHTML}</ul>
    <i id="right" class="fa-solid fa-caret-right fa-4x"></i>`;
}

async function main() {
  const posts = await fetchPosts();
  createPostsHTML(posts);
}

main();








  
