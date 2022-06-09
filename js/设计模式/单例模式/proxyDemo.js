var CreateDiv = function(html){
  this.html = html;
  this.el = null
  this.init();
}
CreateDiv.prototype.init = function(){
  var div = document.createElement("div");
  div.innerHTML = this.html;
  this.el = div
  document.body.appendChild(div)
}
CreateDiv.prototype.sethtml = function(html){
  this.el.innerHTML = html
}
//引入代理的单例类
var proxyCreateDiv = (function(){
  var instance;
  return function(html){
    if(!instance){
      instance = new CreateDiv(html)
    }
    instance.sethtml(html)
    return instance;
  }
})();

var a1 = proxyCreateDiv('span1')
var a2 = proxyCreateDiv('span2')
console.log(a1)
console.log(a2)