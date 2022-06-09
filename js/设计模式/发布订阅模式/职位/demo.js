
//first 
let corp = {} //自定义一个公司对象
corp.list = [];//存放缓存的回调函数
//订阅事件
corp.on = function(fn){
  //将回调时间存到列表中
  this.list.push(fn)
}

//发布事件
corp.emit = function(){
  //当发布的时候再将列表中存的函数一次执行
  //one 每次emit的时候都会执行一次
  this.list.forEach(fn=>{
    fn.apply(this,arguments)
  })
}

//测试
corp.on(function(position,salary){
  console.log("您的职位是"+position)
  console.log("期望薪水"+salary)
})
corp.on(function(skill,hobby){
  console.log("您的技能"+skill)
  console.log("您的爱好"+hobby)
})

corp.emit('前端',2000);
corp.emit("写代码",'吃东西')
/**
 *  您的职位是前端
    期望薪水2000
    您的技能前端
    您的爱好2000
    您的职位是写代码
    期望薪水吃东西
    您的技能写代码
    您的爱好吃东西
 */

 //second
let corp1 = {} //自定义一个公司对象
corp1.list = {};//存放缓存的回调函数
/**
 * list 的格式
 * {
 *   key:[fn1,fn2]
 * }
 */
//订阅事件
corp1.on = function(key,fn){
  //增加key的值 
  /*如果对象中没有对应的key值 
    也就说明没有被订阅过
    那就给key创建个缓存列表
  */ 
  if(!this.list[key]){
    this.list[key] = []
  }
  //把函数添加到对应的key的缓存列表中
  this.list[key].push(fn)
}

//发布事件
corp1.emit = function(){ 
  //对应key值
  let key = [].shift.call(arguments),
     fns = this.list[key];//取得函数的列表
  // 如果缓存列表里没有函数就返回false
  if(!fns || fns.length ==0){
    return false;
  }
  //遍历key对应的执行列表
  //依次执行函数的方法
  fns.forEach(fn=>{
    fn.apply(this, arguments);
  })
}

//测试
corp1.on('join',function(position,salary){
  console.log("您的职位是"+position)
  console.log("期望薪水"+salary)
})
corp1.on('other',function(skill,hobby){
  console.log("您的技能"+skill)
  console.log("您的爱好"+hobby)
})

corp1.emit('join','前端',2000);
corp1.emit('other',"写代码",'吃东西')