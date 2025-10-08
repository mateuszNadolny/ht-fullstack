import express from "express";
import {
  getAllRecords,
  addNewRecord,
  updateRecord,
  deleteRecord,
} from "../controllers/recordController.js";
import authMiddleware from "../middleware/middleware.js";

const router = express.Router();

router.get("/", authMiddleware, getAllRecords);

router.post("/", authMiddleware, addNewRecord);

router.put("/:id", authMiddleware, updateRecord);

router.delete("/:id", authMiddleware, deleteRecord);

export default router;
