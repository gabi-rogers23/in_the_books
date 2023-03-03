export const BASE_URL = "http://localhost:3000/api"

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

  export async function getAllBooks(){
    try{
        const res = await fetch(`${BASE_URL}/books`);
        const data = await res.json();

        // console.log("FETCH GET ALL BOOKS RETURNING ", data)
        return data;
    }catch(error){
        throw error;
    }
  }