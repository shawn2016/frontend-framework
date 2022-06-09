
var event = {
  loginFn:[],
  on:function(key,fn){
    if(!this.loginFn[key]){
      this.loginFn[key]=[]
    }
    this.loginFn[key].push(fn) //订阅消息进入消息列表
  },
  emit:function(){
    var key= Array.prototype.shift.call(arguments);//取出消息类型
    var fns  =this.loginFn[key];
    if(!fns||fns.length==0){
       console.log("当前无此订阅的消息")
       return false
    }
    for(var i=0,fn;fn=fns[i++];i<fns.length){
       fn.apply(this,arguments) //arguments是发布消息时附送的参数
    }
  },
  remove:function(key,fn){
    var fns  = this.loginFn[key]; 
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

//为登录增加事件
var loginStatus ={}
installEvent(loginStatus)


//header模块
var header = (function(){
  loginStatus.on('loginSuccess',function(data){
    header.setAvatar(data)
  })
  loginStatus.on('loginFail',function(data){
    console.log("登录失败了来来")
  })
  return {
    setAvatar:function(data){
      console.log("设置头部信息")
       document.querySelector('header').innerHTML = "登录后的header"
    }
  }
})()

//nav模块
var nav = (function(){
  loginStatus.on('loginSuccess',function(data){

    nav.setNav(data)
  })
  loginStatus.on('loginFail',function(data){
    console.log("登录失败了来来")
  })
  return {
    setNav:function(data){
      console.log("设置导航信息")
      console.log(data)
      var str = '<p> '+data.data+'</p>'
      document.querySelector('nav').innerHTML=str
    }
  }
})()

//selection模块
var selection = (function(){
  loginStatus.on('loginSuccess',function(data){
    selection.setContent(data)
  })
  loginStatus.on('loginFail',function(data){
    console.log("登录失败了来来")
  })
  return {
    setContent:function(data){
      console.log("设置导航信息")
      document.querySelector('section').innerHTML="登录后内容展示"
    },
  }
})()


//设置登录
//伪数组转化成真数组
/**
 * Array.prototype.slice.call(arr)
 * arr.__proto__ = Array.prototype
 * Array.from(arr)
 */
Array.prototype.slice.call(document.getElementsByClassName("login")).forEach(function(item,index){
   item.onclick=function(el){
    var type = this.getAttribute('data-type') 
    if(type==1){
      loginStatus.emit('loginSuccess',{
        status:0,
        data:"登录成功"
      })
    }else{
      console.log(33)
      loginStatus.emit('loginFail')
    } 
   }
}) 

