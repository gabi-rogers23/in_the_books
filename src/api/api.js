export const BASE_URL = process.env.REACT_APP_BASE_URL 
// "http://localhost:3000/api";

export function getHeaders() {
  let headers = {
    "Content-Type": "application/json",
  };
  const currentToken = localStorage.getItem("token");
  // console.log("CURRENT TOKEN IN GET HEADERS:, ", currentToken);

  if (currentToken != null) {
    headers["Authorization"] = "Bearer " + currentToken;
  }
  // console.log("Current Headers: " + JSON.stringify(headers));
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
    // console.log(tagName);
    const res = await fetch(`${BASE_URL}/books/bookTag/${tagName}`);
    const data = await res.json();
    // console.log("GET BOOKS BY TAG NAME SRC/API RETURNING: ", data)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCart() {
  try {
    const res = await fetch(`${BASE_URL}/cart`, { headers: getHeaders() });
    const data = await res.json();
    // console.log("GET CART RETURNING: ", data);
  } catch (error) {
    throw error;
  }
}

export async function fetchLogIn(userEmail, userPassword) {
  const sendData = {
    email: userEmail,
    password: userPassword,
  };

  try {
    const res = await fetch(`${BASE_URL}/users/login`, {
      headers: getHeaders(),
      method: "POST",
      body: JSON.stringify(sendData),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    // console.log("Returning from fetchLogIn: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function registerNewUser(
  newEmail,
  newPassword,
  newFirstName,
  newLastName,
  newAddress,
  newPhoneNumber
) {
  const sendData = {
    email: newEmail,
    password: newPassword,
    firstName: newFirstName,
    lastName: newLastName,
    shippingAddress: newAddress,
    phoneNumber: newPhoneNumber,
  };
  // console.log("arguments", newEmail, newPassword);
  try {
    const res = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(sendData),
    });
    const data = await res.json();
    // console.log("Returning from registerNewUser", data);

    if (data.token) {
      localStorage.setItem("token", data.token);
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchUserProfile() {
  try {
    const res = await fetch(`${BASE_URL}/users/me`, {
      headers: getHeaders(),
    });

    if (res.ok) {
      const data = await res.json();
      // console.log("fetch users/me ", data);
      return data;
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchUserCart(userId) {
  try {
    let res = null;
    if (userId) {
      res = await fetch(`${BASE_URL}/cart/${userId}`, {
        headers: getHeaders(),
      });
    } else {
      res = await fetch(`${BASE_URL}/cart/`, {
        headers: getHeaders(),
      });
    }

    const data = await res.json();
    // console.log("fetch /cart ", data);
    data.items.sort((itemOne, itemTwo) => {
      const titleOne = itemOne.title.toUpperCase();
      const titleTwo = itemTwo.title.toUpperCase();

      if (titleOne < titleTwo) {
        return -1;
      } else if (titleOne > titleTwo) {
        return 1;
      } else {
        return 0;
      }
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function addToCart({ id, quantity }) {
  // console.log("bookId", id, "quantity", quantity);
  const sendData = {
    bookId: id,
    quantity: quantity,
  };

  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(sendData),
    });

    const data = await res.json();
    // console.log("ADD CART TO ITEM: ", data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateCart({ cartItemId, quantity }) {
  try {
    // console.log(quantity);
    if (quantity >= 1) {
      const sendData = {
        cartItemId: cartItemId,
        quantity: quantity,
      };
      const res = await fetch(`${BASE_URL}/cart`, {
        method: "PATCH",
        headers: getHeaders(),
        body: JSON.stringify(sendData),
      });
      const data = await res.json();
      // console.log("UPDATE CART ITEM: ", data);
      return data;
    } else {
      await deleteCartItem(cartItemId);
    }
  } catch (error) {
    throw error;
  }
}

export async function deleteCartItem(id) {
  try {
    // console.log("DELETE", id);
    const res = await fetch(`${BASE_URL}/cart/${id}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    // console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllAuthors() {
  try {
    const res = await fetch(`${BASE_URL}/authors`);
    const data = await res.json();

    data.sort((itemOne, itemTwo) => {
      const titleOne = itemOne.authorLastName.toUpperCase();
      const titleTwo = itemTwo.authorLastName.toUpperCase();

      if (titleOne < titleTwo) {
        return -1;
      } else if (titleOne > titleTwo) {
        return 1;
      } else {
        return 0;
      }
    });
    // console.log("alpha ", data)
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createAuthor(author) {
  // console.log(author)
  try {
    const res = await fetch(`${BASE_URL}/authors`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(author),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateBook(book) {
  book.tags = book.tags.filter((tag) => tag.isSelected);
  // console.log(book);
  try {
    const res = await fetch(`${BASE_URL}/books/${book.id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(book),
    });

    if(book.tags.length){
    const tagsResponse = await fetch(`${BASE_URL}/tags/${book.id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(book),
    });
    const tagData = await tagsResponse.json();
    return tagData;
  }else{
    const data = await res.json();
    return data
  }

  } catch (error) {
    throw error;
  }
}

export async function createNewBook(book) {
  // console.log(book)
  try {
    book.tags = book.tags.filter((tag) => tag.isSelected);

    const res = await fetch(`${BASE_URL}/books`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(book),
    });

    const data = await res.json();

    await fetch(`${BASE_URL}/tags/${data.id}`, {
      method: "PATCH",
      headers: getHeaders(),
      body: JSON.stringify(book),
    });

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteBook(bookId) {
  // console.log(bookId);
  try {
    const res = await fetch(`${BASE_URL}/books/${bookId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllTags() {
  try {
    const res = await fetch(`${BASE_URL}/tags`);
    const data = await res.json();
    data.sort((itemOne, itemTwo) => {
      const titleOne = itemOne.name.toUpperCase();
      const titleTwo = itemTwo.name.toUpperCase();

      if (titleOne < titleTwo) {
        return -1;
      } else if (titleOne > titleTwo) {
        return 1;
      } else {
        return 0;
      }
    });
    return data;
  } catch (error) {
    throw error;
  }
}

export async function createNewTag(tag) {
  // console.log(tag)
  try {
    const res = await fetch(`${BASE_URL}/tags`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(tag),
    });

    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function checkoutCart(cartId) {
  try {
    const res = await fetch(`${BASE_URL}/cart/checkout/${cartId}`, {
      method: "DELETE",
      headers: getHeaders(),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllUsers() {
  try {
    const res = await fetch(`${BASE_URL}/users/all`, {
      method: "GET",
      headers: getHeaders(),
    });
    const data = await res.json();
    return data;
  } catch (error) {
    throw error;
  }
}
