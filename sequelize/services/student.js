const Student = require('../model/Student');

exports.addStudent = async (obj) => {
  const ins = await Student.create(obj);
  return ins.toJSON();
}

exports.deleteStudent = async (id) => {
  return await Student.destroy({
    where: {
      id,
    }
  })
}

exports.updateStudent = async (id, obj) => {
  return await Student.update(obj, {
    where: {
      id,
    }
  })
}