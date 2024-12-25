import React, { useState } from "react";
import Title from "./Title";
import razorpay from "../assets/frontend_assets/razorpay_logo.png";
import stripe from "../assets/frontend_assets/stripe_logo.png";

const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {
  console.log(paymentMethod);
  return (
    <div>
      <div className="mt-10">
        <div className="">
          <Title
            text1="Payment"
            text2="Method"
            size="text-[1.2rem]"
            justify="justify-start"
          />
          <div className="mt-5 flex flex-col md:flex-row gap-3">
            <div
              onClick={() => setPaymentMethod("flutter")}
              className={`flex items-center gap-2 w-full md:max-w-[40%] py-3 md:py-1 px-4 border-[1px]  cursor-pointer`}
            >
              <p
                className={`p-[7px] rounded-full border border-black/20 ${
                  paymentMethod === "flutter" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="uppercase">FlutterWave</p>
            </div>
            <div
              onClick={() => setPaymentMethod("razor")}
              className={`flex items-center gap-2 w-full md:max-w-[40%] py-3 md:py-1 px-4 border-[1px] cursor-pointer`}
            >
              <p
                className={`p-[7px] rounded-full border border-black/20 ${
                  paymentMethod === "razor" ? "bg-green-500" : ""
                }`}
              ></p>
              <img src={razorpay} className="w-[100px]" alt="razorpay logo" />
            </div>
            <div
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center gap-2 w-full md:max-w-[40%] py-3 md:py-1 px-4 border-[1px]  cursor-pointer`}
            >
              <p
                className={`p-[7px] rounded-full border border-black/20 ${
                  paymentMethod === "cod" ? "bg-green-500" : ""
                }`}
              ></p>
              <p className="uppercase">Cash on Delivery</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethod;
