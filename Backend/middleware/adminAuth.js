import jwt from "jsonwebtoken";

const AdminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({
        success: false,
        message: "You are not authorized to make changes",
      });
    }
    const tokenDecode = jwt.verify(token, process.env.JWT);
    if (tokenDecode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.json({
        success: false,
        message: "You are not authorized to make changes",
      });
    }
    next();
  } catch (error) {
    res.json({
      success: false,
      message: "Error occur",
    });
  }
};

export default AdminAuth