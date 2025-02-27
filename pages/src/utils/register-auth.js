// function to register a new user
export async function registerAuth(username, email, password, setMessage) {

  // endpoint for register
  const endpoint = "http://localhost:3002/api/users/register";

  // send register data to server
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    setMessage(data.message);

    if (data.success) {
      return true;
    }
    else {
      return false;
    }
  } catch (error) {
    // handle error
    console.error("Error registering user:", error);
    return false;
  }
};
