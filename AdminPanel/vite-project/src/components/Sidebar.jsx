import React from "react";
import add_icon from "../assets/admin_assets/add_icon.png";
import order_icon from "../assets/admin_assets/order_icon.png";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[15%] fixed h-full border-r-[1px] border-gray-300">
      <div className="pt-10 flex flex-col gap-4">
        <NavLink to="/add">
          <div className="flex items-center gap-2 border-[1px] border-gray-300 p-2 cursor-pointer">
            <img className="w-[20px]" src={add_icon} alt="" />
            <p className="hidden md:block">Add Items</p>
          </div>
        </NavLink>
        <NavLink to="/list">
          <div className="flex items-center gap-2 border-[1px] border-gray-300 p-2 cursor-pointer">
            <img className="w-[20px]" src={order_icon} alt="" />
            <p className="hidden md:block">List Items</p>
          </div>
        </NavLink>

        <NavLink to="/orders">
          <div className="flex items-center gap-2 border-[1px] border-gray-300 p-2 cursor-pointer">
            <img className="w-[20px]" src={order_icon} alt="" />
            <p className="hidden md:block">Orders</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
