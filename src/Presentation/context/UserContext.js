import React, { createContext, useState, useEffect } from "react";
import {
  saveUserSession,
  getUserSession,
  clearUserSession,
} from "../../Data/sources/local/Storage";

export const userInitialState = {
  id: "",
  correo: "",
  telefono: "",
  contrasena: "",
  confirmContrasena: "",
  imagen: "",
  session_token: "",
  roles: [],
};

export const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(userInitialState);

  useEffect(() => {
    getUserSessionContext();
  }, []);

  const saveUserSessionContext = async (user) => {
    await saveUserSession(user);
    setUser(user);
  };

  const getUserSessionContext = async () => {
    const user = await getUserSession();
    setUser(user);
  };

  const removeUserSessionContext = async () => {
    await clearUserSession();
    setUser(userInitialState);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        saveUserSessionContext,
        getUserSessionContext,
        removeUserSessionContext,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
