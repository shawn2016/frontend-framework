/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-04 14:21:53
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-04 14:22:24
 */
function co(gen) {
  if (typeof gen === 'function') gen = gen.apply(ctx, args);
  onFulfilled();

  function onFulfilled(res) {
    var ret;
    try {
      ret = gen.next(res);
    } catch (e) {
      return reject(e);
    }
    next(ret);
  }
  function next(ret) {
    if (ret.done) return resolve(ret.value);
    var value = toPromise.call(ctx, ret.value);
    if (value && isPromise(value)) return value.then(onFulfilled, onRejected);
    return onRejected(new TypeError('You may only yield a function, promise, generator, array, or object, '
      + 'but the following object was passed: "' + String(ret.value) + '"'));
  }
}

co(function(ctx){
  console.log(2)
})