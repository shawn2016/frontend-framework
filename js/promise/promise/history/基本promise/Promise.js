 
const PENDING ='PENDING';
const RESOLVED ='RESOLVED'; //成功
const REJECTED =  'REJECT' //失败
class Promise{
  //看这个属性 能够在原型上使用
  //看属性是否公用
  constructor(executor){
    this.status =PENDING;
    //成功的值
    this.value = undefined;
    //失败的原因
    this.reason = undefined;

    this.onReslovedCb =[];//成功
    this.onRejectedCb =[];//失败

    //成功函数
    let resolve = (value)=>{
      if(this.status == PENDING){
        this.value = value;
        this.status = RESOLVED
        this.onReslovedCb.forEach(fn=>fn())
      }
    }
    //失败函数
    let reject = (reason)=>{
     if(this.status == PENDING){
       this.reason = reason;
       this.status = REJECTED
       this.onRejectedCb.forEach(fn=>fn())
     } 
    }
    
    try {
        //执行器 默认会立即执行
       executor && executor(resolve,reject);
    }catch(e){
      //执行的时候出现错误
      reject(e)
    }   

  }
  //有两个参数
  then(onfulfilled,onrejected){ 
       if(this.status == RESOLVED){
         onfulfilled(this.value)
       }
       if(this.status == REJECTED){
        onrejected && onrejected(this.reason)
       }
       //如果当前是pending 表示还没返回回来
       if(this.status == PENDING){
         //如果是异步 先订阅好
        this.onReslovedCb.push(()=>{
          //todo...
          onfulfilled(this.value)
        }) 
        this.onRejectedCb.push(()=>{
          //todo...
          onrejected(this.reason)
        }) 
       }
       return this;
  }
}
module.exports = Promise