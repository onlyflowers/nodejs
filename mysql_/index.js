// const mysql = require('mysql2');
const mysql = require('mysql2/promise');

const sqlQuery = 'select * from company';
const sqlUpdate = 'update company set name = "海康威视数字技术股份有限公司" where name = "海康威视"';
const sqlAdd = 'insert into company (name, location, buildDate) values("海康威视", "杭州市滨江区阡陌路555号", "2000-1-1")';


async function main() {
  const pool = await mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'companydb',
    waitForConnections: true, 
    connectionLimit: 10, // 连接池里连接最大数量
    queueLimit: 0 // 可以排队等待的数量
  })
  async function queryCompany(name) {
    const sql = `select * from company where \`name\` like concat("%", ?, "%")`;
    return pool.execute(sql, [name]);
  }
  const [rows, fields] = await queryCompany('海康');
  console.log(rows);
}
main();

/**
 * 1. 了解了数据库驱动的概念，什么是数据库驱动
 * 2. 用connection.query执行一些sql语句
 * 3. 使用promise的api执行一些sql语句
 * 4. 了解了sql注入攻击。如果sql语句依赖前端传入的字符直接拼接成sql语句 会有sql注入攻击的风险
 * 5. 使用connection.excute为什么能解决sql注入攻击的问题。因为问号代表的是变量 问号所代表的值不会被解析成sql命令。
 * 6. 使用连接池，使用连接池有什么好处。
 * 7. 
*/ 
