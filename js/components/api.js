const baseUrl = "https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed&per_page=50";

async function getPosts() {
try {
const response = await fetch(baseUrl);
const posts = await response.json();
console.log(posts);
return posts;
} catch(error) {
console.log(error);
}
};

function createPostHTML(post) {


const card = document.querySelector('.card');
card.id = post.id;
console.log(card)

const imgContainer = document.querySelector(".carousel-img-container");

const img = document.createElement('img');
img.classList.add(".carousel-image");
img.setAttribute("src", post._embedded['wp:featuredmedia']['0'].source_url);
img.setAttribute("alt", post._embedded['wp:featuredmedia']['0'].alt_text);

const imgTag = document.createElement('div');
imgTag.classList.add('carousel-img-tag');
imgTag.textContent = post._embedded["wp:term"][0][0].name;

const infoContainer = document.querySelector(".carousel-info-container");

const infoContent = document.querySelector(".info-content");

const cardTitle = document.createElement("h2");
cardTitle.classList.add("carousel-h2");
cardTitle.innerHTML = post.title.rendered;
console.log(cardTitle)

const cardSubHeader = document.createElement("p");
cardSubHeader.classList.add("carousel-p");
cardSubHeader.innerHTML = post.excerpt.rendered.replace(/<\/?p>/g, "");

const dotFlex = document.createElement("div");
dotFlex.classList.add("dot-flex");

const date = document.createElement("p");
date.classList.add('carousel-date');
const dateString = post.date;
const dateObject = new Date(dateString);
const formattedDate = dateObject.toLocaleDateString("en-GB");
date.textContent = formattedDate;

const dotGroup = document.createElement('div');
dotGroup.classList.add('dot-group');

const dot1 = document.createElement('div');
dot1.classList.add('dot');

const dot2 = document.createElement('div');
dot2.classList.add('dot');

const dot3 = document.createElement('div');
dot3.classList.add('dot');

const dots = [dot1, dot2, dot3];
dots.forEach((dot, i) => {
if (i === 0) {
dot.classList.add('dot-active');
}
dotGroup.append(dot);
});


imgContainer.append(img);
imgContainer.append(imgTag);
infoContainer.append(infoContent);
infoContent.append(cardTitle);
infoContent.append(cardSubHeader);
infoContent.append(dotFlex);
dotFlex.append(date);
dotFlex.append(dotGroup);

}

function createPostsHTML(posts){;
for(let i=0; i < posts.length; i++) {
const post = posts[i];
createPostHTML(post);
}
}

async function main() {
const posts = await getPosts();
createPostsHTML(posts);
}

main();


