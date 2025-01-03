import bcrypt from "bcrypt";
import transporter from "../Config/nodemailer.js";
import authModel from "../Models/authModel.js";
import userModel from "../Models/userModel.js";

export const resetOtp = async (req, res) => {
  const { email } = req.body;
  console.log(email);
  if (!email) {
    //Checks if user exists in the User Database
    return res.json({ success: false, message: "Field cannot be blank" });
  }
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      //Checks if user exists in the Auth Database, if it doesn't, then id adds it to Auth Database
      return res.json({ success: false, message: "User doesn't exist" });
    }
    try {
      const userExist = await authModel.findOne({ email });
      const otp = String(Math.floor(100000 + Math.random() * 900000));

      if (!userExist) {
        const userAuth = new authModel({
          email,
          resetOtp: otp,
          resetExpiresAt: 4 * 60 * 1000,
        });

        await userAuth.save();

        return res.json({
          success: true,
          message: "Reset Otp sent successfully",
        });
      }

      userExist.resetOtp = otp;
      userExist.resetExpiresAt = Date.now() + 4 * 60 * 1000;
      await userExist.save();

      let info;

      try {
        const mailOptions = {
          from: `Forever Clothing Store <$(process.env.SENDER_EMAIL)>`,
          to: email,
          subject: "Reset your Forever Clothing Store Account Password",
          html: `Your otp is <b style="color:red">${otp}</b>. Reset your account using the otp and the otp is only valid for 4mins`,
        };

        info = await transporter.sendMail(mailOptions);
        res.json({
          success: true,
          message: "Reset Otp sent successfully",
          info,
        });
      } catch (error) {
        res.json({
          success: false,
          message: error.message,
          info,
        });
      }

      // res.json({ success: true, message: "Reset Otp sent successfully", info });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const verifyReset = async (req, res) => {
  const { otp } = req.body;

  if (!otp) {
    res.json({ success: false, message: "Otp field cannot be valid" });
  }

  try {
    const otpExist = await authModel.findOne({ resetOtp: otp });

    if (!otpExist) {
      return res.json({ success: false, message: "OTP is not valid" });
    }
    if (otpExist.resetOtp === "" || otp !== otpExist.resetOtp) {
      return res.json({ success: false, message: "Incorrect Otp" });
    }
    if (otpExist.resetExpiresAt < Date.now()) {
      return res.json({
        success: false,
        message: "Otp expired, request for new otp",
      });
    }
    await otpExist.save();

    res.json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
export const verifyResetPassword = async (req, res) => {
  const { email, newPassword1, newPassword2 } = req.body;
  if (!email || !newPassword1 || !newPassword2) {
    return res.json({ success: false, message: "All fields are required" });
  }
  try {
    const user = await authModel.findOne({ email });
    const userP = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    if (newPassword1 !== newPassword2) {
      return res.json({ success: false, message: "Passwords doesn't match" });
    }

    const hashNewPassword = await bcrypt.hash(newPassword1, 10);

    userP.password = hashNewPassword;
    user.resetOtp = "";
    user.resetExpiresAt = 0;
    await user.save();
    await userP.save();

    res.json({ success: true, message: "Password changed successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const resendOtp = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.json({ success: false, message: "All fields are required" });
  }
  try {
    const user = await authModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "OTP cannot be sent to this email",
      });
    }

    if (user.resetOtpExpireAt > Date.now()) {
      return res.json({
        success: false,
        message: "OTP hasn't expired",
      });
    }
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 4 * 60 * 1000;

    await user.save();

    try {
      const mailOptions = {
        from: `<$(process.env.SENDER_EMAIL)>`,
        to: user.email,
        subject: "Reset your Daloyalking Techy Account Password",
        html: `Your otp is <b style="color:red">${otp}</b>. Reset your account using the otp and the otp is only valid for 4mins`,
      };

      await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error.message);
    }

    res.json({
      success: true,
      message: "New otp has been sent to your email id",
    });
  } catch (error) {
    res.json({
      success: false,
      message: "Error occur while sending otp",
    });
  }
};
