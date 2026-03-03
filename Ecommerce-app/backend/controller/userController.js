import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { successResponse, errorResponse } from "../utils/apiResponse.js";
import User from "../models/userModel.js";
import SendVerifyEmail from "../mailer/emailVerify.js";

export const userSignup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return errorResponse(res, 400, "fields required");
    }
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return errorResponse(res, 400, "Email already exist");
    }
    bcrypt.hash(password, 9, (err, hashPassword) => {
      if (err) {
        return errorResponse(res, 400, "hashing error");
      }
      const newUser = new User({
        name,
        email,
        password: hashPassword,
        role: "user",
      });

      newUser.save();
    });
    successResponse(res, "User Created Successfuly");
  } catch (error) {
    errorResponse(res, 500, "Signup failed");
  }
};
export const signInGoogle = async (req, res) => {
  try {
    const { name, email, photo } = req.body;

    if (!name || !email || !photo) {
      return res.json({ msg: "fields are required" });
    }
    const existingUser = User.findOne({ email });
    if (existingUser) {
      return res.json({ msg: "Login Successful" });
    }
    const newUser = new User({
      name,
      email,
      photo,
      role: "user",
    });
    await newUser.save();
    return res.json({ msg: "User Created Successfuly" });
  } catch (error) {
    return res.json({ msg: "  internal server error" });
  }
};
export const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return errorResponse(res, 400, "fields are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 400, "Enter correct Email");
    }

    const PasswordMatch = await bcrypt.compare(password, user.password);
    if (!PasswordMatch) {
      return errorResponse(res, 400, "Email And Password Not matche");
    }
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      `${process.env.JWT_SECRET}`,
      { expiresIn: "24h" }
    );

    return successResponse(res, "Login successful", { token, user });
  } catch (error) {
    return errorResponse(res, 500, " internal server error");
  }
};
export const verifyEmail = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return errorResponse(res, 400, "fields are required");
    }
    const Code = Math.floor(1000 + Math.random() * 9000);
    const user = await User.findOne({ email });
    if (!user) {
      errorResponse(res, 400, "Enter correct Email");
    }
    user.Code = Code;
    user.codeExpire = Date() + 5 * 60 * 1000;
    await user.save();

    await SendVerifyEmail(user, Code);

    successResponse(res, "Code Send To Your Email");
  } catch (error) {
    errorResponse(res, 500, " internal server error");
  }
};
export const verifyCode = async (req, res) => {
  try {
    console.log("rout hit");
    let { email, code } = req.body;
    console.log(email, code);
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 404, "user not found");
    }

    if (user.Code !== Number(code)) {
      return errorResponse(res, 400, "Invalid Code");
    }
    if (user.codeExpire > Date.now()) {
      return errorResponse(res, 400, "Your code has been Expire");
    }
    return successResponse(res, 200, "code verify successfuly");
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "internal server error");
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 400, "Fields are required");
    }
    const user = await User.findOne({ email });
    if (!user) {
      return errorResponse(res, 400, "Enter correct Email");
    }

    const hashPassword = await bcrypt.hash(password, 9);

    user.password = hashPassword;

    await user.save();

    return successResponse(res, "Password Update successfuly");
  } catch (error) {
    return errorResponse(res, 500, "internal server error");
  }
};
export const getUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById({ _id: userId });

    if (!user) {
      return errorResponse(res, 400, "user not found");
    }
    return successResponse(res, "get sucessfuly", user);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 500, "internal server error");
  }
};

export const testController = async (req, res) => {
  const userId = req.user.id;
  return successResponse(res, "Check routes for Authentication");
};

export default {
  userSignup,
  signInGoogle,
  userLogin,
  verifyEmail,
  testController,
  getUser,
  verifyCode,
};
