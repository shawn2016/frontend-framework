/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-04 19:24:27
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-04 19:50:00
 */
var loaderUtils = require('loader-utils')

function loader(source) {
  // 我们在style-loader中导出一个脚本
  console.log(source)
  let str = `
    let style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `;
  console.log(str)
  return str;
}
// 在style-loader上写了pitch
loader.pitch = function(remainingRequest) {
  //剩余的请求
  // 让style-loader去处理less-loader!css-loader ./index.less
  let str = `
    let style = document.createElement("style");
    style.innerHTML = require(${loaderUtils.stringifyRequest(
      this,
      "!!" + remainingRequest
    )});
    document.head.appendChild(style);
  `; // require()返回的就是css-loader处理后的结果，stringifyRequest会把绝对路径转化为相对路径，而“！！”前边提到过，意思是只使用这个行内loader
  return str;
};
module.exports = loader;