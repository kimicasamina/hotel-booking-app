import express from "express";
const router = express.Router();
import {
  updateUser,
  deleteUser,
  getAUser,
  getAllUser,
} from "../controllers/users.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

// UPDATE
router.put("/:id", verifyUser, updateUser);

// DELETE
router.delete("/:id", verifyUser, deleteUser);

// GET A USER
router.get("/:id", verifyUser, getAUser);

// GET ALL USER
router.get("/", verifyAdmin, getAllUser);

export default router;
