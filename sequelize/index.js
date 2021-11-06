// const sequelize = require('./model/sync');
const adminService = require('./services/adminService');

// adminService.addAdmin({
//   loginId: 'heihei',
//   loginPwd: '123123'
// })

// adminService.deleteAdmin(2);
adminService.updateAdmin({
  loginPwd: 'asdfasdf'
},1)