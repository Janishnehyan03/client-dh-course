'use client'
import { createContext,useState } from "react";

const UserContext=createContext()
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Perform your login logic here and set the user state
    setUser(userData);
  };

  const logout = () => {
    // Perform your logout logic here and reset the user state
    setUser(null);
  };

  // Make sure to pass the context value to the Provider
  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export { UserProvider, UserContext };
