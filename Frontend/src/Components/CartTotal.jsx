import React, { useContext } from "react";
import Title from "./Title";
import { ShopContext } from "../Context/ShopContext";

const CartTotal = () => {
  const { totalPrice, delivery_fee,currency,navigate } = useContext(ShopContext);
  return (
    <div className="flex flex-col justify-end items-end">
      <div className="w-[50%]">
        <div className=" ">
          <div className="flex w-full">
            <Title text1="CART" text2="TOTALS" />
          </div>
          <div className="flex flex-col gap-2 mt-5">
            <div className="flex items-center justify-between border-b-[1px] pb-2">
              <p>Subtotal</p>
              <p>
                {currency}
                {totalPrice}.00
              </p>
            </div>
            <div className="flex items-center justify-between border-b-[1px] pb-2">
              <p className="">Shopping Fee</p>
              <p className="">
                {currency}
                {delivery_fee}.00
              </p>
            </div>
            <div className="flex items-center justify-between">
              <p className="">Total</p>
              <p className="">
                {currency}
                {totalPrice + delivery_fee}.00
              </p>
            </div>
          </div>
          <div onClick={()=>navigate('/place-order')} className="mt-10 place-self-end text-[14px] bg-black py-2 md:py-3 px-3 md:px-5 cursor-pointer text-white w-fit">
            <button className="uppercase">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
