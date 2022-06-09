 
const Koa = require('koa')
const app = new Koa()
const KoaRouter = require('koa-router')
app.use(async (ctx,next)=>{
  ctx.set('Access-Control-Allow-Origin',"*")
  await next();
})

const router = new KoaRouter();
router.get('/',async ctx=>{
  ctx.body="服务端的开启路程呀";
})

app.use(router.routes())


app.listen(4000,()=>{
  console.log("服务已经开启")
})