import React, { useContext, useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import { AdminContext } from "./context/adminContext";
import Add from "./pages/Add";
import List from "./pages/List";
import Orders from "./pages/Orders";

const App = () => {
  const { token } = useContext(AdminContext);

  useEffect(() => {
    localStorage.setItem("token", token);
  }, [token]);
  return (
    <div className="w-full">
      {token ? (
        <div className="mx-[5%] md:mx-[5%] py-5 ">
          <Navbar />

          <div className="mt-[5%]">
            <div className="w-full flex items-start">
              <Sidebar />
              <div className="flex-1 absolute left-[17%] right-0">
                <Routes>
                  <Route path="/add" element={<Add />} />
                  <Route path="/list" element={<List />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default App;
