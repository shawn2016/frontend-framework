//1.0引入模块
const http=require("http");

//2.0 创建http的服务
var proxy = http.createServer(function(request,response){  
  //设置请求头
  response.writeHead(200,{'Content-Type':'application/json;charset=utf-8'});  
  response.write("hello")
  response.write(","); 
  response.write("成功进入了网站")
  

  response.end("成功进入网站"); 
})
//监听
proxy.listen(3000);
console.log(3333)
console.log(uuuu)