//导入模块使用
const http = require('http');

//创建服务
var proxy = http.createServer(function(req,res){ 
  console.log("服务在127.0.0.1:8888端口启动")
  //设置下请求头格式
  res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});  
 
   res.end("服务启动成功了")
  res.end('ddd','eee',function(){
    console.log("数据传输成功")
  })

 })
 
 proxy.on('connect', (req, cltSocket, head) => {
  // 连接到原始服务器。
  console.log("监听链接事件")
});

// clientError 如果客户端连接触发 'error' 事件，则会在此处转发。 此事件的监听器负责关闭或销毁底层套接字。 例如，用户可能希望使用自定义 HTTP 响应更优雅地关闭套接字，而不是突然切断连接。
proxy.on('clientError', (err, socket) => {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
}); 
proxy.on('close', (err, socket) => {
  console.log("服务器关闭了")
}); 

proxy.timeout=44444;
proxy.listen(8888, '127.0.0.1', () => {
    
});
proxy.close()


