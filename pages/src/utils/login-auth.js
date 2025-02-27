// function to authenticate user login
export async function loginAuth(username, password) {

  // endpoint for login 
  const endpoint = "http://localhost:3002/api/users/login";

  // send login data to server
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    console.log("Login response:", data);

    if (data.success) {
      return true;  
    } else {
      return false; 
    }
  } catch (error) {
    // handle error 
    console.error("Error during login:", error);
    return false;
  }
}

