import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  const backendurl = "https://miniauth-zeta.vercel.app";
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;

  const value = {
    backendurl,
    navigate,

    loading,
    setLoading,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export default AuthContextProvider;
