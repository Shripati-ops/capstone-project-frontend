import React, { useState, createContext, useContext } from "react";

const userContext = createContext({
  name: null,
  setName: (d: any) => d,

  email: null,
  setEmail: (d: any) => d,

  avatar: null,
  setAvatar: (d: any) => d,

  role: null,
  setRole: (d: any) => d,
});

export const UserContextProvider = ({ children }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [role, setRole] = useState(null);

  const contextValues = {
    name,
    setName,
    email,
    setEmail,
    avatar,
    setAvatar,
    role,
    setRole,
  };
  return (
    <userContext.Provider value={contextValues}>
      {children}
    </userContext.Provider>
  );
};

export const useUserContext = () => useContext(userContext);
