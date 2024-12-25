import React, { useContext, useEffect, useState } from "react";
import Title from "./Title";
import { ShopContext } from "../Context/ShopContext";
import ProductItem from "./ProductItem";

const BestSelllers = () => {
    const {products}=useContext(ShopContext)
    const [bestSeller,setBestSeller]=useState([])
    
    useEffect(()=>{
        const filteredProduct = products.filter((item) => item.bestSeller).slice(0,5);
        setBestSeller(filteredProduct)
    },[products])
  return (
    <div className="mx-[5%] mt-[40px] md:mt-[80px] md:mx-[10%]">
      <div className="">
        <Title text1="BEST" text2="SELLERS" />
        <p className="w-3/4 m-auto text-center">
          Check out for our best selling dresses which ranges from men,women and
          kids.
        </p>
      </div>
      <div className="mt-9 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {bestSeller.map((item, index) => {
          return (
            <ProductItem
              key={index}
              name={item.name}
              price={item.price}
              image={item.image}
              id={item._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default BestSelllers;
