const Board = require('./board.model');

const getAllBoards = async () => {
  return Board.find({});
};

const getBoardsById = async id => {
  return Board.findOne({ _id: id });
};

const createBoard = async board => {
  return Board.create(board);
};

const updateBoard = async boardToUpdate => {
  return Board.updateOne({ _id: boardToUpdate.id }, boardToUpdate);
};

const deleteBoardById = async id => {
  const boardForDelete = Board.find({ _id: id });
  if (!(await boardForDelete).length) return 404;
  await Board.findByIdAndDelete(id);
  return 204;
};

module.exports = {
  getAllBoards,
  getBoardsById,
  createBoard,
  deleteBoardById,
  updateBoard
};
