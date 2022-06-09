const http = require('http')
const httpServer = http.createServer((req, res) => {
  // 利用setTimeout模拟处理请求时的操作耗时
  setTimeout(() => {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Request handled by worker-' + process.pid)
  }, 10)
})

process.on('message', (msg, server) => {
  if (msg === 'server' && server) {
    server.on('connection', (socket) => {
      // 提交给HTTP服务器处理
      httpServer.emit('connection', socket)
    })
  }
})