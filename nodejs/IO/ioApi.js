//cluster的api的意思

const cluster = require('cluster');
const http = require("http")
const numCPUs = require("os").cpus().length;
console.log(numCPUs)

//　包含命令行参数的数组。第一个元素会是'node'，第二个元素将是.js文件的名称，接下来的参数依次是命令行参数
console.log(process.argv) 

//启动进程所需的 node 命令行参数。这些参数不会在 process.argv 里出现，并且不包含 node 执行文件的名字，或者任何在名字之后的参数。这些用来生成子进程，使之拥有和父进程有相同的参数
console.log(process.execArgv)





//  var works ={}
// if (cluster.isMaster) {
//   console.log(`主进程 ${process.pid} 正在运行`);
//   for (var i = 0; i < numCPUs; i++) {
//       //为CPU的每核创建一个分支进程
//       works[i]= cluster.fork();
//   }
//   cluster.on('death', function(worker) {
//       console.log('Worker ' + worker.pid + ' died.');
//   });
//   console.log(works)

// } else {
//   process.on('message', function(message) {
// 		if (message.cmd == 'updateOfRequestTotal') {
// 			requests = message.requests;
// 		}
// 	});
// 	http.Server(function(req, res) {
// 		res.writeHead(200);
// 		res.end('Worker ID ' + process.env.NODE_WORKER_ID
// 			+ ' says cluster has responded to ' + requests
// 			+ ' requests.');
// 		process.send({cmd: 'incrementRequestTotal'});
// 	}).listen(8000);
// }
