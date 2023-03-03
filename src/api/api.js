export const BASE_URL = "http://localhost:3000/api";

export function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
  };
  const currentToken = localStorage.getItem("auth_token");
  console.log("CURRENT TOKEN IN GET HEADERS:, ", currentToken);

  if (currentToken != null) {
    headers["Authorization"] = "Bearer " + currentToken;
  }
  console.log("Current Headers: " + JSON.stringify(headers));
  return headers;
}

export async function getAllBooks() {
  try {
    const res = await fetch(`${BASE_URL}/books`);
    const data = await res.json();

    // console.log("FETCH GET ALL BOOKS RETURNING ", data)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBookById(bookId) {
  try {
    const res = await fetch(`${BASE_URL}/books/${bookId}`);
    const data = await res.json();

    // console.log("GET BOOK BY ID SRC/API RETURNING: ", data)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getBooksByTag(tagName) {
  try {
    console.log(tagName)
    const res = await fetch(`${BASE_URL}/books/bookTag/${tagName}`);
    const data = await res.json();
    console.log("GET BOOKS BY TAG NAME SRC/API RETURNING: ", data)
    return data;
  } catch (error) {
    throw error;
  }
}

