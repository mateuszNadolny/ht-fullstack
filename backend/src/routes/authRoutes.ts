import express from "express";
import { loginUser, registerUser, checkAuth } from "../controllers/authController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/register", registerUser);

router.get("/check", checkAuth);

export default router;
