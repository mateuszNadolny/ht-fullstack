import express from "express";
import {
  getAllHabits,
  addNewHabit,
  updateHabit,
  deleteHabit,
} from "../controllers/habitController.ts";
import authMiddleware from "../middleware/middleware.ts";

const router = express.Router();

router.get("/", authMiddleware, getAllHabits);

router.post("/", authMiddleware, addNewHabit);

router.put("/:id", authMiddleware, updateHabit);

router.delete("/:id", authMiddleware, deleteHabit);

export default router;
