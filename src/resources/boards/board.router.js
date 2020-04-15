const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');
const { catchError } = require('../../common/errorHandler');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const boards = await boardsService.getAllBoards();
      await res.status(200).json(boards);
    })
  )
  .post(
    catchError(async (req, res) => {
      const board = await boardsService.createBoard(req.body);
      await res.status(200).json(Board.toResponse(board));
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res) => {
      const board = await boardsService.getBoardsById(req.params.id);
      if (!board) {
        res.status(500).json({ message: 'Board not found' });
      } else {
        await res.status(200).json(Board.toResponse(board));
      }
    })
  )
  .put(
    catchError(async (req, res) => {
      const boardToUpdate = {
        id: req.params.id,
        title: req.body.title,
        column: req.body.column
      };

      await boardsService.updateBoard(boardToUpdate);
      await res.json({ message: 'Board has been updated' });
    })
  )
  .delete(
    catchError(async (req, res) => {
      await tasksService.deleteByBoardId(req.params.id);
      const statusDelete = await boardsService.deleteBoardById(req.params.id);
      if (statusDelete === 204) {
        res.status(200).send(JSON.stringify('user delete successfully'));
      } else {
        res.status(500).send(JSON.stringify('user delete failed'));
      }
    })
  );

module.exports = router;
