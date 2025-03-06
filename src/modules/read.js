export async function renderPosts(BASE_URL) {
  try {
    const response = await fetch(`${BASE_URL}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}

export async function searchPost(BASE_URL, postName) {
  try {
    const response = await fetch(`${BASE_URL}?title="${postName}"`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
