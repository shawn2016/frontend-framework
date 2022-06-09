/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-08 08:46:34
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-10 10:55:39
 */
// const title = require('./title')
import './index.css'
// require('lodash')
var a = 6;
console.log(a)
// console.log(title)
import { add } from './functions'
console.log(add)


document.querySelector('#clickBtn').addEventListener('click', () => {
  import(/* webpackChunkName: 'hello', webpackPrefetch: true
*/'./hello').then(result => {
    console.log(result.default);
  });
});