import express from "express";
import * as InvitationController from "../controllers/invitController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Define routes
router.post("/create", authMiddleware, InvitationController.createInvitation);
router.put("/update/:id", authMiddleware, InvitationController.updateInvitation);
router.get("/getInvite/:id", authMiddleware, InvitationController.getInvitation);


export default router;
