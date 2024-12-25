import React, { useContext } from "react";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../assets/frontend_assets/dropdown_icon.png";

const FilterCollection = () => {
  const {
    showFilter,
    setShowFilter,
    toggleCategories,
    togglesubCategories,
  } = useContext(ShopContext);
  return (
    <div className="w-full md:w-[30%]">
      <h2
        onClick={() => setShowFilter(!showFilter)}
        className="font-[400] mb-4 text-2xl flex items-center gap-2 "
      >
        FILTER{" "}
        <img
          className={`w-2 block md:hidden ${showFilter ? "rotate-90" : ""}`}
          src={dropdown_icon}
          alt=""
        />
      </h2>
      <div className={`${showFilter ? "block" : "hidden md:block"}`}>
        <div className="md:w-[80%] p-5 border-[1px] mb-5">
          <p className="uppercase font-[450] pb-3">Categories</p>
          <div className="flex flex-col gap-1 font-light text-gray-600">
            <p className="flex items-center gap-2">
              <input
                onChange={toggleCategories}
                type="checkbox"
                value="Men"
                name=""
                id=""
              />
              Men
            </p>
            <p className="flex items-center gap-2">
              <input
                onChange={toggleCategories}
                type="checkbox"
                value="Women"
                name=""
                id=""
              />
              Women
            </p>
            <p className="flex items-center gap-2">
              <input
                onChange={toggleCategories}
                type="checkbox"
                value="Kids"
                name=""
                id=""
              />
              Kids
            </p>
          </div>
        </div>

        {/* SubCategories */}
        <div className="md:w-[80%] p-5 border-[1px]">
          <p className="uppercase font-[450] pb-3">TYPE</p>
          <div className="flex flex-col gap-1 font-light text-gray-600">
            <p className="flex items-center gap-2">
              <input
                onChange={togglesubCategories}
                type="checkbox"
                value="Topwear"
                name=""
                id=""
              />
              Topwear
            </p>
            <p className="flex items-center gap-2">
              <input
                onChange={togglesubCategories}
                type="checkbox"
                value="Bottomwear"
                name=""
                id=""
              />
              Bottomwear
            </p>
            <p className="flex items-center gap-2">
              <input
                onChange={togglesubCategories}
                type="checkbox"
                value="Winterwear"
                name=""
                id=""
              />
              Winterwear
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCollection;
