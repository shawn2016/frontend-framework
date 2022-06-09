/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-04 19:52:31
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-04 19:52:50
 */
function loader(source) {
  let reg = /url\((.+?)\)/g;
  let pos = 0;
  let current;
  let arr = ['let list = [];'];
  while (current = reg.exec(source)) {
      let [matchUrl, g] = current;
      console.log(matchUrl, g);
      let last = reg.lastIndex-matchUrl.length;
      arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`);
      pos = reg.lastIndex;
      // 把g替换成require的写法 =》 url（require('***')）
      arr.push(`list.push('url('+require(${g})+')')`);

  }
  arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
  arr.push(`module.exports = list.join('')`);
  console.log(arr.join('\r\n'));

  return arr.join('\r\n');
}
module.exports = loader;