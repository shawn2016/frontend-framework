const cluster = require("cluster"); //cluster是线程内置模块
//获取当前操作系统可启动的线程数量
const numCPUs = require("os").cpus().length;
console.log(numCPUs) // 
 
function run() { 

 const startTime = Date.now(); //开始启动时间
 const totalCount = 500;  // 要进行处理的总数
 let completedCount = 0;  //当前已处理任务数
 const fbGenerator = FbGenerator(totalCount); //任务生成器
 console.log(fbGenerator)

 //是否是主线程  如果是主线程 则进行赋值如果不是则启动其他的进行
 if (cluster.isMaster) {

   //通过fork 的方法创建子进程任务
    cluster.on("fork", function(worker) {
       console.log(`[master] : fork worker ${worker.id}`);
    });

    //监听推出时候的子进程任务
    cluster.on("exit", function(worker, code, signal) {
       console.log(`[master] : worker ${worker.id} died`);
    });

  //启动 cluster进行子进程的fork 启动子进程进行服务
  for (let i = 0; i < numCPUs; i++) {
    
   const worker = cluster.fork(); 

   // 接收子进程数据
    worker.on("message", function(msg) {
      // 完成一个，记录并打印进度
        completedCount++; //已经完成的数量
        console.log(`process: ${completedCount}/${totalCount}`);
        nextTask(this); //当前进程的某个任务挖成后，启动下一个进程 
    });
    nextTask(worker);
  }
 } else {
    process.on("message", function(msg) {
      console.log(msg);
    });
 }

 /**
  * 继续下一个任务
  *
  * @param {ChildProcess} worker 子进程对象，将在此进程上执行本次任务
  */
 
 function nextTask(worker) {
  // 获取下一次要执行的参数列表
  const data = fbGenerator.next();
  // 判断是否已经完成，如果完成则调用完成函数，结束程序
  if (data.done) {
      done();
      return;
  } 
   // 向子进程发送数据
    worker.send(data.value);
 }
  // 接收主线程发送过来的任务，并开始查找斐波那契数
  process.on("message", n => {
    var res = fibonacci(n);
      // 查找结束后通知主线程，以便主线程再度进行任务分配
      process.send(res);
   });
 /**
  * 完成，当所有任务完成时调用该函数以结束程序
  */
 function done() {
  if (completedCount >= totalCount) {
   cluster.disconnect();
   console.log("👏 👏 👏 👏 👏 👏 👏 👏 👏 👏");
   console.info(`任务完成，用时: ${Date.now() - startTime}ms`);
   console.log("👏 👏 👏 👏 👏 👏 👏 👏 👏 👏");
  }
 }
}

 
/**
 * 生成器
 */
function* FbGenerator(count) {
 var n = 30;
 for (var i = 0; i < count; i++) {
    yield n;
 }
   return;
}
  
//函数
function fibonacci(n) {
  if (n == 0 || n == 1) { 
   return n;
  } else { 
   return fibonacci(n - 1) + fibonacci(n - 2);
  }
 }
  


 run();
