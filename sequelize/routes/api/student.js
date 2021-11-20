const express = require('express');
const router = express.Router();
const studentServe = require('../../services/studentService')
const { asyncHandler } = require('../utils'); 

// 分页查询学生
router.get('/', asyncHandler(async (req, res) => {
  const { page, pageSize, sex, name } = req.query;
  return studentServe.getStudents(page, pageSize, sex, name);
}))

// 获取单个学生
router.get('/:id', asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  return studentServe.getStudentById(id);
}))

router.post('/', asyncHandler(async (req) => {
  console.log(req.body)
  return studentServe.addStudent(req.body);
}))

router.delete('/:id', (req, res) => {
  res.send('获取学生')
})

router.put('/:id', (req, res) => {
  res.send('获取学生')
})

module.exports = router;