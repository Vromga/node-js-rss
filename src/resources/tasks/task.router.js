const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');
const { catchError, createError } = require('../../common/errorHandler');

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const tasks = await tasksService.getAllTasks();
      await res.status(200).json(tasks.map(Task.toResponse));
    })
  )
  .post(
    catchError(async (req, res) => {
      const task = await tasksService.createTask(
        new Task({ ...req.body, boardId: req.params.boardId })
      );
      await res.json(Task.toResponse(task));
    })
  );

router
  .route('/:id')
  .get(
    catchError(async (req, res, next) => {
      try {
        const task = await tasksService.getTaskById(req.params.id);
        if (!task) throw new Error();
        await res.status(200).json(Task.toResponse(task));
      } catch (e) {
        const err = createError('Task not found', 404);
        // eslint-disable-next-line callback-return
        next(err);
      }
    })
  )
  .delete(
    catchError(async (req, res) => {
      const statusDelete = await tasksService.deleteTaskById(req.params.id);
      if (statusDelete) {
        await res.json({ message: 'Task has been deleted' });
      } else {
        await res.json({ message: 'Task not find' });
      }
    })
  )
  .put(
    catchError(async (req, res) => {
      await tasksService.updateTask(req.params.id, req.body);
      await res.json({ message: 'Task has been updated' });
    })
  );

module.exports = router;
