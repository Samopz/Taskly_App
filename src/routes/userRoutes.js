import express from "express";
import userController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { cacheGetAllUsers } from "../integrations/cache.js";

const router = express.Router();

router.get("/getUser", authMiddleware, userController.getUser);
router.get(
  "/getAllUsers",
  userController.getAllUsers,
  cacheGetAllUsers
);
router.put("/updateUser", authMiddleware, userController.updateUser);
router.put("/updatePassword", authMiddleware, userController.updatePassword);
router.post("/resetPassword", authMiddleware, userController.resetPassword);
router.delete("/deleteProfile/:id", authMiddleware, userController.deleteProfile);

export default router;
