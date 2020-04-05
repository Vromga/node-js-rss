const uuid = require('uuid');

class Task {
  constructor({
    id = uuid(),
    title = 'Create green house',
    order = 38,
    description = 'Yeah, make a great green house!',
    userId = '9d4ee5cc-b3a1-4416-9fc5-31ae10993292',
    boardId = 'ea2e8231-abf2-4322-9e16-d8fcfde566fd',
    columnId = 'e6bf0500-42dc-4a14-b37c-c8bc11b105c7'
  }) {
    this.id = id;
    this.title = title;
    this.order = order;
    this.description = description;
    this.userId = userId;
    this.boardId = boardId;
    this.columnId = columnId;
  }
}

module.exports = Task;
