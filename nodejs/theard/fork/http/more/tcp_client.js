/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-10 15:44:22
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-10 15:49:45
 */
const net = require('net')
const maxConnectCount = 10

//创建10个tcp的链接
for (let i = 0; i < maxConnectCount; ++i) {
  net.createConnection({
    port: 8080,
    host: '127.0.0.1'
  }).on('data', (data) => {
    console.log(data.toString())
  })
}