//售楼
var saleOffices ={} //定义函数
saleOffices.clients =[];//客户的列表

//添加订阅者
saleOffices.on=function(fn){
  this.clients.push(fn)
}
//发布消息
saleOffices.emit=function(){
  for(var i=0;i<this.clients.length;i++){
    var fn = this.clients[i];
    fn.apply(this,arguments)
  }
}
saleOffices.on(function(name,price,squareMeter){//小明订阅消息
  console.log("亲爱的"+name+",此时售楼处存在面积为"+squareMeter+"的房子，价格为"+price)
});
saleOffices.on(function(name,price,squareMeter){//小红订阅消息
  console.log("亲爱的"+name+",此时售楼处存在面积为"+squareMeter+"的房子，价格为"+price)
});
saleOffices.emit("小明","100万",100);
saleOffices.emit("小红","100万",200);


/**
 * 亲爱的小明,此时售楼处存在面积为100的房子，价格为100万
 * 亲爱的小明,此时售楼处存在面积为100的房子，价格为100万
 * 亲爱的小红,此时售楼处存在面积为200的房子，价格为100万
 * 亲爱的小红,此时售楼处存在面积为200的房子，价格为100万
 */

 console.log("%c 增加key值的发布订阅模式",'color:red;font-size:14px;')
 //改进的
 var saleOffices1={}//定义售楼处

saleOffices1.clients =[];//缓存列表，存放订阅者的回调函数
saleOffices1.on=function(key,fn){
  if(!this.clients[key]){
    this.clients[key]=[]
  }
  this.clients[key].push(fn)
}

//发布函数 
saleOffices1.emit=function(){
  var key= Array.prototype.shift.call(arguments);//取出消息类型
  var fns  =this.clients[key];
  if(!fns||fns.length==0){
     console.log("当前无此订阅的消息")
     return false
  }
  for(var i=0,fn;fn=fns[i++];i<fns.length){
     fn.apply(this,arguments) //arguments是发布消息时附送的参数
  }
}
saleOffices1.remove=function(key,reFn){
  console.log(this.clients)
  var fns  = this.clients[key]; 
  if(!fns || fns.length ==0){
    console.log("无当前订阅信息")
  }
  if(reFn){
    for(var i=fns.length-1;i>=0;i--){
      var fn = fns[i];  
      if(fn == reFn){
         fns.splice(i,1)
      }
    } 
  }else{
    console.log("请添加要删除的订阅者信息")
  }
}

//添加一个订阅者
saleOffices1.on("squareMeter100",fn1 = function(price){
  console.log("价格"+price)
})
saleOffices1.on("squareMeter88",fn2 =function(price){
  console.log("价格"+price)
})
saleOffices1.remove('squareMeter88',fn2)
saleOffices1.emit('squareMeter88',120)
saleOffices1.emit('squareMeter100',99)



//通用函数 将售楼信息进行封装

var event = {
  clientList:[],
  on:function(key,fn){
    if(!this.clientList[key]){
      this.clientList[key]=[]
    }
    this.clientList[key].push(fn) //订阅消息进入消息列表
  },
  emit:function(){
    var key= Array.prototype.shift.call(arguments);//取出消息类型
    var fns  =this.clientList[key];
    if(!fns||fns.length==0){
       console.log("当前无此订阅的消息")
       return false
    }
    for(var i=0,fn;fn=fns[i++];i<fns.length){
       fn.apply(this,arguments) //arguments是发布消息时附送的参数
    }
  },
  remove:function(key,fn){
    var fns  = this.clientList[key]; 
    if(!fns || fns.length ==0){
      console.log("无当前订阅信息")
    }
    if(reFn){
      for(var i=fns.length-1;i>=0;i--){
        var fn = fns[i];  
        if(fn == reFn){
           fns.splice(i,1)
        }
      } 
    }else{
      console.log("请添加要删除的订阅者信息")
    }
  }
}
//给所有的对象都动态安装发布—订阅功能：
var installEvent = function(obj){
  for(var i in event){
    obj[i] =event[i]
  }
}

//进行动态添加发布-订阅功能

var salesOffices2 ={}
installEvent(salesOffices2) 
salesOffices2.on( 'squareMeter88', function( price ){ // 小明订阅消息
  console.log( '价格= ' + price );
});
salesOffices2.on( 'squareMeter100', function( price ){ // 小红订阅消息
  console.log( '价格= ' + price );
});
console.log(salesOffices2)
salesOffices2.emit( 'squareMeter88', 2000000 ); // 输出：2000000
salesOffices2.emit( 'squareMeter100', 3000000 ); // 输出：3000000