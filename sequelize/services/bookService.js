const Book = require('../model/Book');
const { Op } = require('sequelize');

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

exports.getBooks = async (page = 1, pageSize = 10, name = '') => {
  const where = {};
  if (name) {
    where.name = {
      [Op.like]: `%${name}%`,
    }
  }
  const result = await Book.findAndCountAll({
    where,
    offset: (page - 1) * pageSize,
    limit: pageSize,
  });
  return {
    data: JSON.parse(JSON.stringify(result.rows)),
    count: result.count
  }
}

exports.getBookById = async (id) => {
  return Book.findByPk(id); 
}