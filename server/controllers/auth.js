import User from "../models/User.js";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { createError } from "../utils/createError.js";

export async function register(req, res, next) {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    console.log("Existing User:", existingUser);
    if (existingUser) {
      return next(createError(401, "User already exist."));
    }

    const hashPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashPassword,
    });

    await newUser.save();
    res.status(200).json({ message: "User has been created", success: true });
  } catch (error) {
    console.log(error);
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!isPasswordCorrect) {
      return next(createError(400, "Wrong password or username"));
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;

    console.log("Login", user);
    res.cookie("access_token", token, {
      httpOnly: true,
      expiresIn: "1h",
    });
    res.status(200).json({ user: otherDetails });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
