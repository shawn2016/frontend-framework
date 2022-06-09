const childProcess = require('child_process')
const net = require('net')
const cpuNum = require('os').cpus().length

// 创建工作进程
let workers = []
let cur = 0
for (let i = 0; i < cpuNum; ++i) {
  workers.push(childProcess.fork('./worker.js'))
  console.log('Create worker-' + workers[i].pid)
}

// 创建TCP服务器
const server = net.createServer()

server.listen(8080, () => {
  console.log('TCP server: 127.0.0.1:8080')
  // 监听端口后将服务器句柄发送给工作进程
  for (let i = 0; i < cpuNum; ++i) {
    workers[i].send('server', server)
  }
  // 关闭主线程服务器的端口监听
  server.close()
})