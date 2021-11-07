const axios = require('axios').default;
const cheerio = require('cheerio');

async function getHTML(url) {
  const response = await axios.get(url);
  return response.data;
}

async function getBookLinks() {
  const html = await getHTML('https://book.douban.com/latest');
  const $ = cheerio.load(html);
  const $doms = $('.grid-16-8 .chart-dashed-list li .media__img a');
  const $links = $doms.map(function(i, ele) {
    return $(ele).attr('href');
  })
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
  const pubulishDate = publishSpan[0].nextSibling.nodeValue;
  return {
    name,
    imgurl,
    author,
    pubulishDate
  }
}

async function fetchManyBooks() {
  const links = await getBookLinks();
  const promises = links.map((url) => getBookDetail(url));
  const booksArr = await Promise.all(promises);
  console.log(booksArr);
}
fetchManyBooks();