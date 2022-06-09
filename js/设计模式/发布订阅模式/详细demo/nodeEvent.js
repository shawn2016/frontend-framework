//实现eventEmitter

function EventEmitter(){
  //用Object.create(null) 代替空对象 不用继承原型链
  this._events = Object.create(null)
  this._count = 0;
}
//默认最多的绑定次数
EventEmitter.defaultMaxListeners = 10; 
//同on 方法 订阅事件
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//返回监听事件的名字
EventEmitter.prototype.eventNames = function(){
  return Object.keys(this._events);
}
//设置最大监听数
EventEmitter.prototype.setMaxListeners = function(n){
  this._count = n
}

//返回监听数目
EventEmitter.prototype.getMaxListeners = function(){
  return this._count ? this._count :this.defaultMaxListeners;
}

//监听
EventEmitter.prototype.on = function(type,cb,flag){
  //默认值 如果没有events则进行创建
  if(!this._events){
    this._events = Object.create(null)
  }

  //查看是否是新
  if(type !== 'newListener'){
    this._events['newListener'] && this._events['newListener'].forEach(listener => {
        listener(type);
    }); 
  }
 
  //查看监听的事件不能超过设置的最大监听数
  if(this._events.length == this.getMaxListeners()){
    console.warn("警告-警告-警告")
    return ;
   }

  //判断当前的_events里面是否存在事件值 如果存在 则进行直接压入 如果不存在 则重新压入
  if(this._events[type]){
    //根据传入的值来判断是在前面增加还是后面增加
    if(flag){
      this._events[type].unshift(cd)
    }else{
      this._events[type].push(cb)
    }
  }else{
    this._events[type] = [cb]
  }
  
}

//在event的前面增加
EventEmitter.prototype.prependListener = function(type,cb){
  this.on(type,cb,true)
}
EventEmitter.prototype.prependListener = function(type,cb){
  this.once(type,cb,true)
}

//监听一次 
EventEmitter.prototype.once=function(type,cb,flag){
  let self = this;
  //先绑定
  function wrap(){
    cb(...arguments);
    //执行完本次后就立刻进行删除操作
    self.removeListener(type,wrap);
  }
  wrap.listen = cb;
  //先绑定 wrap在进行解绑
  this.on(type,wrap,flag)
}
//移除监听的事件 
/**
 * _events 中如果存在当前type的监听事件 则进行移除
 */
EventEmitter.prototype.removeListener = function(type,cb){
  if(this._events[type]){
    for(var i =0;i<this._events[type].length;i++){
       if(cb== this._events[type][i]){
         this._events[type].splice(i,1)
       }
    }
    // this._events[type] = this._events[type].filters(listener=>{
    //   return cd !==listener && cb !==listener.listen;
    // })
  }
}
//移除锁头的监听类型
EventEmitter.prototype.removeAllListener = function(){
   this._events = Object.create(null);
}
//返回所有的监听类型
EventEmitter.prototype.listener = function(type){
  return this._events[type]
}
//发布
EventEmitter.prototype.emit = function(){
  var type = Array.prototype.shift.call(arguments);
  if(this._events[type]){
    this._events[type].forEach(listener=>{
      listener.call(...arguments);
    })
  }
}
// module.exports = EventEmitter;
// 
var myevent = new EventEmitter();
myevent.setMaxListeners(100)
console.log(myevent)
// myevent.once('get',function(){
//   console.log("绑定一次的事件")
// })
 
myevent.on('get',function(){
  console.log("执行操作")
})
myevent.emit('get','eeee')
myevent.on('newListener',function(){
  console.log("我是新newListener")
})
myevent.emit('newListener')