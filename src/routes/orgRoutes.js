import express from "express";
import organizationController from "../controllers/orgController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create an organization
router.post("/create", authMiddleware, organizationController.create);

// Get an organization by ID
router.get("/getBy/:id", authMiddleware, organizationController.getById);

// Get all organizations
router.get("/getAll", authMiddleware, organizationController.getAll);

// Update an organization by ID
router.put("/updateBy/:id", authMiddleware, organizationController.update);

// Delete an organization by ID
router.delete("/deleteBy/:id", authMiddleware, organizationController.delete);


export default router;
