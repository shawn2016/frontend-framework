
//1.0引入模块 
const querystring = require('querystring');
const  url = require('url');

var reqUrl= 'localhost:8080/api?username=demo&passward=none'

var query = url.parse(reqUrl).query; // 

console.log(query) // username=demo&passward=none 
console.log(querystring.decode(query)); // { username: 'demo', passward: 'none' }
console.log(querystring.encode(querystring.decode(query))) //username=demo&passward=none 

/**
 * 
  str <string> 要解析的 URL 查询字符串。
  sep <string> 用于在查询字符串中分隔键值对的子字符串。默认值: '&'。
  eq <string> 用于在查询字符串中分隔键和值的子字符串。默认值: '='。
  options <Object>
    decodeURIComponent <Function> 解码查询字符串中的百分比编码字符时使用的函数。默认值: querystring.unescape()。
    maxKeys <number> 指定要解析的键的最大数量。指定 0 可移除键的计数限制。默认值: 1000。
 */
var queryWhole = querystring.parse('a=3*g=4*y=5','*','=');
console.log(queryWhole) // { a: '3', g: '4', y: '5' }
console.log(querystring.parse('a=3^g=4^y=5','^','=')) //{ a: '3', g: '4', y: '5' }

var queryString = querystring.stringify({ m: '3', g: '4', n: '5' },'@','=')
console.log(queryString)  //m=3@g=4@n=5 
console.log(querystring.stringify({ m: '3', g: '4', n: '5' },'-','=')) //m=3-g=4-n=5

 /**
  * querystring.parse(params1,params2,params3)
  * params1为参数字符串
  * params2为要解析的参数字符串的含义
  * params3是参数key和参数值之间的连接服
  * querystring.stringify(params1,params2,params3)
  * params1为参数对象
  * params2为连接每个参数的连接符号
  * params3为连接每个参数和参数值的符号
  */