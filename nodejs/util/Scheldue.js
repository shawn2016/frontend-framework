/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 13:20:23
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 13:25:58
 */
class Scheduler {
  constructor() {
    this.scheldueQueue = [];
  }
  add(promiseCreate) {
    this.scheldueQueue.push(promiseCreate)
    return promiseCreate(); //返回一个执行完成的promise
  }
}
const timeout = (time) => new Promise(resolve => {
  setTimeout(resolve, time)
})
const scheduler = new Scheduler()
const addTask = (time, order) => {
  scheduler.add(() => timeout(time))
    .then(() => console.log(order))
}
addTask(300, 4)
addTask(200, 5)
addTask(300, 6)