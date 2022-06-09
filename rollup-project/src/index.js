/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-24 09:06:05
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-26 14:46:38
 */
 
// import { version } from '../package.json';s
const a = require('webpack')
console.log(a)
// import '@style/index.css'
import {getName} from '@util/index.js'
getName()
import './index.scss'

export default function () {
  console.log('version ' + version);
}
import debug from 'debug';
// Enable LiveReload
// 如果不是正式环境的话，不输出日志信息
if (ENV !== 'production') {
  // Enable the logger.
  debug.enable('*');
  log('Logging is enabled!');
  // Enable LiveReload
  document.write(
    '<script src="http://' + (location.host || 'localhost').split(':')[0] +
    ':35729/livereload.js?snipver=1"></' + 'script>'
  );
} else {
  debug.disable();
}