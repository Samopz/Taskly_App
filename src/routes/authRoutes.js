import express from "express";
import {
  registerController,
  loginController,
} from "../controllers/authController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

const router = express.Router();

//routes
//REGISTER || POST
router.post("/register", adminMiddleware, registerController);

// LOGIN || POST
router.post("/login", loginController);

export default router;
