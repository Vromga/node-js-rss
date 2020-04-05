const router = require('express').Router();
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');
const Board = require('./board.model');

router
  .route('/')
  .get(async (req, res) => {
    const boards = await boardsService.getAllBoards();
    await res.json(boards);
  })
  .post(async (req, res) => {
    const board = new Board(req.body);
    await boardsService.createBord(board);
    await res.json(board);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const board = await boardsService.getBoardsById(req.params.id);
    if (!board) {
      res.status(404).json({ message: 'Board not found' });
    } else {
      await res.json(board);
    }
  })
  .put(async (req, res) => {
    await boardsService.updateBoard(req.params.id, req.body);
    await res.json({ message: 'Board has been updated' });
  })
  .delete(async (req, res) => {
    await tasksService.deleteByBoardId(req.params.id);
    await boardsService.deleteBoardById(req.params.id);
    await res.json({ message: 'Board has been deleted' });
  });

module.exports = router;
