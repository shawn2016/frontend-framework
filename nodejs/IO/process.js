
/**
 * 属性
 */


//　包含命令行参数的数组。第一个元素会是'node'，第二个元素将是.js文件的名称，接下来的参数依次是命令行参数
console.log(process.argv) 

//启动进程所需的 node 命令行参数。这些参数不会在 process.argv 里出现，并且不包含 node 执行文件的名字，或者任何在名字之后的参数。这些用来生成子进程，使之拥有和父进程有相同的参数
console.log(process.execArgv)

//当前文件执行的绝对路径
console.log(process.execPath) ///usr/local/Cellar/node@10/10.16.0/bin/node


//　获取当前系统环境信息的对象，常规可以用来进一步获取环境变量、用户名等系统信息
console.log(process.env)

//当前进程的pid
console.log(process.pid) //20711

//返回当前的process架构
console.log(process.arch) //x64

//运行程序所在的平台系统 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'
console.log(process.platform) //darwin

//方法

//获取当前 返回当前进程的工作目录
console.log(process.cwd());///Users/hhh/Documents/work/mycode/git-knowledge/nodejs

//改变当前的工作目录
try{
  process.chdir('../');
  console.log(process.cwd());///Users/hhh/Documents/work/mycode/git-knowledge
}catch(e){
  console.log(e)
}

//返回一个对象，它描述了Node进程的内存使用情况，其单位是bytes
console.log(process.memoryUsage()); 
/*{ rss: 24793088,
    heapTotal: 7061504,
    heapUsed: 4256392,
    external: 8272 }*/

//返回 Node 程序已运行的秒数
console.log(　process.uptime()) //0.096

//　返回当前的高分辨时间，形式为 [秒，纳秒] 的元组数组。它是相对于在过去的任意时间。该值与日期无关，因此不受时钟漂移的影响。
//主要用途是可以通过精确的时间间隔，来衡量程序的性能

var t1 = process.hrtime();
var arr = new Array(200000000),
    s = arr.join(',');
var t2 = process.hrtime();
//处理数组共花费了0秒，详细为131791038纳秒
console.log('处理数组共花费了%d秒，详细为%d纳秒', (t2[0] - t1[0]), (t2[1] - t1[1]));



//结束对应某pid的进程并发送一个信号（若没定义信号值则默认为'SIGTERM'）
console.log(process.pid);//24524
process.kill(process.pid, 'SIGTERM');
console.log(process.pid);//Terminated: 15


// 触发node事件 退出当前进行
// process.abort();
console.log('在输出这句话之前就退出了'); //没打印


/**
 * 可以自定义退出进程时node shell捕获到的状态码（必须是正常结束进程或者使用process.exit()指令退出）
 * 如果指明了则process.exit(code) 中退出的错误码 (code)，则会覆盖掉 process.exitCode 的设置 覆盖掉错误码
 */
// process.exitCode
// process.exitCode = 4;
// console.log(process.exit());//[Finished in 0.2s with exit code 4]


//输入输出流


//process.stdout
//一个指向标准输出流(stdout)的可写的流(Writable Stream)
/*
这是一行数据
这是第二行数据
 */
process.stdout.write('这是一行数据\n这是第二行数据');

//process.stderr 一个指向标准错误流(stderr)的 可写的流(Writable Stream)
//输出一行标准错误流，效果跟stdout没差[Finished in 0.2s]
process.stderr.write('输出一行标准错误流，效果跟stdout没差');

//process.stdin 一个指向标准输入流(stdin)的可读流(Readable Stream)。标准输入流默认是暂停(pause)的，所以必须要调用process.stdin.resume()来恢复(resume)接收

// 事件

/*1
退出前执行
 */
process.on('exit', function() {
    // 设置一个延迟执行
    setTimeout(function() {
        console.log('主事件循环已停止，所以不会执行');
    }, 0);
    console.log('退出前执行');
});
setTimeout(function() {
    console.log('1');
}, 500)

//uncaughtException
//捕获到一个异常
process.on('uncaughtException', function() {
  console.log('捕获到一个异常');
});
var a = '123';
a.a(); //触发异常事件
console.log('这句话不会显示出来');

// 　捕获当前进程接收到的信号（如按下了 ctrl + c）
process.on('SIGINT', function() {
  console.log('收到 SIGINT 信号。');
});
console.log('试着按下 ctrl + C');
setTimeout(function() {
  console.log('end');
}, 50000);


//nextTick