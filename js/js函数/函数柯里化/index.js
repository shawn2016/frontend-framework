/**
 * 计算月度花费
 */
var cost = (function(){
    var args= [];
    return function(){ 
        //如果arguments存在表示进行存储，不是传值
        if(arguments.length ==0){
            var sum = 0;
            args.forEach(item=>{
                sum+=item
            })
            return sum;
        }else{
           [].push.apply(args,arguments)  
        }
    }
})()
cost(100);
cost(200);
cost(300);
console.log("花费总额",cost())


//通用的柯里化函数
var curring = function(fn){
    var args = [];
    return function(){
        if(arguments.length ==0){
            return fn.apply(this,args);

        }else{
            [].push.apply(args,arguments);
        }
    }
}
var cost1 = (function(){
    var money = 0;
    return  function(){
        for(var i=0;i<arguments.length;i++){
            money+=arguments[i]
        }
        return money;
    }

})()
var cost3 = curring(cost1);
cost3(100);
cost3(200);
cost3(100);
console.log(cost3())


//柯里化接受参数
var currying1=function(fn){
    var args = [];
    //储存传值到currying1 函数中的除了fn之外的其他参数，存储到args中
    args = args.concat([].slice.call(arguments,1)) 
    return function(){
        if(arguments.length ==0){
            return fn.apply(this,args)
        }else{
            //将fn中的参数展开，并保存在args中
           [].push.apply(args,arguments);
        }
    }
}
var cost4 = (function () {
    var money = 0;
    return function () {
      for (var i = 0, l = arguments.length; i < l; i++) {
        money += arguments[i];
      } 
      return money;
    }
  })();
  var cost5 = currying1(cost4,100,200); // 转化成 currying 函数 传递函数和一些其他的值
  cost5(100,200); // 未真正cost4求值 
  cost5(300);   // 未真正求值
  console.log((cost5()));  // 求值并输出：900



/**
 * 求值柯里化
 */

var curring3= function(fn){
    //获取fn外的其他参数
    var args = [].slice.call(arguments,1);
    return function(){
        // 获取fn的所有参数
        var innerArgs =[].slice.call(arguments);
        // 最终参数列表重合展开
        var finnalArgs = args.concat(innerArgs);
        //将参数列表展开，并传入fn中
        return fn.apply(null,finnalArgs)
    }
}

var cost6 = (function(){
    var money = 0;
    return function () {
        console.log(arguments)
        for (var i = 0, l = arguments.length; i < l; i++) {
            money += arguments[i];
        } 
      return money;
    }
})()
var costC = curring3(cost6,300,233);
console.log(costC(44))
console.log(costC(2003,444))


/**
 * 反柯里化
 */
Function.prototype.unCurring=function(){
    var _this = this; 
    return function(){
        var obj = Array.prototype.shift.call(arguments);
        return _this.apply(obj,arguments); //更改当前的this指向
    }
}
//另一种方法实现
Function.prototype.currying = function() {
    var _this = this;
    return function() {
        return Function.prototype.call.apply(_this, arguments);
    }
}
// 最终是都把this.method转化成method(this,arg1,arg2....)以实现方法借用和this的泛化
var push = Array.prototype.push.unCurring(),
obj = {}; 
push(obj, 'first', 'two');
console.log(obj); //{0: "first", 1: "two", length: 2}

var toUpperCase =String.prototype.toUpperCase.unCurring();
console.log(toUpperCase('ddd')) //DDD
function arrUpper(ary){
    return ary.map(toUpperCase)
}
console.log(arrUpper(['a','vd','33'])) //["A", "VD", "33"]