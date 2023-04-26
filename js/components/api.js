const baseUrl = "https://wordpress.tidemand-goose.no/wp-json/wp/v2/posts?_embed";
const embeded = `?_embeded`;
const url = baseUrl + embeded + `&per_page=50`;

export async function getPosts() {
  try {
    const response = await fetch(baseUrl);
    const results = await response.json();
    console.log(results);
    return results;
  } catch(error) {
    console.log(error);
  }
};
