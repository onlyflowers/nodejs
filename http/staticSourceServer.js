const http = require('http');
const URL = require('url');
const path = require('path');
const fs = require('fs');

async function getStatus(filename) {
  try {
    return await fs.promises.stat(filename); // 返回文件的stat信息 即文件的状态信息
  } catch (e) {
    return null; // 进入了catch 说明文件不存在报错了 返回null 表示文件不存在
  }
}

async function getFileContent(pathname) {
  let filename = path.resolve(__dirname, 'public', pathname.substring(1));
  let stat = await getStatus(filename);

  if (!stat) { return null } // filename对应的文件不存在 而且也不是一个目录

  if (stat.isDirectory()) {
    // 拼接得到的filename是文件目录的话 在其后面再拼接上index.html。再做是否是文件的校验 
    filename = path.resolve(__dirname, 'public', pathname.substring(1), 'index.html');
    stat = await getStatus(filename);

    if (!stat) { return null } // 文件不存在 返回null

    return await fs.promises.readFile(filename);// 文件存在 直接读取全部文件内容返回 (全部读取有点粗暴, 应该用流的方式读取)

  }

  // filename对应的文件内容存在 返回文件内容
  return await fs.promises.readFile(filename);
}

const handler = async (req, res) => {
  const urlObj = URL.parse(req.url);
  const pathname = urlObj.pathname;
  // 根据请求路径 拼接上public 得到静态资源的绝对路径
  
  const filecontent = await getFileContent(pathname)
  if (filecontent) {
    res.write(filecontent);
  } else {
    res.statusCode = 404;
    res.write('文件不存在');
  }
  res.end();
}

const server = http.createServer(handler);

server.on('listening', () => {
  console.log('server start, listening 6100');
})
server.listen(6100);