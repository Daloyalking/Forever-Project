import userModel from "../Models/userModel.js";

const addProduct = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    const userData = await userModel.findById(userId);
    let cartData = await userData.productData;
    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }
    await userModel.findByIdAndUpdate(userId, { productData: cartData });

    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error.message);
  }
};
const updateProduct = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    let cartData = await userData.productData;
    cartData[itemId][size] = quantity;

    await userModel.findByIdAndUpdate(userId, { productData: cartData });
    res.json({ success: true, message: "Product updated" });
  } catch (error) {
    console.log(error.message);
  }
};
const getProduct = async (req, res) => {
  try {
    const { userId } = req.body;
    // const userId = "67533eb3b956a4fa8bc35219";
    const userData = await userModel.findById(userId);
    let cartData = await userData.productData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error.message);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;

    // Fetch user data
    const userData = await userModel.findById(userId);
    let cartData = await userData.productData;

    // Check if the product and size exist in the cart
    if (cartData[itemId] && cartData[itemId][size]) {
      // Delete the specific size
      delete cartData[itemId][size];

      // If no sizes remain for the product, remove the product from the cart
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }

      // Update the user's cart in the database
      await userModel.findByIdAndUpdate(userId, { productData: cartData });

      // Send a success response
      res.json({ success: true, message: "Product deleted from cart" });
    } else {
      // If the product or size doesn't exist, send an error response
      res.status(400).json({ success: false, message: "Product or size not found in cart" });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: "An error occurred while deleting the product" });
  }
};



export { addProduct, updateProduct, getProduct, deleteProduct };
