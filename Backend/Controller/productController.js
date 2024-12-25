import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../Models/productModel.js";

const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      size,
      bestSeller,
    } = req.body;

    if (!name || !description || !price || !category || !subCategory || !size) {
      return res.json({ message: "All fields are required" });
    }

    let parsedSize;
    try {
      parsedSize = JSON.parse(size);
    } catch (error) {
      console.error("Error parsing size:", error);
      return res.status(400).json({ message: "Invalid size format" });
    }

    let image1 = req.files.image1 && req.files.image1[0];
    let image2 = req.files.image2 && req.files.image2[0];
    let image3 = req.files.image3 && req.files.image3[0];
    let image4 = req.files.image4 && req.files.image4[0];

    let images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    let imageUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      size: parsedSize,
      bestSeller: bestSeller === "true" ? true : false,
      date: Date.now(),
      image: imageUrl,
    };
    let product = new ProductModel(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully" });
  } catch (error) {}
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.body.id;
    const exist = await ProductModel.findOne({ _id: productId });
    if (!exist) {
      return res.json({ success: false, message: "Product cannot be found" });
    }
    await ProductModel.findOneAndDelete({ _id: productId });
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: "Error occur while removing the product",
    });
  }
};
const displayAllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({
      success: false,
      message: "Error occur while displaying all products",
    });
  }
};

const singleProduct = async (req, res) => {
  try {
    const { id } = req.body;

    const product = await ProductModel.find({ _id: id });
    res.json({ success: true, product });
  } catch (error) {
    res.json({
      success: false,
      message: "Error occur while fetching the product",
    });
  }
};

export { addProduct, deleteProduct, displayAllProduct, singleProduct };
