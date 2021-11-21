const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils');
const bookServe = require('../../services/bookService');

router.get('/',asyncHandler(async (req, res, next) => {
  const { page, pageSize, name } = req.query;
  return bookServe.getBooks(page, pageSize, name);
}))

router.get('/:id', asyncHandler(async (req) => {
  const id = req.params.id;
  return bookServe.getBookById(id);
}))

router.post('/', asyncHandler(async (req) => {
  return bookServe.addBook(req.body);
}))

router.put('/:id', asyncHandler(async (req) => {
  const id = req.params.id;
  return bookServe.updateBook(id, req.body);
}))

router.delete('/:id', asyncHandler(async (req) => {
  const id = req.params.id;
  return bookServe.deleteBook(id);
}))

module.exports = router;