const userKey = "user";
const tokenKey = "accessToken";

export function saveToken(accessToken) {
  saveToStorage(tokenKey, accessToken);
}

export function getToken() {
  const accessToken = getFromStorage(tokenKey);

  return accessToken;
}

export function saveUser(name) {
  const existingUser = getFromStorage(userKey);

  if (existingUser) {
    const updatedUser = { ...existingUser, ...name };
    saveToStorage(userKey, updatedUser);
  } else {
    saveToStorage(userKey, name);
  }
}

const getUser = () => {
  const userData = getFromStorage(userKey);
  return userData;
};

export { getUser };

export const isLoggedIn = () => !!getToken();

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key) {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error(`Error parsing storage item ${key}:`, e);
    return null;
  }
}

export const clearStorage = () => {
  localStorage.clear();
};
