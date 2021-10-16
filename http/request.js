const http = require('http');

const request = http.request('http://www.yuanjin.tech:5005/api/movie', { method: 'GET'  },
(response) => {
    console.log('收到响应');
    console.log('状态码：',  response.statusCode);
    console.log('状态码为头部信息：',  response.headers);

    let result = '';

    // 监听data事件 以流的方式读取响应结果，因为不知道响应有多大 所以以流的方式去读取。这里和传统ajax不一样
    response.on('data', (chunk) => {
      result += chunk.toString();
    })
  
    response.on('end', () => {
      console.log('消息结束');
      console.log(JSON.parse(result));
    })
  }
)

request.end(); //目前还没有消息体 执行end表示消息体结束 就这样吧。然后就会自动发送了。 

// 如果是发送post请求的话 就要在end之前用request.write()往请求体里写数据