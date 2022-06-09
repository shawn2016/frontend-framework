/**
 * 手机购买的页面，在购买流程中，
 * 可以选择手机的颜色以及输入购买数量，
 * 同时页面中有两个展示区域，分别向用户展示刚刚选择好的颜色和数量。
 * 还有一个按钮动态显示下一步的操作，需要查询该颜色手机对应的库存，
 * 如果库存数量少于这次的购买数量，按钮将被禁用并且显示库存不足，
 * 反之按钮可以点击并且显示放入购物车
 */
/**
 *选择颜色: 
 <select id="colorSelect">
    <option value="">请选择</option>
    <option value="red">红色</option>
    <option value="blue">蓝色</option>
  </select><br>
  输入购买数量: <input type="text" id="numberInput"/><br>
  您选择了颜色: <div id="colorInfo"></div><br/>
  您输入了数量: <div id="numberInfo"></div><br/>
  <button id="nextBtn" disabled="true">请选择手机颜色和购买数量</button>
 */
 
var goods = {
  //颜色|内存 ： 数量
  'red|32G':3,
  'red|16G':6,
  'blue|16G':6,
  'blue|32G':6,
}
var mediator =(function(){

  var colorSelect = document.getElementById( 'colorSelect' ), 
      memorySelect = document.getElementById( 'memorySelect' ), 
      numberInput = document.getElementById( 'numberInput' ), 
      colorInfo = document.getElementById( 'colorInfo' ), 
      memoryInfo = document.getElementById( 'memoryInfo' ), 
      numberInfo = document.getElementById( 'numberInfo' ), 
      nextBtn = document.getElementById( 'nextBtn' );
  var infoMsg={
    'color':'请选择手机颜色',
    'memory':"请选择手机内存",
    'number':"请输入正确的购买数量",
    'error':"内存不够"
  }
  var _alertInfo =function(type,msg){
    nextBtn.disabled =true;
    nextBtn.innerHTML = infoMsg[type] || msg;
  }
  return {
    //用于监听事件变化
    changed:function(el){
      var color = colorSelect.value,
          number = numberInput.value,
          memory = memorySelect.value,
          stock = goods[color+'|'+memory];
      //获取当前选择的元素事件
      switch(el){
        case colorSelect: 
          colorInfo.innerHTML = color;
          break;
        case  memorySelect:
          memoryInfo.innerHTML = memory;
        case numberInput:
          numberInfo.innerHTML = number;
      }  
      //验证数量
      if(!color){
        _alertInfo('color');
        return;
      }
      if(!memory){
        _alertInfo('memory');
        return;
      } 
      if(( ( number - 0 ) | 0 ) !== number - 0 || !number){
        _alertInfo('number');
        return 
      }
      //内存是否还能足够
      console.log(stock)
      if(stock < number){
        _alertInfo('error');
        return 
      }
      nextBtn.disabled = false;
      nextBtn.innerHTML = "放入购物车"
    }
  }
})()
// 事件函数：
colorSelect.onchange = function(){ 
  mediator.changed( this );
};
memorySelect.onchange = function(){ 
  mediator.changed( this );
};
numberInput.oninput = function(){ 
  mediator.changed( this );
};