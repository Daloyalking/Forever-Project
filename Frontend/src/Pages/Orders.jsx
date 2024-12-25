import React, { useContext, useEffect, useState } from "react";
import Title from "../Components/Title";
import { ShopContext } from "../Context/ShopContext";
import axios from "axios";

const Orders = () => {
  const { currency, token, backendUrl } = useContext(ShopContext);
  const [OrdersCollection, setOrdersCollection] = useState([]);

  const ordersHandler = async () => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        {
          headers: { token },
        }
      );
      if (response.data.success) {
        let allOrders = [];
        response.data.orders.map((order) =>
          order.items.map((item) => {
            item.status = order.status;
            item.paymentMethod = order.paymentMethod;
            item.payment = order.payment;
            item.date = order.date;
            allOrders.push(item);
          })
        );
        setOrdersCollection(allOrders);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    ordersHandler();
  }, [token]);

  return (
    <div className="mx-[5%] md:mx-[10%] mt-[40px] md:mt-[80px]">
      <div className="">
        <Title text1="MY" text2="Orders" justify="justify-start" />
        <div className=" mt-6">
          {OrdersCollection.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between border-t-[2px] border-b-[1px] overflow-hidden"
            >
              <div className="w-[60%] flex items-center gap-4 py-4 ">
                <img className=" w-14 md:w-20" src={item?.image[0]} alt="" />
                <div className="flex flex-col gap-1 text-[10px] md:text-[16px]">
                  <p className="font-[500] ">{item?.name}</p>
                  <p className="flex items-center gap-2">
                    {currency}
                    {item?.price} <span>Quantity: {item.quantity}</span>
                    <span>Size: {item?.size}</span>
                  </p>
                  <p>
                    Date:{" "}
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p>
                    Payment{" "}
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>
              <div className="flex-1 text-[10px] md:text-[16px] flex items-center gap-2">
                <p className="w-3 h-3 rounded-full bg-green-500"></p>
                <p className="">{item.status}</p>
              </div>
              <div className="flex-1 w-fit  text-[10px] md:text-[16px]">
                <p className="px-1 py-1 border-[1px] text-center">
                  Track Order
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
