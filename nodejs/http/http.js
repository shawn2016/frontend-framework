//导入模块使用
const http = require('http');


//创建服务
const proxy = http.createServer(function(req,res){ 
  console.log("服务在127.0.0.1:8888端口启动")
  //设置下请求头格式
  res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});  
  
  //req请求信息 包含请求头等信息
  // console.log("请求头")
  // console.log(req)

  // console.log("响应头信息")
  // console.log(res)


  // req.abort()


 
  //  res.end("服务启动成功了")
  res.end('ddd','eee',function(){
    console.log("数据传输成功")
  })

 })

//Agent
//  http.get({
//   hostname: 'localhost',
//   port: 8888,
//   path: '/',
//   agent: false  // 仅为此一个请求创建一个新代理。
// }, (req,res) => {
//   // 用响应做些事情。
//   console.log(req) 
// });



//new Agent ()
// var options ={
//   keepAlive:false,//即使没有未完成的请求，也要保持套接字，这样它们就可以被用于将来的请求而无需重新建立 TCP 连接
//   keepAliveMsecs: 3000,//当使用 keepAlive 选项时，指定用于 TCP Keep-Alive 数据包的初始延迟。当 keepAlive 选项为 false 或 undefined 时则忽略。默认值: 1000。
//   maxSockets: Infinity,//每个主机允许的套接字的最大数量。
//   maxFreeSockets:256,//空闲状态下保持打开的套接字的最大数量。仅当 keepAlive 被设置为 true 时才相关。默认值: 256。
//   timeout:400,//套接字的超时时间，以毫秒为单位。这会在套接字被连接之后设置超时时间。
// }

// const keepAliveAgent = new http.Agent({ keepAlive: true });
// options.agent = keepAliveAgent;
// http.request(options, (res)=>{
//   console.log(res);
// });


//connect 
proxy.on('connect', (req, cltSocket, head) => {
  // 连接到原始服务器。
  console.log("监听链接事件")
});

//continue 事件
// 当服务器发送 100 Continue HTTP 响应时触发，通常是因为请求包含 Expect: 100-continue。 这是客户端应发送请求主体的指令。


//information  
// const options = {
//   host: '127.0.0.1',
//   port: 8888,
//   path: '/length_request'
// };
 
// const req = http.request(options);
// console.log(req)
// req.end();

//服务器发送 1xx 中间响应（不包括 101 Upgrade）时触发。 此事件的监听器将会接收一个对象，该对象包含 HTTP 版本，状态码，状态消息，键值对请求头对象、以及具有原始请求头名称和值的数组。
// req.on('information', (info) => {
//   console.log(`获得主响应之前的信息: ${info.statusCode}`);
// });

//upgrade 每次服务器响应升级请求时发出。 如果未监听此事件且响应状态码为 101 Switching Protocols，则接收升级响应头的客户端将关闭其连接。




proxy.on('upgrade', (req, socket, head) => {
  socket.write('HTTP/1.1 101 Web Socket Protocol Handshake\r\n' +
               'Upgrade: WebSocket\r\n' +
               'Connection: Upgrade\r\n' +
               '\r\n');

  socket.pipe(socket); // 响应回去。
});




//http

 
proxy.listen(8888, '127.0.0.1', () => {
    
});




