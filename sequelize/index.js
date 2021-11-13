require('./model/relations');
// require('./mock/mockStudent');

const studentServe = require('./services/studentService');
const bookServe = require('./services/bookService');
const classServe = require('./services/classService')
// studentServe.getStudents(1, 100, 1, '超').then((res) => {
//   console.log(res);
// })

// bookServe.getBooks(1, 10, '的').then((res) => {
//   console.log(res);
// })

classServe.getClasses().then((res) => {
  console.log(res);
})