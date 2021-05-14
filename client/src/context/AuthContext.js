import React, { useState, useEffect, createContext } from 'react';
import auth from "../services/auth.service";

export const AuthContext = createContext();

export function AuthContextProvider (props) {
  const [loggedIn, setLoggedIn] = useState(undefined);
  const [username, setUsername] =  useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    auth.isAuth().then((data) => {
      setLoggedIn(true)
      setUsername(data.username);
      setUserId(data.id);
    }).catch(() => {
      setLoggedIn(false)
      setUsername("")
      setUserId("")
    })
  }, [])


  return (
    <AuthContext.Provider value={{
      loggedIn,
      setLoggedIn,
      username,
      setUsername,
      userId,
      setUserId,
      }}>
      {props.children}
    </AuthContext.Provider>
  )
}

