const express = require('express');
const app = express();

const path = require('path');
const staticRoot = path.resolve(__dirname, '../public')
app.use(express.static(staticRoot)) // 映射public目录中的静态资源

// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true })); // extended:true 表示使用qs库去解析url，而不是使用旧版的querystring库
//  解析 application/json 格式的请求体
app.use(express.json());

app.use('/api/student', require('./api/student'));

app.use(require('./errorMiddleware.js'))
app.listen(5000, ()=> {
  console.log('listen on port 5000');
})