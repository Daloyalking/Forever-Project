import { createContext, useState } from "react";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : ""
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const backendUrl = "http://localhost:4000";

  let value = {
    email,
    setEmail,
    password,
    setPassword,
    backendUrl,
    token,
    setToken,
  };
  return (
    <AdminContext.Provider value={value}>{children}</AdminContext.Provider>
  );
};

export default AdminContextProvider;
