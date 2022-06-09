

import _util from './utils'
import InterceptorManage from './interceptorsManage' 
/*
  拷贝为啥不用JSON.parse()
  undefined 和 函数都会被过滤掉
*/

//实现kios
class Kxios{
  constructor(config) {
    //注意深度拷贝 引用没问题 直接引用会存在问题
    this.defaults =_util.deepCopy(config);
    this.interceptors={
      request:new InterceptorManage(),
      response:new InterceptorManage()
    }
  }
  
  get(url,config){
    //把传入的配置与对象的配置进行整合
    this.defaults.url = url;
    //注意本次引用会存在问题
    // this.defaults = Object.assign(this.defaults,config) s
    //将当前的配置和默认的配置进行和合并 注意可能对象存在相同的key的值，因此需要进行同名的key进行替换
    let configs =_util.mergeConfig(this.defaults,config)
    console.log(configs);
 
    //拦截请求在调用之前进行调用
    let promise = Promise.resolve(configs);

    //调用请求拦截器 
    this.interceptors.request.handlers.forEach((handler)=>{
        promise = promise.then(handler.resolveHandler,handler.rejectHander);
    })


    //请求的接口 dispatch 会接收到上一个promise的配置参数 因此不需要重新传参数
    promise=promise.then(this.dispatch,undefined);
 

    //调用响应拦截器
    this.interceptors.response.handlers.forEach((handler)=>{ 
      promise = promise.then(handler.resolveHandler,handler.rejectHander);
    }) 

    //返回新的request
    return promise;  
   
  }
  //去请求的部分
  dispatch(configs){  
    console.log(configs) 
      //调度进行请求
      let adaptor = configs.adaptor(configs);
      return adaptor
  }

}

export default Kxios;