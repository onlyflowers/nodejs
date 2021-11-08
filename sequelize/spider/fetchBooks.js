const axios = require('axios').default;
const cheerio = require('cheerio');
const { myRequest } = require('./mockedApi'); // 手动模拟异步api 用于测试fetchBooksOnebyOne的逻辑正确性
const Book = require('../model/Book');

async function getHTML(url) {
  const response = await axios.get(url);
  return response.data;
}

async function getBookLinks() {
  const html = await getHTML('https://book.douban.com/latest');
  const $ = cheerio.load(html);
  const $doms = $('.grid-16-8 .chart-dashed-list li .media__img a');
  const $links = $doms.map((i, ele) => $(ele).attr('href'))
  return $links.get(); //$links是伪数组 调用get方法把它变成数组
}

async function getBookDetail(url) {
  const html = await getHTML(url);
  const $ = cheerio.load(html);
  const name = $('#wrapper h1 span').text();
  const imgurl = $('#mainpic a').attr('href');
  const authorSpan = $('#info span.pl').filter((i, ele) => $(ele).text().includes('作者'))
  const author = authorSpan.next('a').text();
  const publishSpan = $('#info span.pl').filter((i, ele) => $(ele).text().includes('出版年'))
  const publishDate = publishSpan[0].nextSibling.nodeValue;
  return {
    name,
    imgurl,
    author,
    publishDate
  }
}

async function fetchManyBooks() {
  const links = await getBookLinks();
  const promises = links.map((url) => getBookDetail(url));
  const booksArr = await Promise.all(promises);
  return booksArr
}
const STATUS = {
  ready: 'ready',
  pending: 'pending',
  done: 'done',
  fail: 'fail'
}

// 上一个url请求成功后再请求下一url 可以修改此方法 实现一秒钟爬一本书 这样不容易被发现。
async function fetchBooksOnebyOne() {
  let flag = true;
  let count = 0;
  // const links = await getBookLinks();
  const links = Array(20).fill('www.xxxx');
  const taskLength = links.length;
  const taskList = links.map((url) => ({
    url,
    status: STATUS.ready,
  }))
  return new Promise((resolve, reject) => {
    function doRequest() {
      if (flag && count < taskLength) {
        flag = false;
        const task = taskList.find((item) => item.status === STATUS.ready /*|| item.status === STATUS.fail*/);
        task.status = STATUS.pending;
        myRequest(task.url).then((res) => {
          console.log(res);
          task.data = res;
          // count += 1;
          task.status = STATUS.done;
        }).catch((e) => {
          task.status = STATUS.fail;
        }).finally(() => {
          flag = true;
          count += 1; //失败的不重新请求 无论成功或者失败,count都加1(害 爬点儿数据而已 简单点~ 简单点~)
          doRequest();
        })
      } else {
        if (count === taskLength) {
          const taskResult = taskList.map((item) => item.data).filter(Boolean);
          taskResult.length ? resolve(taskResult) : reject();
        }
      }
    }
    doRequest();
  })
}

async function saveToDB() {
  try {
    const books = await fetchManyBooks(); // 能成功爬取就存爬下来的数据
    Book.bulkCreate(books);
  } catch(e) { // 爬取失败(比如ip被限制了)就吧假数据写入数据库
    const books = require('./books');
    Book.bulkCreate(books);
  }
}
saveToDB();
// fetchBooksOnebyOne();
