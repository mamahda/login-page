export async function loginAuth(username, password) {
  console.log("Logging in with:", username, password);

  const endpoint = "http://localhost:3002/api/users/login";

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
    console.error("Error during login:", error);
    return false;
  }
}

