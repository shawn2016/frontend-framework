/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-10 18:32:32
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-10 18:33:56
 */
const childProcess = require('child_process')
const cpuNum = require('os').cpus().length

for (let i = 0; i < cpuNum; ++i) {
  childProcess.fork('./worker.js')
}

console.log('Master: Hello world.')