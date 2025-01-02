import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDb from "./Config/mongodb.js";
import userRouter from "./Routes/UserRoute.js";
import connectCloudinary from "./Config/cloudinary.js";
import productRouter from "./Routes/ProductRoute.js";
import cartRoute from "./Routes/cartRoute.js";
import orderRouter from "./Routes/OrderRoute.js";
import authRoute from "./Routes/authRoute.js";

// Load environment variables

//App Config
const app = express();
const port = process.env.PORT || 4000;
connectDb();
connectCloudinary();

//Middleware
app.use(express.json());
app.use(cors());

//Api Endpoint
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRouter);
app.use("/api/auth",authRoute)

app.get("/", (req, res) => {
  res.send("Server is working");
});


app.listen(port, () => console.log(`Server started on port ${port}`));
