const userKey = "user";
const tokenKey = "accessToken";

// Save token to localStorage
export function saveToken(accessToken) {
  saveToStorage(tokenKey, accessToken);
  // Log token saved to storage
  console.log("Token saved to storage:", accessToken);
}

// Get token from localStorage
export function getToken() {
  const accessToken = getFromStorage(tokenKey);
  // Retrieved token:
  console.log("Retrieved token:", accessToken);
  return accessToken;
}

// Save user data to localStorage
export function saveUser(name) {
  const existingUser = getFromStorage(userKey);

  if (existingUser) {
    const updatedUser = { ...existingUser, ...name };
    saveToStorage(userKey, updatedUser);
  } else {
    saveToStorage(userKey, name);
  }
}

// Function to retrieve user data from localStorage
const getUser = () => {
  const userData = getFromStorage(userKey);
  return userData;
};

export { getUser };

// Check if user is logged in
export const isLoggedIn = () => !!getFromStorage(userKey);

// Function to save data to localStorage
function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Function to get data from localStorage
function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}
