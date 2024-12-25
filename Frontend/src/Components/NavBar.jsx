import React, { useContext, useState } from "react";
import logo_image from "../assets/frontend_assets/logo.png";
import search_icon from "../assets/frontend_assets/search_icon.png";
import profile_icon from "../assets/frontend_assets/profile_icon.png";
import cart_icon from "../assets/frontend_assets/cart_icon.png";
import menu_icon from "../assets/frontend_assets/menu_icon.png";
import dropdown_icon from "../assets/frontend_assets/dropdown_icon.png";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const NavBar = () => {
  const [menu, setMenu] = useState(false);
  const {
    setOpenSearch,
    cartTotalCount,
    token,
    setToken,
    navigate,
    setCartItems,
  } = useContext(ShopContext);
  const Logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };
  return (
    <div className="">
      <div className="mx-[5%] md:mx-[10%] my-4 border-b-[1px] pb-2">
        <div className=" flex items-center justify-between">
          <Link to="/">
            <img src={logo_image} className="w-[80px] md:w-[150px]" alt="" />
          </Link>
          <div className=" list-none hidden md:flex gap-4 text-[1rem] uppercase ">
            <NavLink className="flex flex-col items-center" to="/">
              <p>Home</p>
              <hr className="hidden w-2/4 h-[2px] bg-gray-400" />
            </NavLink>
            <NavLink className="flex flex-col items-center" to="/collection">
              <p>Collection</p>
              <hr className="hidden w-2/4 h-[2px] bg-gray-400" />
            </NavLink>
            <NavLink className="flex flex-col items-center" to="/about">
              <p>About</p>
              <hr className="hidden w-2/4 h-[2px] bg-gray-400" />
            </NavLink>
            <NavLink className="flex flex-col items-center" to="/contact">
              <p>Contact</p>
              <hr className="hidden w-2/4 h-[2px] bg-gray-400" />
            </NavLink>
          </div>
          <div className="flex items-center gap-4">
            <img
              onClick={() => setOpenSearch(true)}
              src={search_icon}
              className="w-5 cursor-pointer"
              alt=""
            />
            
              <div className="group relative">
                <img onClick={()=>token?null:navigate('/login')} src={profile_icon} className="w-5 cursor-pointer" alt="" />
                {token && (
                  <div className="group-hover:block transition-all duration-300 hidden absolute text-center top-[25px] bg-slate-100 left-[-80px]  w-[100px] pl-auto pt-[80%] text-gray-800/70 h-[100px] rounded-md">
                    <p
                      onClick={() => navigate("/orders")}
                      className="cursor-pointer hover:text-black"
                    >
                      Order
                    </p>
                    <p
                      onClick={Logout}
                      className="cursor-pointer hover:text-black"
                    >
                      Logout
                    </p>
                  </div>
                )}
              </div>
            
            <Link to="/cart">
              <div className="relative">
                <img src={cart_icon} className="w-5 cursor-pointer" alt="" />
                <p className="absolute top-2 right-[-5px] bg-black text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full ">
                  {cartTotalCount()}
                </p>
              </div>
            </Link>

            {/* Menu Section */}
            <img
              onClick={() => setMenu(true)}
              src={menu_icon}
              className="block md:hidden w-5"
              alt=""
            />
            <div
              className={`bg-slate-100 duration-300 transition-all cursor-pointer overflow-hidden absolute  left-0 bottom-0 h-full ${
                menu ? "w-full" : "w-0"
              }`}
            >
              <div className="flex flex-col items-start justify-center">
                <div
                  className="flex items-center justify-center text-[1rem] md:text-2xl gap-1"
                  onClick={() => setMenu(false)}
                >
                  <img
                    src={dropdown_icon}
                    className="mt-3 ml-3 rotate-180"
                    alt=""
                  />
                  <p className="mt-3">Back</p>
                </div>
                <NavLink
                  onClick={() => setMenu(false)}
                  className="pl-4 border-b-2 w-full py-4 mt-4"
                  to="/"
                >
                  Home
                </NavLink>
                <NavLink
                  onClick={() => setMenu(false)}
                  className="pl-4 border-b-2 w-full py-4"
                  to="/collection"
                >
                  Collection
                </NavLink>
                <NavLink
                  onClick={() => setMenu(false)}
                  className="pl-4 border-b-2 w-full py-4"
                  to="/about"
                >
                  About
                </NavLink>
                <NavLink
                  onClick={() => setMenu(false)}
                  className="pl-4 border-b-2 w-full py-4"
                  to="/contact"
                >
                  Contact
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
