const baseUrl = "https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed";

export async function getPosts() {
try {
const response = await fetch(baseUrl);

const posts = await response.json();

return posts;

} catch(error) {

console.log(error);

}
};



