const boardsRepo = require('./board.memory.repository');

const getAllBoards = () => boardsRepo.getAllBoards();
const getBoardsById = id => boardsRepo.getBoardsById(id);
const createBoard = board => boardsRepo.createBoard(board);
const updateBoard = boardToUpdate => boardsRepo.updateBoard(boardToUpdate);
const deleteBoardById = id => boardsRepo.deleteBoardById(id);

module.exports = {
  getAllBoards,
  getBoardsById,
  createBoard,
  updateBoard,
  deleteBoardById
};
