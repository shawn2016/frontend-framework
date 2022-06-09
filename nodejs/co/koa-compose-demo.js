const Promise = require("../../js/promise/Promise");

/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-06 09:50:44
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-06 16:33:05
 */
function compose(middleware){
  if(!Array.isArray(middleware)){
    throw new TypeError('Middleware stack must be an array!')
  }
   //校验函数 
   return function (context, next) {
    // last called middleware #
    let index = -1
    return dispatch(0)
    //调度执行第一个函数
    function dispatch (i) {
      //如果当前的执行函数为空 则返回
      if (i <= index) return Promise.reject(new Error('next() called multiple times'))
      index = i;//设置当前执行为i
      let fn = middleware[i] 
      //如果此时中间件执行完毕，则fn就赋值成next
      if (i === middleware.length) { 
         fn = next //用于调用下一个函数
      } 
      //返回promise1的对象
      if (!fn) return Promise.resolve()
      try {
        //执行当前的this 进行递归调用本身   
        return Promise.resolve( fn(context,  dispatch.bind(null, i + 1) ));
      } catch (err) {
        //执行当前this结束
        return Promise.reject(err)
      }
    }
  }
} 



function myCompose(middleware){
  if(!Array.isArray(middleware)) return;
 
  return function(context,next){
    let index =  -1;
    return dispatch(0);
    //当前递归调用到哪个函数了
    function dispatch(i){
     if(i<=index){
        Promise.reject(new Error('next() called multiple times'))
     }
     index= i;
     let fn = middleware[i];
     if(i == middleware.length) {
      fn = next; 
     }
      
     if(!fn){
       return Promise.resolve()
     }
     try{
        return new Promise(fn(context,dispatch.bind(null,i+1)))
     } catch(err){
       Promise.reject(err)
     }
    }
  }
  }

  function one(ctx,next){
    console.log('第一个');
    next(); // 控制权交到下一个中间件（实际上是可以执行下一个函数） 
    console.log('第一个--结束');
  }
  function two(ctx,next){
    console.log('第二个');
    next();
    console.log('第二个--结束');
  }
  function three(ctx,next){
    console.log('第三个');
    next();
    console.log('第三个--结束');
  }
  let result = myCompose([one,two,three])
  console.log(result())
