const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');

router
  .route('/')
  .get(async (req, res) => {
    const tasks = await tasksService.getAllTasks();
    await res.json(tasks);
  })
  .post(async (req, res) => {
    const task = new Task({ ...req.body, boardId: req.params.boardId });
    await tasksService.createTask(task);
    await res.json(task);
  });

router
  .route('/:id')
  .get(async (req, res) => {
    const task = await tasksService.getTaskById(req.params.id);
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
    } else {
      await res.json(task);
    }
  })
  .delete(async (req, res) => {
    await tasksService.deleteTaskById(req.params.id);
    await res.json({ message: 'Task has been deleted' });
  })
  .put(async (req, res) => {
    await tasksService.updateTask(req.params.id, req.body);
    await res.json({ message: 'Task has been updated' });
  });

module.exports = router;
