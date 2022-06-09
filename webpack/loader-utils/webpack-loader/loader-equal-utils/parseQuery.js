/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 15:12:40
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 15:18:13
 */

const JSON5 = require('json5');
 
const specialValues = {
  null: null,
  true: true,
  false: false,
};
//parseQuery(解析被调用loader的配置选项)
function parseQuery(query) {
  if (query.substr(0, 1) !== '?') {//如果字符串不是以?开头 就抛出错误
    throw new Error(
      "A valid query string passed to parseQuery should begin with '?'"
    );
  }
  query = query.substr(1) ;//去掉？
   
  if (!query) {//如果是空
    return {};
  }

  if (query.substr(0, 1) === '{' && query.substr(-1) === '}') {//如果是对象 返回解析
    return JSON5.parse(query);
  }
 
  const queryArgs = query.split(/[,&]/g);//将字符串以, &符号分割成字符串数组
  const result = {};//定义对象存储数值
 
  queryArgs.forEach((arg) => {//遍历数组
    const idx = arg.indexOf('=');//找到字符中是=的下标
 
    if (idx >= 0) {//当下表大于0，即存在=时
      let name = arg.substr(0, idx);//将=号之前  即name
      let value = decodeURIComponent(arg.substr(idx + 1));//加密value
 
      if (specialValues.hasOwnProperty(value)) {//当有值是true false 或者undefined时
        value = specialValues[value];//将value变成true false undefined
      }
       
      if (name.substr(-2) === '[]') {
       
        name = decodeURIComponent(name.substr(0, name.length - 2));
 
        if (!Array.isArray(result[name])) {
          result[name] = [];//将name键赋值为[]空数组值
        }
 
        result[name].push(value);//将resultpush成值
      } else {
        name = decodeURIComponent(name);
        result[name] = value;
      }
    } else {
      if (arg.substr(0, 1) === '-') {
        result[decodeURIComponent(arg.substr(1))] = false;
      } else if (arg.substr(0, 1) === '+') {
        result[decodeURIComponent(arg.substr(1))] = true;
      } else {
        result[decodeURIComponent(arg)] = true;
      }
    }
  });
 
  return result;
}
 
module.exports =parseQuery;