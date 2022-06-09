/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-12-27 15:00:10
 * @LastEditors: Mfy
 * @LastEditTime: 2020-12-28 08:48:34
 */
var utils = require('loader-utils')

module.exports = function (source) {
  const options = utils.getOptions(this)
  source = source.replace('const TiTle;', '/* ---- footer---- */')
 
  return source;
}