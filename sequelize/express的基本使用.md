# express的基本使用
### http模块 麻烦
1. 根据不同的请求路径，不同的方法，做不同的事情，比较麻烦
2. 读取请求体和写入请求体是通过操作流的方式来做的，比较麻烦

### express的基本使用
```javascript
const express = require('express');
const http = require('http');

const app = express(); // app其实是一个函数，用于处理请求的函数
const server = http.createServer(app); 

server.listen(5000, () => {
  console.log('listen on port 5000')
})
```
执行`express()`得到的`app`是一个函数，`server`依旧是由http模块来构建的，但是处理请求的逻辑交给app来做。
- 更简洁的写法。
```javascript
const express = require('express');
const app = express()
app.listen(5000, () => {/*...*/})
```
即app上也有一个listen方法，listen的实现逻辑大概如下
```javascript
app.listen = (port, callback) => {
  const http = require('http');
  http.createServer(this).listen(port, callback)
}
```
### 处理请求
1. 匹配请求：express通过下面的写法来匹配请求方法和请求路径然后交给回调函数处理请求
```javascript
// app.请求方法('请求路径', 处理函数)
app.get('/news', (req, res) => {
  // 这里的req,res是被express封装过后的对象，并不是原滋原味的IncomingMessage和OutgoingMessage
})
```
2. 常用的请求信息
假设请求的url是: `http://localhost:5000/news/400?name="kangkang"`
```javascript
app.get('/news/:id', (req, res) => {
  console.log(req.headers);
  console.log(req.path); // -> /news/400
  console.log(req.params); // // { id: '400'}
  console.log(req.query); // -> { name: '"kangkang"' }
});
```

3. 响应请求
- 调用`res.send()`方法响应请求
```javascript
res.setHeader("aaa", "123") // 设置响应头
res.send('<h1>你好啊</h1>')
//send里写啥都行，比如数组，对象字符串等
```

- 重定向
```javascript
res.status(302).header("location","https://www.baidu.com").end();
// 这里一定要调用end()来表示响应体结束。send方法内部会自动调用end方法。
// 下面是别的写法
res.status(302).location('https://www.baidu.com').end();
res.redirect("https://www.baidu.com", 302);
```


