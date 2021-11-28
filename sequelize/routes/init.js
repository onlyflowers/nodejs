const express = require('express');
const app = express();

const path = require('path');
const staticRoot = path.resolve(__dirname, '../public')
app.use(express.static(staticRoot)) // 映射public目录中的静态资源

// 加入cookie-parser 中间件
// 加入之后 会在req对象中注入cookies属性 用于获取所有请求传递过来的cookie
// 加入之后 会在res对象中注入cookie方法 用于设置cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser()); 
// app.use(cookieParser('可以传入cookie加密秘钥')); 

const tokenMiddleware = require('./tokenMiddleware');
app.use(tokenMiddleware);
// 解析 application/x-www-form-urlencoded 格式的请求体
app.use(express.urlencoded({ extended: true })); // extended:true 表示使用qs库去解析url，而不是使用旧版的querystring库
//  解析 application/json 格式的请求体
app.use(express.json());

app.use('/api/student', require('./api/student'));
app.use('/api/book', require('./api/book'));
app.use('/api/admin', require('./api/admin'));
app.use('/api/class', require('./api/class'));

app.use(require('./errorMiddleware.js'));

app.listen(5000, ()=> {
  console.log('listen on port 5000');
})