/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-04 14:42:58
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-06 10:05:42
 */
'use strict'

/**
 * Expose compositor.
 */

module.exports = myCompose

/**
 * Compose `middleware` returning
 * a fully valid middleware comprised
 * of all those which are passed.
 *
 * @param {Array} middleware
 * @return {Function}
 * @api public
 */

function compose (middleware) {
  //接收来自koa的中间件
  if (!Array.isArray(middleware)) throw new TypeError('Middleware stack must be an array!')
  for (const fn of middleware) {
    if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
  }

  /**
   * @param {Object} context
   * @return {Promise}
   * @api public
   */
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
  //校验函数 
  return function(context,next){
    let index = -1;//标记当前的执行中间件
    let total = middleware.length;
    return dispatch(0)
    function dispatch(i){
      //判断是否执行完毕
      if(i<=-1){
        return Promise.reject(new Error('next() called multiple times'))
      }
      index = i;
      let fn = middleware[i] 
      //如果此时中间件执行完毕，则fn就赋值成next
      if (i === middleware.length) { 
         fn = next //用于调用下一个函数
      }  
      if(!fn){
        return  Promise.reslove(err)
      }
      try{
        //执行下一个函数 
        return Promise.resolve(fn(context,dispatch.bind(null,i+1)));
      }
      catch(err){
         return Promise.reject(err);
      } 
    } 
  }
}