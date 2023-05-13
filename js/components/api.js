// const baseUrl = "https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed";

// export async function getPosts() {
// try {
// const response = await fetch(baseUrl);

// const posts = await response.json();

// return posts;

// } catch(error) {

// console.log(error);

// }
// };

// export async function getPosts(perPage = 10) {
  
//   const baseUrl = `https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed&per_page=${perPage}`;

//   try {
//     const response = await fetch(baseUrl);
//     const posts = await response.json();

//     return posts;

//   } catch(error) {
//     console.log(error);
//   }
// };

// export async function getPosts(numberPost, startIndex = 0) {
   
//   const perPage = `per_page=${numberPost}&offset=${startIndex}`;
//   const baseUrl = `https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed&${perPage}`;

//   try {
//     const response = await fetch(baseUrl);
//     const posts = await response.json();

//     return posts;

//   } catch(error) {
//     console.log(error);
//   }
// };


export async function getPosts(numberPost = 1, startIndex = 0) {
  const perPage = `per_page=${numberPost}&offset=${startIndex}`;
  const baseUrl = `https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed&${perPage}`;

  try {

    const response = await fetch(baseUrl);
    const posts = await response.json();
   
    return posts;
  } catch (error) {
    console.log(error);
  }
}



