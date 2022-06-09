//直接在一个对象上定义一个新属性，或者修改一个已经存在的属性
 /**
   * proxy在目标对象的外层搭建了一层拦截，外界对目标对象的某些操作，必须通过这层拦截
   */  
  //target表示要拦截的参数 handler 是制定拦截的行为
  //自定义代理对象的各种可代理操作 。它本身一共有13中方法,每种方法都可以代理一种操作.
  var obj = {
    value:"初始默认的值",
    name:"马凤艳"
  }
  var proxy = new Proxy(obj,{
    get:function(obj,key){ 
     return obj[key]
    },
    set:function(obj,key,val){
      obj.value= val  //对对象进行赋值
      document.querySelector("#proxyText").innerHTML="proxyText输入框的值变成了"+val
    },
    getPrototypeOf(){
      console.log('在读取代理对象的原型时触发该操作，比如在执行 Object.getPrototypeOf(proxy) 时。')
      return null
    },
    setPrototypeOf(){
      console.log(arguments)
      console.log('在设置代理对象的原型时触发该操作，比如在执行 Object.setPrototypeOf(proxy, null) 时。')
     return arguments[0] //返回当前新的

    },
    isExtensible(){
      console.log(arguments)
      console.log("在判断一个代理对象是否是可扩展时触发该操作，比如在执行 Object.isExtensible(proxy) 时。")
   
      return true
    },
    preventExtensions(obj){
      console.log(arguments)
      console.log("在让一个代理对象不可扩展时触发该操作，比如在执行 Object.preventExtensions(proxy) 时。")
      return false
    },
    getOwnPropertyDescriptor(){
      console.log('在获取代理对象某个属性的属性描述时触发该操作，比如在执行 Object.getOwnPropertyDescriptor(proxy, "foo") 时。')
    },
    defineProperty(obj,key,value){
      console.log(arguments)
      console.log('在定义代理对象某个属性时的属性描述时触发该操作，比如在执行 Object.defineProperty(proxy, "foo", {}) 时。')
       obj[key]=value;
       return obj
    },
    has(){
     console.log('在判断代理对象是否拥有某个属性时触发该操作，比如在执行 "foo" in proxy 时。但是在for...in 中无效')
    },
    deleteProperty(obj,key){ 
     delete obj[key]
      console.log("在删除代理对象的某个属性时触发该操作，比如在执行 delete proxy.foo 时。");
    },
    ownKeys(){
      console.log('在获取代理对象的所有属性键时触发该操作，比如在执行 Object.getOwnPropertyNames(proxy) 时。')
    },
    apply(){
      console.log("在调用一个目标对象为函数的代理对象时触发该操作，比如在执行 proxy() 时。")
    },
    construct(){
      console.log(' 在给一个目标对象为构造函数的代理对象构造实例时触发该操作，比如在执行new proxy() 时。')
    }
   }) 
   console.log(obj)
  //进行更改时候
  obj.value = '33' //不会触发proxy的拦截函数
  proxy.value="会触发拦截函数"
  console.log(obj)
  function oninputValue(e){ 
    //  obj.value = e.value   //外界直接更改对象.属性名字时候不会触发proxy的代理拦截
     proxy.value = e.value //必须更改拦截器名字才可以更改内部的set
     proxy.name="呀呀呀"
     console.log(proxy) 
     console.log(obj) //外界进行访问的时候始终是一个初始定义的值
  }


  Object.getPrototypeOf(proxy) //触发hander里面的getPrototypeOf
  Object.setPrototypeOf(proxy,null)
  Object.isExtensible(proxy)
  // Object.preventExtensions(proxy) //
  Object.getOwnPropertyDescriptor(proxy, "foo")
 
  Object.defineProperty(proxy, "foo", {})
  console.log(proxy)
  // Object.has("foo" in proxy)
  delete proxy.foo
  console.log(proxy)
 
/**
 * 拦截和监视外部对对象的访问
 * 降低函数或类的复杂度
 * 在复杂操作前对操作进行校验或对所需资源进行管理
 */


 //应用场景
 //1.实现私有变量无法访问
 var target = {
   _data:"私有数据变量",
   _api:'哈哈哈哈',
   firstName:"ma",
   lastName:"fengyan"
 }
 var RESTRICTED= ['_api','_data']
 target = new Proxy(target,{
   get:function(target,key){ 
     if(key.indexOf("_") >-1){
       console.warn("私有变量无法访问")
       return null
     }
     return target[key]
   },
   set:function(target,key,value){
     if(key.indexOf("_")>-1){
       console.warn("私有变量无法进行赋值")
       return false;
     }
     target[key] =value
   },
   has(target,key){ 
      return (RESTRICTED.indexOf(key) > -1) ?
      false :
      Reflect.has(target, key);
   }
 })
//  target._data="我设置了私有变量"
//  console.log(target._data) //警告
 console.log('_api' in target)
//  遍历target对象
for(var key in target){
  console.log(key)
  console.log(key+' : '+target[key]) //此时是无法识别出私有变量的，不执行has的方法
}

//2.抽离校验模块
let numericDataStore = {  
  count: 0,
  amount: 1234,
  total: 14
};

numericDataStore = new Proxy(numericDataStore, {  
  set(target, key, value, proxy) {
      if (typeof value !== 'number') {
          console.warn("Properties in numericDataStore can only be numbers");
      }
      return Reflect.set(target, key, value, proxy);
  }
});
// 抛出错误，因为 "foo" 不是数值
numericDataStore.count = "foo";
// 赋值成功
numericDataStore.count = 333;

//3.访问日志
/**
 * 对于那些调用频繁、运行缓慢或占用执行环境资源较多的属性或接口，
 * 开发者会希望记录它们的使用情况或性能表现，这个时候就可以使用 
 * Proxy 充当中间件的角色，轻而易举实现日志功能
 */
let api1 = {  
  _apiKey: '123abc456def',
  getUsers: function() { /* ... */ },
  getUser: function(userId) { /* ... */ },
  setUser: function(userId, config) { /* ... */ }
};

function logMethodAsync(timestamp, method) {  
  setTimeout(function() {
      console.log(`${timestamp} - Logging %c${method} %crequest`,'color:red','color:#000');
  }, 0)
}
//proxy 起到中间代理作用，实现在访问的时候进行打印访问事件
api1 = new Proxy(api1, {  
  get: function(target, key, proxy) {
      var value = target[key];
      return function(...arguments) {
          logMethodAsync(new Date(), key);
          return Reflect.apply(value, target, arguments);
      };
  }
});

api1.getUsers();
api1.setUser()

//4预警和拦截
/**
 * 假设你不想让其他开发者删除 noDelete 属性，还想让调用 oldMethod 的开发者了解到这个方法已经被废弃了，
 * 或者告诉开发者不要修改 doNotChange 属性，那么就可以使用 Proxy 来实现
 */
console.log("%c 预警和拦截",'color:red;font-size:14px')
var api3={
  noDelete:"1213",
  getUser:function(){
    console.log("获取到用户条件")
  },
  user:"dd ",
  id:"data",
  _user:"121313",
  _password:"232434"
}
var NODELETE = ['noDelete'];//不能删除的数据
var NOCHANGE = ['id'];//不能进行更改的数据
var PRISTATIC = ['_password','_user'] //私有的数据无法获取
api3 = new Proxy(api3,{
  set(target,key,value){
    if(PRISTATIC.includes(key)|| NOCHANGE.includes(key)){
      console.warn("无法更改此变量属性");
      return false;
    }
    return Reflect.set(target, key, value);
  },
  deleteProperty(target,key){
    if(NODELETE.includes(key)){
      console.warn("当前此属性被保护 无法删除哦");
      return false;
    }
    return Reflect.deleteProperty(target, key);
  },
  get(target,key){
    if(PRISTATIC.includes(key)){
      console.warn("当前不能够进行访问数据")
      return false;
    }
    var val = target[key];
    return typeof val =='function'?
            function(...args) {
              Reflect.apply(target[key], target, args); //去回调当前的函数
          } :val
   }
})
api3._password //当前无法进行数据访问 私有变量
api3._user ='444' //无法更改此变量属 
delete api3.noDelete //当前此属性被保护 无法删除哦
api3.id =333 //无法更改此变量属性
api3.getUser() //获取到用户条件


//5.过滤操作
//6.中断代理
/**
 * Proxy 支持随时取消对 target 的代理，这一操作常用于完全封闭对数据或接口的访问。
 * 在下面的示例中，我们使用了 Proxy.revocable 方法创建了可撤销代理的代理对象：
 */


Proxy.revocable(api3,{})
console.log(api3._user)