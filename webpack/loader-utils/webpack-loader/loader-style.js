/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 18:07:44
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 18:40:46
 */
const loaderUtils=require("loader-utils"); 
function loader(source) { 
  let str = `
    let style = document.createElement("style");
    style.innerHTML = ${JSON.stringify(source)};
    document.head.appendChild(style);
  `; 
  console.log(str)
  return str
}
// 在style-loader上写了pitch 在loader执行前执行
//style-loader的作用是将css-loader返回的js符串转成css样式，然后添加到html中。它的导出就用到了pitch方法，原因是因为什么呢？我们知道css-loader最后会导出一段js字符串，里面可能包含需要动态执行的函数。按照正常的执行顺序，style-loader只能拿到这些字符串而并不能把他们转成真正的css代码。因此，在执行css-loader之前，我们需要对在style-loader的pitch方法里面先执行如下代码（已简化）
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
  console.log(str)
  return str;
};
module.exports = loader;