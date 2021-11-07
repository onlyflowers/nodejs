const Mock = require('mockjs');

const result = Mock.mock({
  'datas|300-500': [{
    name: '@cname',
    birthday: '@date',
    mobile: /^[1][3578][0-9]{9}$/,
    'sex|1-2': true,
    'ClassId|1-16': 0,
  }]
})
const Student = require('../model/Student');
Student.bulkCreate(result.datas);
// console.log(result.datas);