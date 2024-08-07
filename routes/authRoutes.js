import { Router } from "express";

import {
  getUser,
  loginUser,
  registerUser,
  resetPassword,
} from "../controller/authController.js";

const router = Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/reset", resetPassword);
router.get("/users", getUser);

export default router;
