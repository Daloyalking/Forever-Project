import React, { useContext, useState } from "react";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import PaymentMethod from "../Components/PaymentMethod";

import axios from "axios";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const {
    totalPrice,
    delivery_fee,
    currency,
    navigate,
    token,
    backendUrl,
    cartItems,
    setCartItems,
    products,
  } = useContext(ShopContext);

  const [placeOrderInfo, setPlaceOrderInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const orderItems = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          if (cartItems[itemId][size] > 0) {
            const itemInfo = structuredClone(
              products.find((product) => product._id === itemId)
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartItems[itemId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      const orderData = {
        items: orderItems,
        address: placeOrderInfo,
        amount: totalPrice + delivery_fee,
      };

      if (paymentMethod === "cod") {
        const response = await axios.post(
          backendUrl + "/api/order/place",
          orderData,
          { headers: { token } }
        );
        if (response.data.success) {
          setCartItems({});
          navigate("/orders");
        }
        console.log(response);
      } else if (paymentMethod === "flutter") {
        try {
          const config = {
            public_key: "FLWPUBK_TEST-12d43d3093a1b6e9e65fd423a6608446-X",
            tx_ref: Date.now(),
            amount: totalPrice + delivery_fee,
            currency: "NGN",
            payment_options: "card,mobilemoney,ussd",
            customer: {
              email: placeOrderInfo.email,
              phone_number: placeOrderInfo.phone,
              name: placeOrderInfo.firstName + placeOrderInfo.lastName,
            },
            customizations: {
              title: "my Payment Title",
              description: "Payment for items in cart",
              logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
            },
          };
          console.log("Flutter Click Detected");
          const handleFlutterPayment =await useFlutterwave(config);
          console.log(handleFlutterPayment(config));
          return handleFlutterPayment;
        } catch (error) {
          console.log(error.message);
        }
      }
      // console.log(orderItems);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="mx-[5%] md:mx-[10%] mt-[40px] md:mt-[80px]">
      <div className="flex flex-col md:flex-row gap-5 w-full items-start justify-start">
        <div className="w-full md:w-1/2 place-self-start">
          <Title justify="justify-start" text1="Delivery" text2="Information" />
          <form
            // onSubmit={onSubmitHandler}
            className="flex flex-col gap-4 mt-10"
          >
            <div className=" flex items-center gap-2">
              <input
                required
                type="text"
                placeholder="First name"
                className="border-[2px] w-[50%] p-1"
                value={placeOrderInfo.firstName}
                onChange={(e) =>
                  setPlaceOrderInfo((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }))
                }
              />
              <input
                required
                type="text"
                placeholder="Last name"
                className="border-[2px] flex-1 p-1"
                value={placeOrderInfo.lastName}
                onChange={(e) =>
                  setPlaceOrderInfo((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }))
                }
              />
            </div>
            <input
              required
              type="email"
              placeholder="Email Address"
              className="border-[2px] w-full p-1"
              name=""
              id=""
              value={placeOrderInfo.email}
              onChange={(e) =>
                setPlaceOrderInfo((prev) => ({
                  ...prev,
                  email: e.target.value,
                }))
              }
            />
            <input
              required
              className="border-[2px] w-full p-1"
              type="text"
              placeholder="Street"
              value={placeOrderInfo.street}
              onChange={(e) =>
                setPlaceOrderInfo((prev) => ({
                  ...prev,
                  street: e.target.value,
                }))
              }
            />
            <div className="w-full flex items-center gap-2">
              <input
                required
                className="border-[2px] w-[50%] p-1"
                type="text"
                placeholder="City"
                value={placeOrderInfo.city}
                onChange={(e) =>
                  setPlaceOrderInfo((prev) => ({
                    ...prev,
                    city: e.target.value,
                  }))
                }
              />
              <input
                required
                type="text"
                placeholder="State"
                className="border-[2px] flex-1 p-1"
                value={placeOrderInfo.state}
                onChange={(e) =>
                  setPlaceOrderInfo((prev) => ({
                    ...prev,
                    state: e.target.value,
                  }))
                }
              />
            </div>
            <div className="w-full flex items-center gap-2">
              <input
                required
                className="border-[2px] w-[50%] p-1"
                type="text"
                placeholder="Zipcode"
                value={placeOrderInfo.zipcode}
                onChange={(e) =>
                  setPlaceOrderInfo((prev) => ({
                    ...prev,
                    zipcode: e.target.value,
                  }))
                }
              />
              <input
                required
                className="border-[2px] flex-1 p-1"
                type="text"
                placeholder="Country"
                value={placeOrderInfo.country}
                onChange={(e) =>
                  setPlaceOrderInfo((prev) => ({
                    ...prev,
                    country: e.target.value,
                  }))
                }
              />
            </div>
            <input
              required
              className="border-[2px] w-full p-1"
              type="text"
              name=""
              placeholder="Phone"
              id=""
              value={placeOrderInfo.phone}
              onChange={(e) =>
                setPlaceOrderInfo((prev) => ({
                  ...prev,
                  phone: e.target.value,
                }))
              }
            />
          </form>
        </div>
        <div className="w-full md:flex-1 mt-10 md:mt-10">
          <div className="w-full">
            <div className="">
              <Title justify="justify-start" text1="Cart" text2="Totals" />
              <div className="flex flex-col justify-end items-end">
                <div className="w-full">
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
                    <div className="font-semibold flex items-center justify-between">
                      <p className="">Total</p>
                      <p className="">
                        {currency}
                        {totalPrice + delivery_fee}.00
                      </p>
                    </div>
                  </div>
                  <div className="">
                    <PaymentMethod
                      paymentMethod={paymentMethod}
                      setPaymentMethod={setPaymentMethod}
                    />
                  </div>
                  <div className="mt-10 place-self-end text-[14px] bg-black py-2 md:py-3 px-10 md:px-10 cursor-pointer text-white w-fit">
                    <button
                      onClick={(e) => {
                        onSubmitHandler(e);
                      }}
                      className="uppercase"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
