import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT);
};

const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  const exist = await userModel.findOne({ email });
  if (exist) {
    return res.json({
      message: "User already exist",
      success: false,
    });
  }
  if (!validator.isEmail(email)) {
    return res.json({
      message: "Email is incorrect",
      success: false,
    });
  }
  if (password.length < 8) {
    return res.json({
      message: "Password is too short",
      success: false,
    });
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const newuser = new userModel({
    name,
    email,
    password: hashPassword,
  });
  const user = await newuser.save();

  const token = createToken(user._id);
  res.json({ success: true, token: token });
};

//Login Section
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = createToken(user._id);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }
  } catch (error) {
    res.json({ success: false, message: "Error occur while logging in" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT);
      return res.json({ success: true, token });
    } else {
      return res.json({ success: false, message: "Invalid Credentials" });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Error occur while logging in to the admin panel",
    });
  }
};

export { signUp, login, adminLogin };
