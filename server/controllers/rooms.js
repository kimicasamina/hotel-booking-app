import mongoose from "mongoose";
import { createError } from "../utils/createError.js";
import Room from "../models/Room.js";
import Hotel from "../models/Hotel.js";

export async function getAllRoom(req, res, next) {
  try {
    const rooms = await Room.find();
    res.status(200).json({ rooms });
  } catch (error) {
    next(error);
  }
}

export async function getRoom(req, res, next) {
  const id = req.params.id;
  try {
    const room = await Room.findById(id);
    res.status(200).json({ room });
  } catch (error) {
    next(error);
  }
}

export async function createRoom(req, res, next) {
  const hotelId = req.params.hotelId;
  const newRoom = new Room(req.body);

  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (error) {
      next(error);
    }
    res
      .status(200)
      .json({ room: savedRoom, message: "New room has been created" });
  } catch (error) {
    next(error);
  }
}

export async function updateRoom(req, res, next) {
  try {
    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ room: updatedRoom, message: "Hotel has been updated" });
  } catch (error) {
    next(error);
  }
}

export async function deleteRoom(req, res, next) {
  const hotelId = req.params.hotelId;
  try {
    await Room.findByIdAndDelete(req.params.id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (error) {
      next(error);
    }

    res.status(200).json({ message: "Room has been deleted" });
  } catch (error) {
    next(error);
  }
}
