export async function updatePost(BASE_URL, id, options) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
