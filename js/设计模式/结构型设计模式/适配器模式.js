//参数适配

//一个方法传递多个参数
/**
 * obj.name :name
 * obj.age  :age
 * obj.sex  :sex
 * obj.size :size
 */
function getParams(obj){
  //保障在调用的时候全部传递进来
  //编写默认的文案
  var _adapter ={
    name:"ma",
    age:"23",
    size:"133",
    sex:'man'
  }
  for(var key in _adapter){
    //防止参数传入不全导致的出错误的问题 
    _adapter[key] = obj[key] || _adapter[key] 
  }
  console.log("做到了参数适配")
}
//数据适配
var arr = ['《javaScript设计模式》','2017','前端']
//数组中每个的含义表示不一样 
function arrayForObj(arr){
 return {
    name:arr[0],
    year:arr[1],
    offer:arr[2]
  }
}
arrayForObj(arr)

/**
 * 多个人同时进行组件编写，进行调用时 一个的组件调用的方法是show  另外一个时display
 */
var component1 = {
  show:function(){
    console.log("组件1进行展示调用")
  }
}
var component2 = {
  display:function(){
    console.log("组件2进行展示调用")
  }
}
var componentAdapter ={
  show:function(){
    component2.display();
  }
}
var renderMap = function( map ){
  if ( map.show instanceof Function ){
      map.show(); //方法统一化处理
  }
};
renderMap(component1)
renderMap(componentAdapter)
// 为保持两个的一起进行调用展示
