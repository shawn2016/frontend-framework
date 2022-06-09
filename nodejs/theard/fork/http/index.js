/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-10 15:27:52
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-10 15:44:00
 */
const childProcess = require('child_process')
const net = require('net')
const cpuNum = require('os').cpus().length

// 创建工作进程
let workers = []
let cur = 0
// 创建cpuNum的进程
for (let i = 0; i < cpuNum; ++i) {
  workers.push(childProcess.fork('./worker.js'))
  console.log('Create worker-' + workers[i].pid)
}

// 创建TCP服务器
const server = net.createServer()

// 服务器收到请求后分发给工作进程去处理
// 通过轮转方式实现工作进程的负载均衡
server.on('connection', (socket) => {
  workers[cur].send('socket', socket)
  cur = Number.parseInt((cur + 1) % cpuNum)
})

server.listen(8080, () => {
  console.log('TCP server: http://127.0.0.1:8080')
})