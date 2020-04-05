const tasksRepo = require('./task.memory.repository');

const getAllTasks = () => tasksRepo.getAllTasks();
const createTask = task => tasksRepo.createTask(task);
const getTaskById = id => tasksRepo.getTaskById(id);
const updateTask = (id, body) => tasksRepo.updateTask(id, body);
const deleteTaskById = id => tasksRepo.deleteTaskById(id);
const deleteByBoardId = boardId => tasksRepo.deleteByBoardId(boardId);
const updateByUserId = userId => tasksRepo.updateByUserId(userId);

module.exports = {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTaskById,
  deleteByBoardId,
  updateByUserId
};
