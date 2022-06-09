//导入模块使用
const http = require('http');

//创建服务
var proxy = http.createServer(function(req,res){ 
  console.log("服务在127.0.0.1:8888端口启动")
  //设置下请求头格式
  res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});  
  console.log(res.IncomingMessage) 
  res.end('333')

 })
 var meassge = http.IncomingMessage;
//  console.log(meassge)
 proxy.on('connect', (req, cltSocket, head) => {
  // 连接到原始服务器。
  console.log("监听链接事件")
});

proxy.listen(3000, '127.0.0.1', () => {
    
});
proxy.close()


