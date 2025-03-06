export async function addNewPost(options, BASE_URL) {
  try {
    const response = await fetch(`${BASE_URL}`, options);
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
