import express from "express";
import boardController from "../controllers/boardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST request to create a new board
router.post("/create", authMiddleware, boardController.create);

// GET request to retrieve a board by ID
router.get("/getBy/:id", authMiddleware, boardController.getById);

// GET request to retrieve all boards
router.get("/getAll", authMiddleware, boardController.getAll);

// PUT request to update a board by ID
router.put("/update/:id",authMiddleware, boardController.update);

// DELETE request to delete a board by ID
router.delete("/delete/:id", authMiddleware, boardController.delete);

export default router;
