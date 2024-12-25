import React, { useContext } from "react";
import logo from "../assets/admin_assets/logo.png";
import { AdminContext } from "../context/adminContext";

const Navbar = () => {
  const { setToken } = useContext(AdminContext);
  return (
    <div className="mx-[5%] md:mx-[5%] py-5 fixed top-0 left-0 right-0">
      <div className="flex items-center justify-between border-b-[1px]">
        <img className="w-[20%] md:w-[10%]" src={logo} alt="" />
        <button
          onClick={() => setToken("")}
          className="text-[12px] md:text-[16px] px-4 py-2 bg-gray-700 rounded-full text-white"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
