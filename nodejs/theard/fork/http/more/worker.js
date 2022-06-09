/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-10 15:28:01
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-10 19:00:16
 */
const chalk = require('chalk')
process.on('message', (msg, socket) => {
  if (msg === 'socket' && socket) {
    // 利用setTimeout模拟处理请求时的操作耗时 
    setTimeout(() => {
      socket.end('Request handled by worker-' + process.pid)
    }, 10)
  }
})

// const http = require('http')
// const httpServer = http.createServer((req, res) => {
//   // 利用setTimeout模拟处理请求时的操作耗时
//   // setTimeout(() => {
//     res.writeHead(200, { 'Content-Type': 'text/plain' })
//     res.end('Request handled by worker-' + process.pid)
//   // }, 10)
// })

// process.on('message', (msg, server) => {
//   if (msg === 'server' && server) {
//     server.on('connection', (socket) => {
//       // 提交给HTTP服务器处理
//       httpServer.emit('connection', socket)
//     })
//   }
// })