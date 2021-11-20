const express = require('express');
const app = express();
app.get(
  '/news',
  (req, res, next) => {
    console.log('handler1');
    throw new Error('服务端报错')
  },
  require('./errorMiddleware.js')
);
app.listen(5000, ()=> {
  console.log('listen on port 5000');
})