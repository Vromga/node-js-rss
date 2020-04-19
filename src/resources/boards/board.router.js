const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');
const tasksService = require('../tasks/task.service');
const { catchError, createError } = require('../../common/errorHandler');

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
    catchError(async (req, res, next) => {
      try {
        const board = await boardsService.getBoardsById(req.params.id);
        if (!board) {
          throw new Error();
        }
        await res.status(200).json(Board.toResponse(board));
      } catch (e) {
        const err = createError('Board not found', 404);
        // eslint-disable-next-line callback-return
        next(err);
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
    catchError(async (req, res, next) => {
      try {
        await tasksService.deleteByBoardId(req.params.id);
        const boardDelete = await boardsService.deleteBoardById(req.params.id);
        if (!boardDelete) throw new Error();
        res.status(200).json({ message: 'Board has been deleted' });
      } catch (e) {
        const err = createError('Board not found', 404);
        // eslint-disable-next-line callback-return
        next(err);
      }
    })
  );

module.exports = router;
