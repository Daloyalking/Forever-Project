import React, { useContext, useEffect, useState } from "react";
import cross_icon from "../assets/frontend_assets/cross_icon.png";
import search_icon from "../assets/frontend_assets/search_icon.png";
import { ShopContext } from "../Context/ShopContext";
import { useLocation } from "react-router-dom";

const Search = () => {
  const { setOpenSearch, setSearchText } = useContext(ShopContext);

  

  return (
    <div className="mx-[5%] md:mx-[10%]">
      <div className=" bg-slate-200/15 border-t-[2px] border-b-[2px] w-full p-8">
        <div className="flex items-center gap-3 justify-center">
          <div className="flex border-[1px] border-gray-400 items-center w-[500px] rounded-full ">
            <input
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search"
              className="outline-none pl-6 p-2 w-full rounded-full bg-inherit"
              type="text"
            />
            <img className="w-5 mr-4" src={search_icon} alt="" />
          </div>
          <img
            onClick={() => setOpenSearch(false)}
            className="w-5 cursor-pointer"
            src={cross_icon}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
