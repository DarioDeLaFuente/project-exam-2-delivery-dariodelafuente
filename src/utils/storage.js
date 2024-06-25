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

export const isLoggedIn = () => !!getFromStorage(userKey);

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
}
