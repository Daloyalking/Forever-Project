import express from "express";
import {
  addProduct,
  deleteProduct,
  displayAllProduct,
  singleProduct,
} from "../Controller/productController.js";
import upload from "../middleware/multer.js";
import AdminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  AdminAuth,
  addProduct
);
productRouter.post("/deleteproduct", AdminAuth, deleteProduct);
productRouter.post("/single", singleProduct);
productRouter.get("/allproducts", displayAllProduct);

export default productRouter;
