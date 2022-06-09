const PENDING = 'pending';
const RESOLVED = 'fulfilled'; //成功
const REJECTED = 'rejected' //失败

//判断then里面的函数返回值来进行判断 
//promise都遵循的规范，因此需要进行兼容写法
function resolvePromise(promise2, x, resolve, reject) {
  //判断当前的x是不是promise  是不是同一个 如果是同一个 就不要等待来了 
  if (promise2 === x) {
    return reject(new TypeError("调用存在错误"))
  }
  //如果x是对象或者函数 判断数据类型 
  /**
   * typeof 基本类型
   * constructor 
   * instanceof 判断实例
   * Object.toString
   */
  if (typeof x === 'object' && typeof x !== null || typeof x == 'function') {
    let called; //内部测试的时候，会成功和失败都调用一下

    try {
      //取返回结果 then有可能通过defineProperty定义的
      let then = x.then
      //当前存在then方法 姑且是Promise
      if (typeof then === 'function') {
        //绑定this 到返回的x上，保证不用再次取then的值
        then.call(x, y => {
          if (called) return;
          called = true; //防止多次调用成功和失败
          //y可能还是promisee  //采用promise的成功结果向下传递
          resolvePromise(promise2, y, resolve, reject)
        }, r => {
          if (called) return;
          called = true;
          reject(r) //采用失败结果乡下传递
        }) //保证再次取到then的值
      } else {
        //说明x就是一个普通的对象 直接成功即可
        resolve(x)
      }
    } catch (e) {
      //promise 失败 还能进行调用成功
      //是一个普通的值 直接让promise2成功即可
      if (called) return;
      called = true;
      reject(e)
    }
  } else {
    return resolve(x)
  }
}
 

function isPromise(value) {
  if ((typeof value === 'object' && value !== null) || typeof value === 'function') {
    if (typeof value.then == 'function') {
      return true
    }
  }
  return false;
}

class Promise {
  //看这个属性 能够在原型上使用
  //看属性是否公用
  constructor(executor) {
    this.status = PENDING;
    //成功的值
    this.value = undefined;
    //失败的原因
    this.reason = undefined;

    this.onReslovedCb = []; //成功回调
    this.onRejectedCb = []; //失败回调

    //成功函数
    let resolve = (value) => {
      if (this.status == PENDING) {
        this.value = value;
        this.status = RESOLVED
        this.onReslovedCb.forEach(fn => fn())
      }
    }

    //失败函数
    let reject = (reason) => {
      if (this.status == PENDING) {
        this.reason = reason;
        this.status = REJECTED
        this.onRejectedCb.forEach(fn => fn())
      }
    }
    try {
      //执行器 默认会立即执行
      executor && executor(resolve, reject);
    } catch (e) {
      //执行的时候出现错误
      reject(e)
    }

  }
  //有两个参数
  then(onfulfilled, onrejected) {
    //参数是可选则的参数 需要进行判断是否存在
    onfulfilled = typeof onfulfilled == 'function' ? onfulfilled : data => data
    onrejected = typeof onrejected == 'function' ? onrejected : error => {
      throw error
    }
    //里面的函数会立刻执行
    let promise2 = new Promise((resolve, reject) => {
      //成功的时候
      if (this.status == RESOLVED) { 
        //定时器处理异常 为了保障promise2已经用完了
         setTimeout(() => {
          //try 执行函数的时候会报错 在then里面的数据
          try {
            //x 需要判断是否是promise和规整化  
            let x = onfulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      //失败的时候
      if (this.status == REJECTED) {
        setTimeout(() => {
          try {
            let x = onrejected && onrejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      //如果当前是pending 表示还没返回回来
      if (this.status == PENDING) {
        //如果是异步 先订阅好
        this.onReslovedCb.push(() => {
          //todo... 
          setTimeout(() => {
            try {
              let x = onfulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
        this.onRejectedCb.push(() => {
          //todo...

          setTimeout(() => {
            try {
              let x = onrejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }

          }, 0)
        })
      }

    })
    return promise2;
  }
}
//测试代码 规范检测
//延迟对象 
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}

/**
 * 全部成功才能成功，一个失败才会失败
 * promiseList 表示当前传递的数组对象
 */
Promise.all = function (promiseList) {
  return new Promise((resolve, reject) => {
    let arr = [];
    let index = 0;
    //解决多个异步并发的问题
    function proceessData(key, value) {
      arr[key] = value;
      if (++index == promiseList.length) {
        resolve(arr)
      }
    }
    for (let i = 0; i < promiseList.length; i++) {
      let current = promiseList[i];
      if (isPromise(current)) {
        current.then((data) => {
          proceessData(i, data)
        }, (err) => {
          console.log("data")
          reject(err)
        })
      } else {
        proceessData(i, current)
      }
    }
  })
}

/**
 *  finally 函数 promise m每次执行后都会进行执行
 * @param {*} cb 
 */
Promise.prototype.finally = function (cb) {
  //finally 传入函数，无论成功或者失败都会执行 
  return this.then(data => {
    //Promise.resolve 可以等待这个promise完成
    return Promise.resolve(cb().then(() => data))
  }, err => {
    return Promise.resolve(cb().then(() => {
      throw err
    }))
  })
}

//异常处理 用于指定发生错误时的回调函数。
//promise抛出一个错误，就被catch()方法指定的回调函数捕获
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

/**
 * Promis.resolve 函数
 * @param {*} values 传递进来的变量函数
 */
Promise.resolve = function (values) {
  //1.参数是一个 Promise 实例 将原封不动的返回
  if (values instanceof Promise) {
    return values;
  }
  return new Promise((resolve, reject) => {
    //2.参数是一个含有then对象 具有then方法
    //Promise.resolve()方法会将这个对象转为 Promise 对象，然后就立即执行thenable对象的then()方法。
    if (isPromise(values)) {
      values.then(resolve, reject);
    } else {
      //3.参数不是具有then()方法的对象，或根本就不是对象  如果参数是一个原始值，或者是一个不具有then()方法的对象，则Promise.resolve()方法返回一个新的 Promise 对象，状态为resolved。
      //4.参数不是具有then()方法的对象，或根本就不是对象
      //5.不带有任何参数 
      resolve(values)
    }
  })
}


/**
 * //Promise.reject(reason)方法也会返回一个新的 Promise 实例，该实例的状态为rejected。
 * 参数为values字符串
 */
Promise.reject = function (values) {
  return new Promise((resolve, reject) => {
    reject(values)
  })
}



/**
 * 方法同样是将多个 Promise 实例，包装成一个新的 Promise 实例。
 *  @param {array} promiseList 传递的参数列表对象
 */


Promise.race = function (promiseList) {
  // console.log(promiseList)
  //将values中的内容包装成promi se的 
  if (!Array.isArray(promiseList)) {
    return Promise.resolve();
  }
  promiseList = promiseList.map(item => {
    return !isPromise(item) ? Promise.resolve(item) : item;
  });
  // 有一个实例率先改变状态则进行操作   
  return new Promise((resolve, reject) => {
    promiseList.forEach((pro, index) => {
      console.log(pro)
      pro.then(res => {
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  })
}
/**
 * 方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只有等到所有这些参数实例都返回结果，
 * 不管是fulfilled还是rejected，包装实例才会结束
 */
Promise.allSettled = function (promiseList) {
  return new Promise((resolve, reject) => {
    let index = 0;
    let arr = []

    function recordRequest(key, value) {
      index++;
      arr[key] = value;
      if (index == promiseList.length) {
        resolve(arr)
      }
    }
    for (let i = 0; i < promiseList.length; i++) {
      current = promiseList[i]
      if (isPromise(current)) {
        current.then((data) => {
          recordRequest(i, {
            status: 'resolve',
            value: data
          })
        }, (err) => {
          recordRequest(i, {
            status: 'reject',
            reason: err
          })
        })
      } else {
        recordRequest(i, {
          status: '',
          value: current
        })
      }
    }
  })

}
/**
 * Promise.any()方法接受一组 Promise 实例作为参数，包装成一个新的 Promise 实例。只要参数实例有一个变成fulfilled状态，包装实例就会变成fulfilled状态；如果所有参数实例都变成rejected状态，包装实例就会变成rejected状态。该方法目前是一个第三阶段的提案 。
 * @param {*} promiseList promise的参数列表
 */
Promise.any = function(promiseList){
  promiseList = promiseList.map(item => {
    return !isPromise(item) ? Promise.resolve(item) : item;
  });
  let index = 0; 
  let result=[]
  return new Promise((resolve,reject)=>{
    for (let i = 0; i < promiseList.length; i++) {
      current = promiseList[i]
      if (isPromise(current)) {
        current.then((data) => {
          resolve(data)
        }, (err) => { 
          index++; 
          result.push(err)
          if(index == promiseList.length){
            reject(err);
          } 
        })
      } 
    }
  })
}

/**
 * promise try方法
 * 如果是同步的方法进行同步执行
 * 如果是异步的方法可以用异步进行执行
 * 让同步函数同步执行，异步函数异步执行，并且让它们具有统一的 API 呢？回答是可以的，并且还有两种写法。第一种写法是用async函数来写。
 * 就是模拟try代码块
 */

Promise.try = function (fn, argumnts = null, ...args) { 
  if (typeof fn == 'function') {
    return new Promise(resolve => resolve(fn.apply(argumnts, args)))
  } else {
    const err = new TypeError(`${typeof fn} ${fn} is not a function`);
    return Promise.try(() => {
      throw err
    });
  }
}
module.exports = Promise


Promise.all = function(promiseList){
  if(Array.isArray(promiseList)){
     return false;
  }
  let result=[]
  let index = 0
  return new Promise((resolve,reject)=>{ 
    function processData(i,value){
      result[i] = value
      if(++index == promiseList.length){ 
        resolve(result)
      } 
    }
    for(var i=0;i<promiseList.length;i++){
      let current = promiseList[i]
      if(isPromise(current)){
        current.then((data)=>{
          processData(i,data)
        },(err)=>{
          reject(err)
        })
      }else{
        processData(i,current)
      }
    }
  })
}
