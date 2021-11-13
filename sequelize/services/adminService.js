const Admin = require('../model/Admin');

exports.addAdmin = async (adminObj) => {
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
      loginPwd
    }
  })
  // 判断大小写是否一致
  if (result && result.loginId === loginId && result.loginPwd === loginPwd) {
    return result.toJSON();
  }
  return null;
}

exports.getAdminById = async (id) => {
  const result = await Admin.findByPk(id);
  return result ? result.toJSON() : null;
}