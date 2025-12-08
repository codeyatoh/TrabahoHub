import React, { useEffect, useState, createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { mockUsers } from '../services/mockData';

// User Context
// Manages user authentication state and provides user data throughout the app
// Simulates login/logout without backend

const UserContext = createContext(undefined);

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('trabahohub_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - find user by email and password
    const user = mockUsers.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('trabahohub_user', JSON.stringify(user));
      return user;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('trabahohub_user');
  };

  const signup = (name, email, password, role) => {
    // Check if email already exists
    const existingUser = mockUsers.find((u) => u.email === email);
    if (existingUser) {
      return false;
    }
    // Create new user
    const newUser = {
      id: `${role}-${Date.now()}`,
      name,
      email,
      role,
      memberSince: new Date().toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      }),
      location: 'Philippines',
      completedJobs: 0,
      rating: 0,
    };
    // Add to mock users
    mockUsers.push(newUser);
    // Auto-login after signup
    setCurrentUser(newUser);
    localStorage.setItem('trabahohub_user', JSON.stringify(newUser));
    return true;
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        login,
        logout,
        signup,
        isAuthenticated: !!currentUser,
        isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
