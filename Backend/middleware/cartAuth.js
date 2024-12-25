import jwt from "jsonwebtoken";

const CartAuth = async (req, res, next) => {
  const { token } = req.headers;
  console.log(token);
  if (!token) {
    return res.json({
      success: false,
      message: "You aren't authorized to add items to carts",
    });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT);
    
    req.body.userId = tokenDecode.id;

    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default CartAuth;
