import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import bin_icon from "../assets/frontend_assets/bin_icon.png";
import CartTotal from "../Components/CartTotal";

const Cart = () => {
  const { products, cartItems, currency, deleteCartItem, updateQuantity } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  //  e.target.value === '' || e.target.value === 0
  //                         ? ''
  //                         : updateQuantity(
  //                             item._id,
  //                             item.size,
  //                             Number(e.target.value)
  //                           )

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            tempData.push({
              _id: itemId,
              size: size,
              quantity: cartItems[itemId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems]);

  return (
    <div className="mx-[5%] md:mx-[10%] mt-[40px] md:mt-[80px] overflow-hidden">
      <div className="">
        <div className="flex">
          <Title text1="YOUR" text2="CART" />
        </div>
        {Object.keys(cartItems).length > 0 ? (
          <div className="mt-5">
            {cartData.map((item, index) => {
              const productData = products.find((pro) => item._id === pro._id);
              return (
                <div
                  key={index}
                  className="p-4 flex justify-between items-center border-t border-b"
                >
                  <div className="flex gap-6">
                    <img src={productData.image[0]} className="w-20" alt="" />
                    <div className="flex flex-col gap-3">
                      <p className="font-[500] text-[1rem] md:text-[1.2rem]">
                        {productData.name}
                      </p>
                      <div className="flex items-center gap-6">
                        <p>
                          {currency}
                          {productData.price}
                        </p>
                        <p className="bg-gray-500/20 px-3 py-1">{item.size}</p>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <input
                      className="w-20 border-[2px] px-2"
                      min={1}
                      value={item.quantity}
                      onChange={(e) => {
                        const newQuantity = Number(e.target.value);
                        // Ensure quantity is not negative
                        if (newQuantity >= 0) {
                          updateQuantity(item._id, item.size, newQuantity);
                        }
                      }}
                      type="number"
                      name=""
                      id=""
                    />
                  </div>
                  <img
                    onClick={() => deleteCartItem(item._id, item.size)}
                    className="w-5 cursor-pointer"
                    src={bin_icon}
                    alt=""
                  />
                </div>
              );
            })}
            <div className="mt-20">
              <CartTotal />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center mt-10">
            <p className="text-[1rem] border-[1px] border-red-500 border-dotted md:text-[1.5rem] bg-gray-300/20 p-4 italic text-red-500">
              Your Cart is Empty, Try Adding Item(s) to Your Cart{" "}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
