const http = require('http');
const url = require('url');

const handleRequest = (req) => {
  const urlObj = url.parse(req.url);
  console.log('请求路径:',  urlObj);
  console.log('请求方法:',  req.method);
  console.log('请求头:',  req.headers);
  let body = "";
  // 请求体可能会很大， 所以通过流的方式读取请求体
  req.on('data', (chunk) => {
    body += chunk.toString('utf-8');
  });
  // 请求体的流 读取完毕了
  req.on('end', () => {
    console.log('请求体', body);
  })
}

const server = http.createServer((req, res) => {
  handleRequest(req);

  res.setHeader('a', '222'); // 设置响应头 响应头随便写什么都可以
  res.write('你好'); // 设置响应体 也就是往流里面写 写什么就响应什么。 随便写什么都行
  res.statusCode = 444; // 对 没错 状态码想写多少都行 只要前端懂就行！
  res.end(); // end表示关闭可写流(关闭了就表示 我写完了 响应给前端吧~)
})

server.listen(9527);

server.on('listening', () => {
  console.log('listening 9527');
})