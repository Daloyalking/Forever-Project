import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  updateProduct,
} from "../Controller/cartController.js";
import CartAuth from "../middleware/cartAuth.js";

const cartRoute = express.Router();

cartRoute.post("/add", CartAuth, addProduct);
cartRoute.post("/update", CartAuth, updateProduct);
cartRoute.post("/delete", CartAuth, deleteProduct);
cartRoute.get("/get", CartAuth, getProduct);

export default cartRoute;
