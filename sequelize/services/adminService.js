const Admin = require('../model/Admin');
const md5 = require('js-md5');
exports.addAdmin = async (adminObj) => {
  adminObj.loginPwd = md5(adminObj.loginPwd);
  // 此处省略各种校验逻辑 直接做添加
  const ins = await Admin.create(adminObj);
  return ins.toJSON();
}

exports.deleteAdmin = async (adminId) => {
  const result = await Admin.destroy({
    where: {
      id: adminId
    }
  });
  return result;
}

exports.updateAdmin = async (adminObj, id) => {
  adminObj.loginPwd = md5(adminObj.loginPwd);
  const result = await Admin.update(adminObj, {
    where: {
      id,
    }
  });
  return result;
}

exports.login = async (loginId, loginPwd) => {
  const result = await Admin.findOne({
    where: {
      loginId,
      loginPwd: md5(loginPwd)
    }
  })
  // 判断大小写是否一致
  if (result && result.loginId === loginId) {
    return result.toJSON();
  }
  return null;
}

exports.getAdminById = async (id) => {
  const result = await Admin.findByPk(id);
  return result ? result.toJSON() : null;
}