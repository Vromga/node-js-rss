let boards = [
  {
    id: '1eae84ae-3011-4b42-9822-6de2c0a2be98',
    title: 'Product name: Lorem',
    columns: []
  }
];

const getAllBoards = async () => {
  return boards;
};

const getBoardsById = async id => {
  return boards.find(board => board.id === id);
};

const createBord = async board => {
  boards.push(board);
};

const updateBoard = async (id, body) => {
  const index = boards.findIndex(board => board.id === id);
  boards[index] = { ...boards[index], ...body };
};

const deleteBoardById = async id => {
  boards = boards.filter(board => board.id !== id);
};

module.exports = {
  getAllBoards,
  getBoardsById,
  createBord,
  deleteBoardById,
  updateBoard
};
