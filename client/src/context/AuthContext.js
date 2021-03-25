import React, { useState, useEffect, createContext } from 'react';
import auth from "../services/auth.service";

export const AuthContext = createContext();

const API_URL = "/api/users/";


export function AuthContextProvider (props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [user, setUser] =  useState('');

  useEffect(() => {
    auth.isAuth().then((data) => {
      setLoggedIn(data)
    })
  }, [])

  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn, user, setUser}}>
      {props.children}
    </AuthContext.Provider>
  )
}

