const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../utils');
const adminServe = require('../../services/adminService');
const cryptor = require('../../utils/crypt')
router.post('/login', asyncHandler(async (req, res) => {
  const { loginId, loginPwd } = req.body;
  const result = await adminServe.login(loginId, loginPwd);
  if (result) {
    const value = cryptor.encrypt(String(result.id));
    // res.header('set-cookie', `token=${result.loginId}; path=/; domain=localhost; max-age=3600`);
    res.cookie('token', value , {
      path: '/',
      domain: 'localhost',
      maxAge: 24 * 3600, // 毫秒数
      // httpOnly: true
    })
    res.header('authorization', value);
  }
  return result;
}))

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

