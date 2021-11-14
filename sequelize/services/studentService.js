const Student = require('../model/Student');
const Class = require('../model/Class');
const validate = require('validate.js');
const moment = require('moment');
const { Op } = require('sequelize');
const { pickProps } = require('../utils');


exports.addStudent = async (obj) => {
  //只取我们期望的数据 为了防止前端传入deleteAt等不被期望的值
  obj = pickProps(obj, 'name', 'birthday', 'mobile', 'sex', 'classId');

  // 自定义一个名为classExsit的验证器 
  validate.validators.classExsit = async (value) => {
    const _class = await Class.findByPk(value);
    return _class ? undefined : 'is not exist';
  }
  // 验证规则
  const rule = {
    name: {
      presence: { // 是否出席 即 是否必填
        allowEmpty: false, // 不允许为空 包括 [], {}, '', ' ' 
      },
      type: 'string',
      length: {
        minimum: 1,
        maximum: 10
      }
    },
    birthday: {
      presence: {
        allowEmpty: false,
      },
      datetime: {
        dateOnly: true,
        earliest: +moment.utc().subtract(100, 'y'), // 一百年前的时间戳
        latest:+moment.utc().subtract(5, 'y')
      }
    },
    sex: {
      presence: true,
      type: 'boolean'
    },
    mobile: {
      presence: {
        allowEmpty: false,
      },
      format: /^[1][3578][0-9]{9}$/
    },
    classId: {
      presence: true,
      numericality: { //http://validatejs.org/#validators-numericality
        onlyInteger: true,
        strict: false, 
      },
      //自定义验证 判断数据库中真的是否有这个班级
      classExsit: true, // 调用自定义的classExsit方法
    }
  }
  // const result = validate(obj, rule) // 同步验证
    await validate.async(obj, rule) // 异步验证
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