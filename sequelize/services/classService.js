const Book = require('../model/Book');
const Class = require('../model/Class');

exports.addClass = async (obj) => {
  const ins =await Class.create(obj);
  return ins.toJSON();
}
exports.deleteClass = async (id) => {
  return await Book.destroy({
    where: {
      id,
    }
  })
}
exports.updateClass = async (id, obj) => {
  return await Class.update(obj, {
    where: {
      id,
    }
  })
}