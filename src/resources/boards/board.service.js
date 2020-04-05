const boardsRepo = require('./board.memory.repository');

const getAllBoards = () => boardsRepo.getAllBoards();
const getBoardsById = id => boardsRepo.getBoardsById(id);
const createBord = board => boardsRepo.createBord(board);
const updateBoard = (id, body) => boardsRepo.updateBoard(id, body);
const deleteBoardById = id => boardsRepo.deleteBoardById(id);

module.exports = {
  getAllBoards,
  getBoardsById,
  createBord,
  updateBoard,
  deleteBoardById
};
