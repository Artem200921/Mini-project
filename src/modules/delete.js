export async function deletePost(BASE_URL, id) {
  try {
    const response = await fetch(`${BASE_URL}/${id}`, {
      method: 'DELETE'
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
}
