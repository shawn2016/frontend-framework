//导入模块使用
const http = require('http'); 
var server=new http.Server();

server.on("request",function(req,response){
  response.setHeader('Content-Type', 'text/html');
  response.setHeader('X-Foo', 'bar');
   //设置下请求头格式
  response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});  
  
   
  var s= response.getHeader('Content-Type') //获得响应头的名字 
  console.log(s)
   
  //socket
  var socket =response.socket;
  // console.log(socket);
  console.log(response.statusCode)

  response.end(`您的 IP 地址是 ${socket.remoteAddress}，您的源端口是 ${socket.remotePort}`)  
});
server.listen(3000);


// //创建服务
// var proxy = http.createServer(function(req,response){ 
//   console.log("服务在127.0.0.1:8888端口启动")
//  })
 
//  proxy.on('connect', (req, cltSocket, head) => {
//   // 连接到原始服务器。
//   console.log("监听链接事件")
// }); 

