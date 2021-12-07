const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils');
const adminServe = require('../../services/adminService');
const cryptor = require('../../utils/crypt')
const jwt = require('../jwt');

router.post('/login', asyncHandler(async (req, res) => {
  const { loginId, loginPwd } = req.body;
  const result = await adminServe.login(loginId, loginPwd);
  if (result) {
    //登录成功 颁发token
    jwt.publish(res, undefined, { id: result.id });
  }
  return result;
}))

router.get('/:id', asyncHandler(async (req) => {
  return adminServe.getAdminById(id);
}))

router.post('/', asyncHandler(async (req) => {
  console.log(req.headers)
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

