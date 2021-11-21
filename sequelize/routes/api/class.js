const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils');
const classServe = require('../../services/classService');

router.get('/', asyncHandler(async (req) => {
  return classServe.getClasses();
}))

router.post('/', asyncHandler(async (req) => {
  return classServe.addClass(req.body);
}))

router.delete('/:id', asyncHandler(async (req) => {
  return classServe.deleteClass(req.params.id);
}))

router.put('/:id', asyncHandler(async (req) => {
  const id = req.params.id;
  return classServe.updateClass(id, req.body);
}))


module.exports = router;