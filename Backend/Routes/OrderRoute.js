import express from "express";
import {
  allOrders,
  placeOrder,
  placeOrderFlutterwave,
  placeOrderRazorpay,
  updateStatus,
  userOrders,
} from "../Controller/orderController.js";
import CartAuth from "../middleware/cartAuth.js";
import AdminAuth from "../middleware/adminAuth.js";

const orderRouter = express.Router();

orderRouter.post("/place", CartAuth, placeOrder);
orderRouter.post("/flutter", CartAuth, placeOrderFlutterwave);
orderRouter.post("/razorpay", CartAuth, placeOrderRazorpay);
orderRouter.post("/list", AdminAuth, allOrders);
orderRouter.post("/userorders", CartAuth, userOrders);
orderRouter.post("/updatestatus", AdminAuth, updateStatus);

export default orderRouter;
