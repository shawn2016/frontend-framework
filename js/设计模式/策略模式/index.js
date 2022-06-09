
//函数绩效奖金

var calculateBonus = function( performanceLevel, salary ){
    if ( performanceLevel === 'S' ){
        return salary * 4;
    }
    if ( performanceLevel === 'A' ){
        return salary * 3;
    }
    if ( performanceLevel === 'B' ){
        return salary * 2;
    }
};
calculateBonus( 'B', 20000 ); // 输出：40000
calculateBonus( 'S', 6000 ); // 输出：24000

//改善

function performanceLevelA(salary){
    return salary * 3;
}
function performanceLevelS(salary){
    return salary * 4;
}
function performanceLevelB(salary){
    return salary * 2;
}

var calculateBonus = function( performanceLevel, salary ){
    // if ( performanceLevel === 'S' ){
    //     return performanceS( salary );
    // }
    // if ( performanceLevel === 'A' ){
    //     return performanceA( salary );
    // }
    // if ( performanceLevel === 'B' ){
    //     return performanceB( salary );
    // }
};
calculateBonus( 'A' , 10000 ); // 输出：30000
//此时增加C


//使用策略模式

/* var performanceS =function(){}
performanceS.property.calculate =function(salary){
    return salary *4;
}

var performanceA =function(){}
performanceS.property.calculate =function(salary){
    return salary *3;
}
var performanceB =function(){}
performanceS.property.calculate =function(salary){
    return salary *2;
}

//定义奖金类

var Bonus = function(){
    this.salary = null;//原始工资
    this.strategy = null;//绩效等级对应的策略对象
}
Bonus.prototype.setSalary = function(salary){
    this.salary = salary; //设置员工的原始工资
}
Bonus.prototype.setStrategy =function(strategy){
    this.strategy  = strategy ; //设置员工的额登记对应策略对象
}
Bonus.prototype.getBonus =function(){ //取得奖金数数额
    return this.strategy.calculate(this.salary)
}
var bonus = new Bonus();
bonus.setSalary( 10000 );

bonus.setStrategy( new performanceS() ); // 设置策略对象
console.log( bonus.getBonus() ); // 输出：40000
bonus.setStrategy( new performanceA() ); // 设置策略对象
console.log( bonus.getBonus() ); // 输出：30000


var strategies = {
    "S": function( salary ){
        return salary * 4;
    },
    "A": function( salary ){
        return salary * 3;
    },
    "B": function( salary ){
        return salary * 2;
    }
};
var calculateBonus = function( level, salary ){
    return strategies[ level ]( salary );
};
console.log( calculateBonus( 'S', 20000 ) ); // 输出：80000
console.log( calculateBonus( 'A', 10000 ) ); // 输出：30000
*/


//小球动画
var tween = {
    linear: function( t, b, c, d ){
        return c*t/d + b;
    },
    easeIn: function( t, b, c, d ){
        return c * ( t /= d ) * t + b;
    },
    strongEaseIn: function(t, b, c, d){
        return c * ( t /= d ) * t * t * t * t + b;
    },
    strongEaseOut: function(t, b, c, d){
        return c * ( ( t = t / d - 1) * t * t * t * t + 1 ) + b;
    },
    sineaseIn: function( t, b, c, d ){
        return c * ( t /= d) * t * t + b;
    },
    sineaseOut: function(t,b,c,d){
        return c * ( ( t = t / d - 1) * t * t + 1 ) + b;
    }
};
//即将运动的dom节点
var Animate = function( dom ){
    this.dom = dom; // 进行运动的dom 节点
    this.startTime = 0; // 动画开始时间
    this.startPos = 0; // 动画开始时，dom 节点的位置，即dom 的初始位置
    this.endPos = 0; // 动画结束时，dom 节点的位置，即dom 的目标位置
    this.propertyName = null; // dom 节点需要被改变的css 属性名
    this.easing = null; // 缓动算法
    this.duration = null; // 动画持续时间
};
// 接下来Animate.prototype.start方法负责启动这个动画，在动画被启动的瞬间，要记录一些信息，供缓动算法在以后计算小球当前位置的时候使用。在记录完这些信息之后，此方法还要负责启动定时器。代码如下：
/**
 * 
 * @param {*} propertyName 要改变的 CSS 属性名，比如'left'、'top'，分别表示左右移动和上下移动。
 * @param {*} endPos 小球运动的目标位置。
 * @param {*} duration  动画持续时间。
 * @param {*} easing 缓动算法
 */
Animate.prototype.start = function(propertyName,endPos,duration,easing){
    this.startTime = +new Date; // 动画启动时间
    this.startPos = this.dom.getBoundingClientRect()[ propertyName ]; // dom 节点初始位置
    this.propertyName = propertyName; // dom 节点需要被改变的CSS 属性名
    this.endPos = endPos; // dom 节点目标位置
    this.duration = duration; // 动画持续事件
    this.easing = tween[ easing ]; // 缓动算法
    var self = this;
    var timeId = setInterval(function(){ // 启动定时器，开始执行动画
        if ( self.step() === false ){ // 如果动画已结束，则清除定时器
            clearInterval( timeId );
        }
    }, 19 );
}
Animate.prototype.step = function(){
    var t = +new Date();//获取当前时间
    if(t >= this.startTime + this.duration ){
        this.update(this.endPos);//更新小球的css 属性值
        return false;
    }
    var pos = this.easing(t-this.startTime,this.startPos,this.endPos-this.startPos,this.duration)
     // pos 为小球当前位置
     this.update( pos ); // 更新小球的CSS 属性值
}
//更新小球的css属性值
Animate.prototype.update = function( pos ){
    this.dom.style[ this.propertyName ] = pos + 'px';
};
var div = document.getElementById( 'div' );
var animate = new Animate( div );
animate.start( 'top', 1000, 1000, 'sineaseOut' );


//b表单校验

        //封装成策略模式
        var strategies = {
            isNonEmpty :function(value,errorMsg){
                if(value==''){
                    return errorMsg;
             }
            },
            minLength: function( value, length, errorMsg ){ // 限制最小长度
                if ( value.length < length ){
                    return errorMsg;
                }
            },
            isMobile: function( value, errorMsg ){ // 手机号码格式
                if ( !/(^1[3|5|8][0-9]{9}$)/.test( value ) ){
                    return errorMsg;
                }
            }
        }

var Validator = function(){
    this.cache = []; //保存娇艳规则额
}
Validator.prototype.add = function(dom,rule,errorMsg){
    this.cache.push(function(){ // 把校验的步骤用空函数包装起来，并且放入cache
        var strategy = ary.shift(); // 用户挑选的strategy
        ary.unshift( dom.value ); // 把input 的value 添加进参数列表
        ary.push( errorMsg ); // 把errorMsg 添加进参数列表
        return strategies[ strategy ].apply( dom, ary ); //返回执行函数
    });
}
Validator.prototype.start =function(){
    for(var i=0;validatorFunc;validatorFunc =this.cache[i++]){
        var msg = validatorFunc();
        if(msg){
            return msg;
        }
    }
}


   var validataFunc = function(){
       var validator = new Validator();//创建一个validator对象
       /***************添加一些校验规则****************/
        validator.add( registerForm.userName, 'isNonEmpty', '用户名不能为空' );
        validator.add( registerForm.password, 'minLength:6', '密码长度不能少于6 位' );
        validator.add( registerForm.phoneNumber, 'isMobile', '手机号码格式不正确' )
        var errorMsg = validator.start(); // 获得校验结果
        return errorMsg; // 返回校验结果
   }
   //表单提交时候进行校验
   var registerForm = document.getElementById( 'registerForm' );
    registerForm.onsubmit = function(){
        var errorMsg = validataFunc(); // 如果errorMsg 有确切的返回值，说明未通过校验
        if ( errorMsg ){
            alert ( errorMsg );
            return false; // 阻止表单提交
        }
    };