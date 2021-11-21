const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils');
const adminServe = require('../../services/adminService');

router.get('/:id', asyncHandler(async (req) => {
  return adminServe.getAdminById(id);
}))

router.post('/', asyncHandler(async (req) => {
  return adminServe.addAdmin(req.body);
}))

router.delete('/:id', asyncHandler(async (req) => {
  const id = req.params.id;
  return adminServe.deleteAdmin(id);
}))

router.put('/:id', asyncHandler(async (req) => {
  const id = req.params.id;
  return adminServe.updateAdmin(req.body);
}))
module.exports = router;

