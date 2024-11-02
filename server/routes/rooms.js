import express from "express";
const router = express.Router();
import {
  getAllRoom,
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
} from "../controllers/rooms.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

// CREATE
router.post("/:hotelId", verifyAdmin, createRoom);

// UPDATE
router.put("/:id", verifyAdmin, updateRoom);

// DELETE
router.delete("/:id/:hotelId", verifyAdmin, deleteRoom);

// GET
router.get("/:id", getRoom);

// GET ALL
router.get("/", getAllRoom);

export default router;
