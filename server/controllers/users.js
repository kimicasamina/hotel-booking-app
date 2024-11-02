import User from "../models/User.js";
import mongoose from "mongoose";
import { createError } from "../utils/createError.js";

export async function getAUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
}

export async function getAllUser(req, res, next) {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    next(createError(error.status, error.message));
  }
}

export async function updateUser(req, res, next) {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ user: updatedUser, message: "User has been updated." });
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User has been deleted." });
  } catch (error) {
    next(error);
  }
}
