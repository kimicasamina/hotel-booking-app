import express from "express";
const router = express.Router();
import {
  getHotels,
  createHotel,
  updateHotel,
  deleteHotel,
  getAHotel,
  countByCity,
  countByType,
} from "../controllers/hotels.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

// CREATE
router.post("/", verifyAdmin, createHotel);

// UPDATE
router.put("/:id", verifyAdmin, updateHotel);

// DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

// GET
router.get("/find/:id", getAHotel);

// GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);

export default router;
