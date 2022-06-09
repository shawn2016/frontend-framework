/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-10 14:52:09
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-10 18:30:00
 */
const childProcess = require('child_process') 
const worker =  childProcess.fork('./worker.js')
const chalk = require('chalk')
//主进程发送hello world内容
worker.send('Hello world.') 
//去监听接收信息
worker.on('message',(msg)=>{
 console.log(chalk.green("[Master] received message from worker:"+msg)) 
})

//多个内容分发工作
 