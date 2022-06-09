 
var http = require('http');
var fs = require('fs');
var url = require('url');


// 创建服务器
http.createServer( function (request, response) { 
   response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});   
   // 解析请求，包括文件名
   console.log(request.url)  
   console.log(request.method)
   var pathname = url.parse(request.url).pathname;
  
      switch (request.url) {
        case "/":
          response.end(`当前的请求接口数据是${pathname}`)
          response.end("哦吼  进入首页了呢");
          break;
        case "/about":
          response.end(`当前的请求接口数据是${pathname}`)
          response.end("哦吼 进入关于我们页面");
          break;
        case "/api":
          response.end(`当前的请求接口数据是${pathname}`)
          response.end("哦吼 进入关于我们页面");
          break;
        default: 
          response.statusCode = 404;
          response.end("走错路了 没找到你的页面");
      } 


}).listen(8081);

// 控制台会输出以下信息
console.log('Server running at http://127.0.0.1:8081'); 
// node http/web/post.js