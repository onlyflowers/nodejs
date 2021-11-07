const Mock = require('mockjs');
const result = Mock.mock({
  'datas|16': [
    {
      'id|+1': 1,
      name: '高三 @id 班',
      openDate: '@date'
    }
  ]
})

const Class = require('../model/Class');
Class.bulkCreate(result.datas);