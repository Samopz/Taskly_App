import boardService from "../services/boardService.js";


const boardController = {
  async create(req, res) {
    try {
      const board = await boardService.createBoard(req.body);
      res.status(201).json(board);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getById(req, res) {
    try {
      const board = await boardService.getBoardById(req.params.id);
      if (!board) {
        return res.status(404).json({ error: "Board not found" });
      }
      res.json(board);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getAll(req, res) {
    try {
      const boards = await boardService.getAllBoards();
      res.status(200).send({
        success: true,
        message: "successful!",
        totalOrg: boards.length,
        boards,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async update(req, res) {
    try {
      const board = await boardService.updateBoardById(req.params.id, req.body);
      if (!board) {
        return res.status(404).json({ error: "Board not found" });
      }
      res.json(board);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async delete(req, res) {
    try {
      await boardService.deleteBoardById(req.params.id);
      res.status(201).send({
        success: true,
        message: "Deleted successfully!",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

export default boardController;
