/**
 * 先定义一个获取小气泡节点的工厂，作为对象池的数组成为私有属性被包含在工厂闭包里，这个工厂有两个暴露对外的方法，
 * create表示获取一个div节点，recover表示回收一个div节点。 
 */ 　

 //创建删除 对象不能复用
var toolTipFactory=(function(){
    var toolTipPool =[]; //TOOL的对象池
    return{
     create:function(){
       if(toolTipPool.length ==0){ //当前对象池的内容为空
        var div = document.createElement('div') ; //创建一个dom
        document.body.appendChild(div)
        this.recover(div); //将当前的小气泡压缩到对象池中
        return div;
       
       }else{
         return toolTipPool.shift();
       }
     },
     recover: function( tooltipDom ){
      return toolTipPool.push( tooltipDom ); // 对象池回收dom
    }
  }
})()
var ary = [];
for ( var i = 0, str; str = [ 'A', 'B' ][ i++ ]; ){
    var toolTip = toolTipFactory.create();
    toolTip.innerHTML = str;
    ary.push( toolTip );
};

for ( var i = 0, toolTip; toolTip = ary[ i++ ]; ){
  toolTipFactory.recover( toolTip );
};

for ( var i = 0, str; str = [ 'A', 'B', 'C', 'D', 'E', 'F' ][ i++ ]; ){
  var toolTip = toolTipFactory.create();
  toolTip.innerHTML = str;
};

//在对象工厂里面创建对象池
var objectPoolFactory =function(createObFn){
  var objectPool = [];
  return {
    create:function(){
      //判断当前工厂里面的objectPool是否为空，如果为空则进行创建，如果不为空，则返回第一个 
      var obj = objectPool.length ==0 ? createObFn.apply(this,arguments):objectPool.shift();
      return obj
    },
    recover:function(obj){
      objectPool.push(obj)
    }
  }
};
var iframeFactory = objectPoolFactory(function(){
  var iframe = document.createElement("iframe");
  document.body.appendChild(iframe);
  iframe.onload=function(){
    iframe.onload = null;//防止iframe重复加载
    iframeFactory.recover(iframe) //加载完成后收回节点 放入对象池中
  } 
  return iframe
});

var ifram1= iframeFactory.create();

ifram1.src ='http://www.baidu.com';
console.log(ifram1)

var ifram2= iframeFactory.create();
ifram2.src ='http://QQ.com';
console.log(ifram2)
setTimeout(function(){
  var iframe3 = iframeFactory.create();
  iframe3.src = 'http://163.com';
  console.log(iframe3)
}, 3000 );