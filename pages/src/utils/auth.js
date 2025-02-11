export async function loginAuth(username, password) {
  console.log("Logging in with:", username, password);

  const endpoint = "http://localhost:3002/api/users";

  try {
    // Fetch users
    const response = await fetch(endpoint);
    const users = await response.json();

    console.log("Fetched users:", users);
    if (Array.isArray(users.data)) {
      const userExists = users.data.some(user => user.username === username && user.password === password);
      console.log("User exists:", userExists);
      return userExists;
    } else {
      console.error("Users data is not an array:", users.data);
      return false;
    }
  } catch (error) {
    console.error("Error fetching users:", error);
    return false;
  }
}

