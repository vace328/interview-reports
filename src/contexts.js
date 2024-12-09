import { createContext } from "react";
import React, { useContext, useState } from "react";
import Header from "./components/Header/Header";


export const dataContext = createContext();
export const DataProvider = dataContext.Provider;



export const AuthContext = createContext();
export const AuthProvider = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => setIsLoggedIn(false);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logIn, logOut }}
    >
        <Header/>
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
