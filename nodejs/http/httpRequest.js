 
const http = require('http')
 //getHeader
http.createServer(function(req,res){ 
  console.log("服务在127.0.0.1:8888端口启动")
  //设置下请求头格式
  res.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});  
  res.end('ddd','eee',function(){
    console.log("数据传输成功")
  })
 }).listen(8888);


 
const request = http.request();
request.setHeader('content-type', 'text/html'); 
request.setHeader('Cookie', ['type=ninja', 'language=javascript']);
const contentType = request.getHeader('Content-Type');
console.log(contentType)
// request.end();

