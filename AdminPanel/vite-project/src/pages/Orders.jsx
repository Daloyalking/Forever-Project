import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../context/adminContext";
import parcel_icon from "../assets/admin_assets/parcel_icon.svg";
import orderModel from "../../../../Backend/Models/orderModel";

const Orders = () => {
  const { backendUrl, token } = useContext(AdminContext);
  const [allOrders, setAllOrders] = useState([]);

  const listAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setAllOrders(response.data.orders.reverse());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const statusHandler = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/updatestatus",
        { orderId, status: e.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        listAllOrders();
      }
      // console.log(response);
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log(status);
  useEffect(() => {
    listAllOrders();
  }, [token]);

  return (
    <div className="bg-gray-100 mx-[5%] mt-[10%] md:mt-0">
      <div className=" ">
        <h2 className="mb-4 mx-5 text-[1.3rem]">Order Page</h2>
        {allOrders.map((order, index) => (
          <div className="" key={index}>
            <div className="grid grid-cols-[1fr_3fr_3fr] md:grid-cols-[1fr_3fr_3fr_1fr_1fr] gap-4 border-2  text-[9px] md:text-sm p-8">
              <img src={parcel_icon} alt="" />
              <div className="w-full">
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p key={index}>
                        {item.name}
                        {" x "}
                        {item.quantity}
                        <span className="pl-1"> {item.size}</span>
                      </p>
                    );
                  } else {
                    return (
                      <p key={index}>
                        {item.name}
                        {" x "}
                        {item.quantity}
                        <span className="pl-1">{item.size}</span>
                      </p>
                    );
                  }
                })}
                <p>
                  {order.address.firstName} {order.address.lastName}
                </p>
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}
                  {", "}
                  {order.address.state}
                  {", "}
                  {order.address.country}
                  {", "}
                  {order.address.zipcode}
                </p>
              </div>
              <div className="">
                <p>Items: {order.items.length}</p>
                <p>Method: {order.paymentMethod}</p>
                <p>Payment: {order.payment ? "Confirmed" : "Pending"}</p>
                <p>Date: {new Date(order.date).toLocaleString()}</p>
              </div>
              <p className=" col-start-2 md:col-start-auto">${order.amount}</p>
              <select
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
                className="h-8 border-2 col-start-3 md:col-start-auto"
                name=""
                id=""
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipping">Shipping</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
