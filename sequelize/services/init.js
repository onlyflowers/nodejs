//关于用datetime来校验时间的文档 http://validatejs.org/#validators-datetime

const validate = require('validate.js');
const moment = require('moment');

validate.extend(validate.validators.datetime, {
  /**
   * value是待校验的日期的值， options是datetime的整个配置对象
   * parse方法内部需要把该日期值转换成时间戳返回，
   * 如果无法转换 需要返回NaN来表示无法转换
   * @param {*} value 
   * @param {*} options 
   */
  parse(value, options) {
    // 允许的时间格式
    let formats = ['YYYY-MM-DD HH:mm:ss', 'YYYY-M-D H:m:s', 'x'];
    if (options.dateOnly) {
      formats = ['YYYY-MM-DD', 'YYYY-M-D', 'x']
    }
    // 按照formats中格式吧value转成时间戳(如果value符合这些格式的话)
    return +moment.utc(value, formats, true); // 第三个参数表示是否是严格模式
  },
  /**
   * The format function should take a unix timestamp (in milliseconds) and format it in a user friendly way
   * @param {*} value 
   * @param {*} options 
   */
  format(value, options) {
    const format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
    const result = moment.utc(value).format(format);
    console.log(result);
    return result
  }
})