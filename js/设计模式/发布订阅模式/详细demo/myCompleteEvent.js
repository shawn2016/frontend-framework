/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-08 16:25:49
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-08 17:39:30
 */
var Event =(function(){
   //创建当前的Event
   let _self = this;
   let _default = 'default';//默认的命名空间
   let  namespaceCache={}, //命名空间存储函数
   _shift = Array.prototype.shift,//数组的第一个元素从其中删除,并返回第一个元素的值
   _unshift = Array.prototype.unshift, //方法可向数组的开头添加一个或更多元素,并返回新的长度。
   _each = function (fnLists,fn) {
    var ret ;
    for(var i=0,l=fnLists.length;i<l;i++){
        var n = fnLists[i]; //当前函数的存储值
        ret=fn.call(n,i,n);
    }
    return ret;
   }
   _on = function(key,fn,cache) {
     //判断当前cache中该key是否存在
     if(!cache[key]){
      cache[key] = []
     }
     cache[key].push(fn)     
   }
   _emit = function() { 
     var cache = _shift.call(arguments),
     key = _shift.call(arguments),
     args = arguments,//参数 传入过来的参数
     _that = this;
     var stack = cache[key]; 
     //此时无数九
     if(!stack || stack.length ==0){
       console.warn("当前空间下面无参数")
     }
    //  执行每个 参数
     return _each(stack,function(){
       return this.apply(_that,args);
     }) 
   }
   _remove =function(key,cache,fn){ 
     //检测当前cache中是否存在当前的订阅事件
     if(cache[key]){
      if(fn){ //检测是否添加了移除的订阅事件函数 
        for(var i=cache[key].length;i>=0;i--){ 
          if(cache[key][i]==fn){ 
            //存在当前需要移除的订阅事件函数
             cache[key].splice(i,1)
          }
        }
      }else{
        //如果当前要移除的key不存在
        cache[key]=[];
      }
    }
   }
   _create= (namespace = _default)=> {
      var cache ={};//存储的发布订阅事件
      let ret = {
        on:(key,fn,last)=>{
           _on(key,fn,cache);
        },
        emit:function (){ 
          if(!arguments[0]) return ;
          let _that = this;
          let args = arguments 
          //去调用内部的函数
          var fn =function(){
            return _emit.call(_that,cache,...args)
          }
          return fn();   
        },
        once:function(key,fn,last){
          function wrap(){ 
             fn(...arguments)
             //绑定切只执行一次 然后就删除
             _remove(key,cache,wrap);
          } 
          //不会存储
          this.on(key,wrap,last);
         
        },
        remove:(key,fn)=>{
           _remove(key,cache,fn)
        },
        cache:cache 
      }
      return namespace ?  (namespaceCache[namespace] ? namespaceCache[namespace]:namespaceCache[namespace]=ret) : ret ;  
     
   }
   return{
     create:_create,//创建命名空间函数
     //订阅事件
     on:function (key,fn,last){
      var event = this.create();
       event.on(key,fn,last);
       return event;
     },
     //发布事件
     emit:()=>{
      var event = this.create(); 
      event.emit.apply(this,arguments);
     },
     //订阅一次事件
     once:(key,fn,last)=>{
      var event = this.create();
      event.once(key,fn,last);
     },
     //移除事件
     remove:(key,fn)=>{
      var event =this.create();
      event.remove(key,fn)
     }
   }
  
})()