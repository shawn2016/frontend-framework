/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-10 15:07:13
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-10 15:16:27
 */ 
const chalk = require('chalk')
//子进程向父进程传达
process.on("message",(msg)=>{
 console.log( chalk.green.bold('[Worker] Received message from master: ' + msg)) 
  process.send('Hi master.')
})