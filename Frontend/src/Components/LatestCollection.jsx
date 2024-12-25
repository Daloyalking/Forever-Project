import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const {products}=useContext(ShopContext)
  
    
    const [latestProduct,setLatestProduct]=useState([])
    useEffect(()=>{
        const filteredProduct=products.slice(0,10)
        setLatestProduct(filteredProduct)
    },[products])

  return (
    <div className="mx-[5%] md:mx-[10%] mt-[40px] md:mt-[80px]">
      <div className="">
        <Title text1="LATEST" text2="COLLECTIONS" />
        <p className=" w-3/4 m-auto text-center ">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus
          dolorem beatae iste officia
        </p>
      </div>
      <div className="mt-9 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {latestProduct.map((item, index) => {
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
}

export default LatestCollection