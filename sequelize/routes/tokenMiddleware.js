const { pathToRegexp } = require('path-to-regexp');
const { getErr } = require('./utils');
const cryptor = require('../utils/crypt');
const needToken = [
  { method: 'POST', path: '/api/student/' },
  { method: 'PUT', path: '/api/student/:id' },
  { method: 'GET', path: '/api/student/' },
];

module.exports = (req, res, next) => {
  const apis = needToken.filter((api) => {
    const reg = pathToRegexp(api.path); // 根据路径模式返回一个正则
    return api.method === req.method && reg.test(req.path);
  })
  if (apis.length === 0) { // 请求的api不是需要验证token的api
    return next();
  }
  let token = req.cookies.token;
  // let token = req.signedCookies.token; //
  if (!token) {
    token = req.headers.authorization;
  }
  if (!token) {
    handleNoToken(req, res, next)
    console.log('认证没有通过')
    return;
  }
  // 验证通过
  const userId = cryptor.decrypt(token);
  req.userId = userId; // 在req对象中保存userId 让后续操作直接可以通过req对象拿到userId
  console.log('认证通过', token)
  next();
}

function handleNoToken(req, res, next) {
  res.status(403).send(getErr('you dont have any token to access the api', 403))
}