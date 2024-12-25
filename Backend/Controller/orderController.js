import { redirect } from "react-router-dom";
import orderModel from "../Models/orderModel.js";
import userModel from "../Models/userModel.js";
import Flutterwave from "flutterwave-node-v3";

const placeOrder = async (req, res) => {
  const { userId, amount, address, items } = req.body;
  try {
    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    const newOrder = new orderModel(orderData);
    await newOrder.save();
    await userModel.findByIdAndUpdate(userId, { productData: {} });
    res.json({ success: true, message: "Order Placed" });
  } catch (error) {
    console.log(error.message);
  }
};
const placeOrderFlutterwave = async (req, res) => {
  const { userId, email, name } = req.body;
  // // let amount = 20;
  // // let currency = "NGN";
  // // try {
  // //   if (userId) {
  // //     const flw = new Flutterwave(
  // //       process.env.FLW_PUBLIC_KEY,
  // //       process.env.FLW_SECRET_KEY
  // //     );

  // //     const payload = {
  // //       // card_number: req.body.card_number,
  // //       // cvv: req.body.card_cvv,
  // //       // expiry_month: req.body.card_expiry_year,
  // //       // expiry_year: req.body.card_expiry_year,
  // //       currency: "NGN",
  // //       amount,
  // //       email: email,
  // //       fullname: name,

  // //       // Generate a unique transaction reference
  // //       tx_ref: "garsfg",
  // //       redirect_url: "http://localhost:5173/payment",
  // //       enckey: process.env.FLW_ENC_KEY,
  // //     };

  // //     // const payload = {
  // //     //   tx_ref: `tx-${Date.now()}`,
  // //     //   amount,
  // //     //   currency,
  // //     //   redirect_url: `http://localhost:5173/payment`,
  // //     //   customer: {
  // //     //     email,
  // //     //     name,
  // //     //   },
  // //     //   payment_options: "card, banktransfer",
  // //     // };

  // //     //Response
  // //     const response = await flw.Charge.card(payload);
  // //     if (response.status === "success") {
  // //       return res.status(200).json({ link: response.data.link });
  // //     } else {
  // //       return res.status(400).json({ error: response.message });
  // //     }
  // //   } else {
  // //     res.json({ success: false, message: "User cannot be found" });
  // //   }
  // } catch (error) {
  //   console.error("Error initiating payment:", error);
  //   res.status(500).json({ error: "Internal Server Error" });
  // }
};
const placeOrderRazorpay = async (req, res) => {};
const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
const userOrders = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    res.json({ success: false, message: "Error occur while loading orders" });
  }
};
const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    await orderModel.findByIdAndUpdate(orderId, { status });

    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export {
  placeOrder,
  placeOrderFlutterwave,
  placeOrderRazorpay,
  allOrders,
  userOrders,
  updateStatus,
};
