import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
  email: { type: String, required: true },
  resetOtp: { type: String, default: "" },
  resetExpiresAt: { type: String, default: 0 },
});

const authModel = mongoose.models.auth || mongoose.model("auth", authSchema);

export default authModel;
