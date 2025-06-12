import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const AuthContext = createContext();

const TOKEN_KEY = 'user_token';
const USER_KEY = 'user_data';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const setSecureItem = async (key, value) => {
    if (Platform.OS === 'web') {
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  };

  const getSecureItem = async (key) => {
    if (Platform.OS === 'web') {
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  };

  const deleteSecureItem = async (key) => {
    if (Platform.OS === 'web') {
      localStorage.removeItem(key);
    } else {
      await SecureStore.deleteItemAsync(key);
    }
  };

  useEffect(() => {
    loadStoredUser();
  }, []);

  const loadStoredUser = async () => {
    try {
      const token = await getSecureItem(TOKEN_KEY);
      const userData = await getSecureItem(USER_KEY);
      if (token && userData) {
        setUser(JSON.parse(userData));
      }
    } catch (err) {
      console.error('Error loading stored user:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('https://nearbyrooms.in/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      if (data.token) {
        await setSecureItem(TOKEN_KEY, data.token);
      }

      
      const userData = {
        id: data.user?.id || data.id || email,
        email: data.user?.username || email,  
        name: data.user?.name || data.name || '',
      };

      await setSecureItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      setError(err.message || 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email, password, firstName, lastName) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('https://nearbyrooms.in/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        username: email,     // required by backend
        password: password,
        firstName: firstName,
        lastName: lastName,
      }),
      });

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
          const text = await response.text(); // Read raw response
          throw new Error('Server error: ' + text.slice(0, 100)); // Log first 100 chars
    }


      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      if (data.token) {
        await setSecureItem(TOKEN_KEY, data.token);
      }

      const userData = {
         id: data.user?.id || data.id || email,
         email: data.user?.username || email,
         firstName: data.user?.firstName || data.firstName || '',
         lastName: data.user?.lastName || data.lastName || '',
         name: `${data.user?.firstName || data.firstName || ''} ${data.user?.lastName || data.lastName || ''}`.trim(),
      }; 

      await setSecureItem(USER_KEY, JSON.stringify(userData));
      setUser(userData);
    } catch (err) {
      setError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await deleteSecureItem(TOKEN_KEY);
      await deleteSecureItem(USER_KEY);
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        error,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
