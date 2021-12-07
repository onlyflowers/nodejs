/**
 * 该中间件的作用
 * 1. 判断请求的接口是否需要token
 * 2. 校验token的合法性
 * 3. 在needToken数组中配置需要校验接口的api
 */
const { pathToRegexp } = require('path-to-regexp');
const { getErr } = require('./utils');
const jwt = require('./jwt');
const needToken = [
  { method: 'POST', path: '/api/student/' },
  { method: 'PUT', path: '/api/student/:id' },
  { method: 'GET', path: '/api/student/' },
  { method: "GET", path: "/api/admin/whoami" },
];
module.exports = (req, res, next) => {
  //1. 判断请求的接口是否需要携带token
  const apis = needToken.filter((api) => {
    const reg = pathToRegexp(api.path); // 根据路径模式返回一个正则
    return api.method === req.method && reg.test(req.path);
  })
  if (apis.length === 0) {
    //2. 请求的接口不需要携带token
    return next();
  }

  // 3.请求的接口需要token
  // 校验token
  const result = jwt.verify(req);
  if (result) {
    // 校验通过
    req.userId = result.id;
    next();
  } else {
    // 校验不通过
    handleNoToken(req, res, next);
  }
}

function handleNoToken(req, res, next) {
  res.status(403).send(getErr('you dont have any token to access the api', 403))
}