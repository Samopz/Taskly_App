import Board from "../models/boardModel.js";
import { logger } from "../utils/logger.js";

const boardService = {
  async createBoard(boardData) {
    const board = new Board(boardData);
    await board.save();
    logger.info("Board created successfully");
    return board;
  },
  async getBoardById(boardId) {
    logger.info("Board fetched successfully");
    return Board.findById(boardId);
  },

  async getAllBoards() {
    logger.info("All Boards fetched successfully");
    return Board.find({});
  },

  async updateBoardById(boardId, updateData) {
    logger.info("Board updated successfully");
    return Board.findByIdAndUpdate(boardId, updateData, { new: true }); // { new: true } returns the updated document instead of the original document
  },

  async deleteBoardById(boardId) {
    logger.info("Board deleted successfully");
    return Board.findByIdAndDelete(boardId);
  },
};

export default boardService;
