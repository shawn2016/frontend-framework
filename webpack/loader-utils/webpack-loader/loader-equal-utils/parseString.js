/*
 * @Descripttion: parseString(是将字符串转化为json对象)
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 15:18:31
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 15:18:59
 */

function parseString(str){
  console.log(str)
  try {
      if (str[0] === '"') {
          console.log('我进入了1')
          console.log(str)
          console.log(JSON.parse(str))
        return JSON.parse(str);
      }
  
      if (str[0] === "'" && str.substr(str.length - 1) === "'") {//如果是以''包裹的字符串
      console.log(str)
      console.log('我进入了2')
        return parseString(
          str
            .replace(/\\.|"/g, (x) => (x === '"' ? '\\"' : x))//转化为以""包裹的字符串
            .replace(/^'|'$/g, '"')
        );
      }
  
      return JSON.parse('"' + str + '"');
    } catch (e) {
        console.log('wobaocuole')
        console.log(e);
      return str;
    }
}

module.exports = parseString;