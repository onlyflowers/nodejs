const Book = require('../model/Book');

exports.addBook = async (obj) => {
  const ins = await Book.create(obj);
  return ins.toJSON();
}
exports.deleteBook = async (id) => {
  return await Book.destroy({
    where: {
      id,
    }
  });
}
exports.updateBook = async (id, obj) => {
  return await Book.update(obj, {
    where: {
      id,
    }
  })
}