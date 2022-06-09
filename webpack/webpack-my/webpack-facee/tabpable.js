 
let {SyncHook} = require('tapable');
let hook  = new SyncHook();
//注册
hook.tap('some name',()=>{
  console.log("some name")
})
//触发
hook.call();