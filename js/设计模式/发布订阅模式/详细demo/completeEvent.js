
var Event = (function(){
  var global = this;
  Event,
  _default="default"; //默认的命名空间为default
  Event=function(){
    var _on, //内部订阅⌚️
        _emit, //内部的发布事件
        _remove,//内部移除事件
        _slice = Array.prototype.slice, //获取当前对象
        _shift = Array.prototype.shift,//数组的第一个元素从其中删除,并返回第一个元素的值
        _unshift = Array.prototype.unshift, //方法可向数组的开头添加一个或更多元素,并返回新的长度。
        namespaceCache={}, //当前发布订阅的命名空间
        _create,//内部创建一个命名空间的订阅事件
        find,
        // ary 发布任务列表 fn为参数
        each=function(ary,fn){
          var ret ;
          for(var i=0,l=ary.length;i<l;i++){
              var n = ary[i]; //当前函数的存储值
              ret=fn.call(n,i,n);
          }
          return ret;
        };
        _on=function(key,fn,cache){
          if(!cache[key]){
            cache[key]=[];
          }
          cache[key].push(fn); //内部增加订阅事件
        };
        //内部移除订阅事件
        _remove =function(key,cache,fn){
          //检测当前cache中是否存在当前的订阅事件
          if(cache[key]){
            if(fn){ //检测是否添加了移除的订阅事件函数
              for(var i=cache[key].length;i>=0;i--){
                if(cache[i]==fn){
                  //存在当前需要移除的订阅事件函数
                   cache[key].splice(i,1)
                }
              }
            }else{
              //如果当前要移除的key不存在
              cache[key]=[];
            }
          }
        };
        //发布
        _emit=function(){
          var cache = _shift.call(arguments), // 获取当前的第一个cache
          key = _shift.call(arguments), //arguments的第二个元素key的值
          args=arguments, //剩下的为其他的参数
          _self=this,
          ret,
          stack=cache[key]; //获取当前key的值的对应的发布任务列表
          if(!stack || !stack.length){
            return ;
          }
          return each(stack,function(){
            return this.apply(_self,args)
          })

        };
        //内部create创建命名空间的函数
        _create = function(namespace){
          var namespace = namespace || _default;
          var cache ={},//存储的发布订阅事件
          offlineStack = []//离线事件
          ret={
            on:function(key,fn,last){
               _on(key,fn,cache); //压入当前的订阅者事件
               if(offlineStack==null){
                  return;
               }
               if(last=='last'){

               }else{
                 each(offlineStack,function(){
                   this();
                 })
               }
               offlineStack=null
            },
            one:function(key,fn,last){
               _remove(key,cache);
               this.on(key,fn,last)
            },
            remove:function(key,fn){
              _remove(key,cache,fn)
            },
            //发布当前的事件
            emit:function(){
              var fn,args,_self=this;
              _unshift.call(arguments,cache);//压入cache于arguments中
              args =arguments; //获取当前的所有参数
              fn=function(){
                return _emit.apply(_self,args);  //调用内部的emit函数
              }
              if (offlineStack){
                return offlineStack.push( fn );//如果当前为离线状态，则先进行存储
               } 
              return fn();
            }
          }
          return namespace ? 
          (namespaceCache[namespace] ? namespaceCache[namespace]:namespaceCache[namespace]=ret)
          :ret;
        }
        return {
          //返回event的当前已经封装好的函数
          create:_create,
          //发布订阅一次
          one:function(key,fn,last){
            var event = this.create();
            event.one(key,fn,last);
          },
          //移除当前的订阅事件
          remove:function(key,fn){
            var event =this.create();
            event.remove(key,fn)
          },
          //订阅当前的事件 
          on:function(key,fn,last){
            var event = this.create();
            event.on(key,fn,last);
          },
          //发布当前的
          emit:function(){
            var event = this.create(); 
            event.emit.apply(this,arguments);
          }
        }
  }();
  return Event;
})()
console.log(Event)
/**************使用命名空间********************/ 
Event.create('namespace1').on('click',fn1=function(a){
  console.log(a);    //输出：1
});

Event.create('namespace1').emit('click',1);
Event.create('namespace2').on('click',function(a){
  console.log(a);    //输出：2
});
Event.create('namespace2').emit('click',2);

Event.create('namespace1').on("add",fn1) 

Event.on('click',function(name){
  console.log(name)
})
Event.emit('click',"yanyanyan")
Event.emit('click',"yangyangyang")

console.log(Event) 