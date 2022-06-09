/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-11 15:08:52
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-11 15:11:47
 */
const {spawn} = require('child_process')
const ls = spawn('ps', ['ax']);
const grep = spawn('grep', ['ssh']);

ls.stdout.on('data', (data) => {
  // console.log(`stdout: ${data}`);
  grep.stdin.write(data)
});

ls.stderr.on('data', (data) => {
  console.error(`stderr: ${data}`);
});

ls.on('close', (code) => {
  console.log(`子进程退出，退出码 ${code}`);
  grep.stdin.end();
});

grep.stdout.on('data', (data) => {
  console.log(data.toString());
});

grep.stderr.on('data', (data) => {
  console.error(`grep 的 stderr: ${data}`);
});

grep.on('close', (code) => {
  if (code !== 0) {
    console.log(`grep 进程退出，退出码 ${code}`);
  }
});
