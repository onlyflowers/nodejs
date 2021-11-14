// require('./init');
require('./services/init');

const studentServe = require('./services/studentService');

studentServe.addStudent({
  name: '小明',
  birthday: '1998-01-01',
  sex: true,
  mobile: '18556567898',
  classId: 11
}).then((res) => {
  console.log(res);
})
