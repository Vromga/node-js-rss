let tasks = [
  {
    id: '1400c2d7-f1b9-429e-837e-a6bf5c659f7b',
    title: 'Title: Hello world',
    order: 88,
    description: 'Clean windows',
    userId: '2c205504-6446-47cc-9281-c368f6257622',
    boardId: '8b39987b-1aa9-431d-b627-02f1a83f1442',
    columnId: '2be0c342-ec0b-422d-84c2-212d89393fee'
  },
  {
    id: '25b23174-d65e-4208-997d-8f774f82118a',
    title: 'Сoronavirus',
    order: 61,
    description: 'Do not die from coronavirus!!! ;-)',
    userId: '4ce641a1-f496-49ac-959a-274c83465a66',
    boardId: '51643030-ddf0-4943-a6ba-c74ec1516a59',
    columnId: 'dc5d0a3a-0eaf-4012-b99b-7440e6dc7492'
  }
];

const getAllTasks = async () => {
  return tasks;
};

const getTaskById = async id => {
  return tasks.find(task => task.id === id);
};

const createTask = async task => {
  tasks.push(task);
};

const deleteTaskById = async id => {
  tasks = tasks.filter(task => task.id !== id);
};

const deleteByBoardId = async boardId => {
  tasks = tasks.filter(task => task.boardId !== boardId);
};

const updateTask = async (id, data) => {
  const index = tasks.findIndex(task => task.id === id);
  tasks[index] = { ...tasks[index], ...data };
};

const updateByUserId = async userId => {
  tasks = tasks.map(task => {
    if (task.userId === userId) {
      task.userId = null;
    }
    return task;
  });
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
