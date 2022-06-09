/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-08 09:52:39
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-08 13:10:31
 */
const cluster = require('cluster');
const http = require('http');
console.log(process.env)

//查看是否存在
if (cluster.isMaster) {

  let numReqs = 0;
  setInterval(() => {
    console.log(`numReqs = ${numReqs}`);
  }, 1000);

  function messageHandler(msg) {
    if (msg.cmd && msg.cmd === 'notifyRequest') {
      numReqs += 1;
    }
  }
  //计算系统的的cpu的核数
  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  console.log(cluster.workers)

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler);
  }

} else {

  // Worker processes have a http server.
  http.Server((req, res) => {
    res.writeHead(200);
    res.end('hello world\n'); 
    process.send({ cmd: 'notifyRequest' });
  }).listen(8000);
}
