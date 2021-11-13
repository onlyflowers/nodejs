const Student = require('../model/Student');
const Class = require('../model/Class');
const { Op } = require('sequelize');
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

exports.getStudents = async (page = 1, pageSize = 10, sex = -1, name) => {
  // const result = await Student.findAll({
  //   offset: (page - 1) * pageSize,
  //   limit: pageSize
  // })
  // return JSON.parse(JSON.stringify(result));
  const where = { }
  if (sex !== -1) { where.sex = sex };
  if (name) {
    where.name = {
      [Op.like]: `%${name}%`
    }
  };
  const result = await Student.findAndCountAll({
    where,
    include: [Class], // 联表查询
    offset: (page - 1) * pageSize,
    limit: pageSize
  })
  return {
    datas: JSON.parse(JSON.stringify(result.rows)),
    count: result.count
  }
}