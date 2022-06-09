/**
 * 发布-订阅事件js
 */
/**
 * 参数：
 * 1.当前事件订阅的最大长度
 * 
 * 功能
 * 1.设置订阅的最大长度
 * 2.获取当前订阅事件的最大长度
 * 3.长期订阅事件on
 * 4.一次订阅事件once
 * 5.移除单个事件
 * 6.移除多个事件
 * 7.返回监听事件的名字
 */


//定义错误提示
const Error_code = 1,
      OK_code=0;
var EventEmitter =function(){
  this._maxListeners = 100;
  this._events = Object.create(null);//创建对象，能够继承原型
  this._shift = Array.prototype.shift;
  this._unshift = Array.prototype.unshift;
}
//设置订阅的最大长度
EventEmitter.prototype.setMaxListener = function(number){
  if(typeof number == 'number'){
    //校验是否是number类型，必须是整数
    this._maxListeners = number;
  }else{
    return {
      code:Error_code,
      msg:"请设置正确的订阅者数量"
    }
  }
}
//获取订阅者的最大长度
EventEmitter.prototype.getMaxListener = function(){
  return this._maxListeners ;
}
//设置订阅事件函数
/**
 * 数据校验，type是否是字符串
 * cd是否是函数
 * prepend 默认为false
 */
EventEmitter.prototype.on = function addListener(type,cb,prepend){
  /**
   * 判断当前type是否已经存在监听者对象，存在则直接进行压入，不存在则进行初始化
   */
  if(!this._events){
    this._events=Object.create(null)
  }
   //校验type是否合理 cd是否是函数
   if(typeof type !== 'string')
  
  //如果当前的监听数据
  if(this._events[type].length >=this._maxListeners){
    return {
      code:Error_code,
      msg:"无法在继续添加数据监听了"
    }
  }
  //数据校验通过
  //当前存在该type的订阅数目
  if(this._events[type]){
    if(prepend){
      this._events[type].unshift(cb)
    }else{
      this._events[type].push(cb)
    }
  }else{
    this._events[type]=[cb]
  }
}
//增加addListener同名函数
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//只绑定一次的函数
EventEmitter.prototype.once=function(type,cd,prepend){
  //为当前函数增加一次订阅事件
  var onceFunction =function(){
    cd && cd.call(...arguments)
    this.removeListener(type,onceFunction)
  }
  this.on(type,onceFunction,prepend)
}

//移除单个listener
EventEmitter.prototype.removeListener=function(type,cb){
  //判断当前type是否合格
  if(typeof type !=='string') return exportError(Error_code,'输入正确的type类型')
  if(typeof cb !=='function') return exportError(Error_code,'请输入正确的要移除的监听函数')
  
  var fns = this._events[type];
  if(!fns) return exportError(Error_code,"当前无此类型的订阅者")

  var isRemove = false;
  for(var i=0;i<fns.length;i++){
    if(fns[i] == cb){
      fns.splice(i,1)
      isRemove =true;
    }
  }
  if(isRemove){
    return exportError(OK_code,"此订阅事件移除成功")
  }else{
    return exportError(Error_code,"当前类型下无该订阅操作")
  }
}
//移除所有的监听函数
EventEmitter.prototype.removeAllListener = function(type){
  if(typeof type !=='string') return exportError(Error_code,'请填写正确的移除类型')
   
  if(!type){
    this._events = Object.create(null);
    return exportError(OK_code,"所有监听事件已经移除")
  }else{
    var fns = this._events[type] ;
    if(!fns) return exportError(Error_code,"无此类型的订阅事件")
    delete this._events[type];
    return exportError(OK_code,"当前类型事件已经被删除")
  }
}
//发布订阅者
EventEmitter.prototype.emit=function(){
  //获取第一个参数type
  var type = this._shift.call(arguments);
  fns = this._events[type];
  if(!fns) return exportError(Error_code,"当前无此事件监听，请先订阅");
  for(var i=0;i<fns.length;i++){ 
    fns[i]&& fns[i].call(this,...arguments)
  }
}
//获取当前事件的名字
EventEmitter.prototype.getEventNames=function(){
  return Object.keys(this._events)
}
function exportError(code,msg){
  return{
    code:code,
    msg:msg
  }
}


//存在缺点 类型校验