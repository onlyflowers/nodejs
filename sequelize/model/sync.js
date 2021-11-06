require('./Admin');
require('./Book');
require('./Student');
require('./Class');
const sequelize = require('./db');
(async () => {
  await sequelize.sync({ alter: true })
  console.log('同步完成');
})()