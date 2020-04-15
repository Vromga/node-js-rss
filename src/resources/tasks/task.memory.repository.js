const Task = require('./task.model');

const getAllTasks = async () => {
  return Task.find({});
};

const getTaskById = async id => {
  return Task.findOne({ _id: id });
};

const createTask = async task => {
  return Task.create(task);
};

const deleteTaskById = async id => {
  // return (await Task.deleteOne({ _id: id })).ok;
  const taskForDelete = Task.find({ _id: id });
  if (!(await taskForDelete).length) return 404;
  await Task.findByIdAndDelete(id);
  return 204;
};

const updateTask = async (id, data) => {
  const taskForUpdate = Task.find({ _id: id });
  if (!(await taskForUpdate).length) return 404;
  data._id = id;
  await Task.findByIdAndUpdate(id, data);
  return Task.find({ _id: id });
};

const deleteByBoardId = async boardId => {
  await Task.deleteMany({ boardId });
};

const updateByUserId = async userId => {
  await Task.updateMany({ userId }, { userId: null });
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  deleteTaskById,
  deleteByBoardId,
  updateTask,
  updateByUserId
};
