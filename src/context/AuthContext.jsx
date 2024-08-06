import React, { createContext, useContext, useState, useEffect } from 'react';
import { getToken, saveToken, saveUser, getUser, clearStorage } from '../utils/storage';
import { useNavigate } from 'react-router-dom';
import { LOGIN_URL } from '../constants/apiUrl';
import fetchProfile from '../components/profiles/fetchProfile';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(getUser());

  const login = async (email, password) => {
    const response = await fetch(LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      saveToken(data.accessToken);
      const profileData = await fetchProfile(data.name, data.accessToken);
      saveUser(profileData);
      setUser(profileData);
    } else {
      throw new Error('Invalid email or password');
    }
  };

  const logout = () => {
    clearStorage();
    setUser(null);
  };

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
