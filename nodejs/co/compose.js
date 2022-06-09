/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-04 14:23:59
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-20 10:11:02
 */
const Koa = require('koa');
let app = new Koa();

app.use((ctx,next)=>{
  console.log("第一个中间件---开始")
  next();
  console.log("第一个中间件---结束")
})

app.use((ctx,next)=>{
  console.log("第二个中间件---开始")
  next();
  console.log("第二个中间件---结束")
})

app.use((ctx)=>{
  console.log("准备响应") 
})
console.log(app)

app.listen(4000)
module.exports =3;