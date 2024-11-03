import Hotel from "../models/Hotel.js";
import mongoose from "mongoose";
import { createError } from "../utils/createError.js";

export async function getHotels(req, res, next) {
  const { min, max, limit, ...others } = req.query;
  console.log(min);
  console.log(max);
  console.log(others);
  console.log(req.query);

  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(parseInt(limit));
    res.status(200).json({ hotels });
  } catch (error) {
    next(error);
  }
}

export async function getAHotel(req, res, next) {
  const id = req.params.id;
  try {
    const hotel = await Hotel.find({ _id: id });
    res.status(200).json({ hotel });
  } catch (error) {
    next(error);
  }
}

export async function createHotel(req, res, next) {
  const newHotel = new Hotel(req.body);

  try {
    const savedHotel = await newHotel.save();
    res
      .status(200)
      .json({ hotel: savedHotel, message: "New hotel has been created" });
  } catch (error) {
    next(error);
  }
}

export async function updateHotel(req, res, next) {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ hotel: updatedHotel, message: "Hotel has been updated" });
  } catch (error) {
    next(error);
  }
}

export async function deleteHotel(req, res) {
  try {
    const deletedHotel = await Hotel.findByIdAndDelete(req.params.id);
    res
      .status(200)
      .json({ hotel: deletedHotel, message: "Hotel has been deleted" });
  } catch (error) {
    next(error);
  }
}

export async function countByCity(req, res) {
  const cities = req.query.cities.split(",");
  try {
    // const list = await Promise.all(
    //   cities.map((city) => {
    //     return Hotel.find({ city: city }).length;
    //   })
    // );
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );

    res.status(200).json({ cityCount: list });
  } catch (error) {
    next(error);
  }
}

export async function countByType(req, res, next) {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortCount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });
    const properties = [
      {
        type: "hotel",
        count: hotelCount,
      },
      {
        type: "apartment",
        count: apartmentCount,
      },
      {
        type: "resort",
        count: resortCount,
      },
      {
        type: "villa",
        count: villaCount,
      },
      {
        type: "cabin",
        count: cabinCount,
      },
    ];
    res.status(200).json({ properties });
  } catch (error) {
    next(error);
  }
}
