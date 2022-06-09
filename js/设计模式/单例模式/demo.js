//单例模式
var SingleItem = function(name){
  this.name = name;
  this.instance = null;
}
SingleItem.prototype.getName = function(){
  console.log(this.name)
}
SingleItem.prototype.setName = function(name){
  this.name = name
}
SingleItem.getInstance = function(name){
  if(!this.instance){
    this.instance = new SingleItem(name)
  }  
  this.instance.setName(name)
  console.log(this.instance)
  return this.instance;
}
//缺点：创建一个单例，单例之间具有耦合性
var a = SingleItem.getInstance('s')
var b = SingleItem.getInstance('b')
console.log(b)

//其他的方式
var SingleItem1 = function(name){
  this.name = name; 
}
SingleItem1.prototype.getName = function(){
  console.log(this.name)
}
SingleItem1.prototype.setName = function(name){
  this.name = name
}
SingleItem1.getInstance=(function(){
  var instance = null;
  return function(name){
    if(!instance){
      instance = new SingleItem1(name)
    }
    instance.setName(name)
    return instance
  }
})()

var a1 = SingleItem1.getInstance('s')
console.log(a1)
var b1 = SingleItem1.getInstance('b')
console.log(b1)


//透明单例
var CreateDiv = (function () {
  var instance;
  var CreateDiv = function (html) {
    if (instance) {
      return instance;
    }
    this.html = html;
    this.init();
    return instance = this;
  };
  CreateDiv.prototype.init = function () {
    var div = document.createElement('div');
    div.innerHTML = this.html;
    document.body.appendChild(div);
  }; 
  return CreateDiv;
})();

var a = new CreateDiv('ma11');
var b = new CreateDiv('maf22');
console.log(a)
console.log(b)