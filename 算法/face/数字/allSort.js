/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-06 13:47:37
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-06 14:16:34
 */

function permutate(str) {
  var result = [];

  if(str.length > 1) {
      var left = str[0];
      var rest = str.slice(1, str.length);
      //排列剩余的字符串
      var preResult = permutate(rest);
      //获取到后 应该是一个二维的数组，遍历进行压入
      for(var i=0; i<preResult.length; i++) {
        for(var j=0; j<preResult[i].length; j++) {
            var tmp = preResult[i].slice(0, j) + left + preResult[i].slice(j, preResult[i].length);
            result.push(tmp);
        }
    }
  } else if (str.length == 1) {
      return [str];
  } 
  return result;
}
let result = permutate('1235')
console.log(result)