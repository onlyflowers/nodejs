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