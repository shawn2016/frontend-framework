/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 15:11:30
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 15:24:27
 */
//解析被调用loader的配置选项 
const parseQuery = require('./parseQuery.js')
const parseString = require('./parseString.js')
const getOptions = require('./getOptions.js')
module.exports={
  parseQuery:parseQuery, //序列化请求参数列表
  parseString:parseString,//将字符串转化为json对象
  getOptions:getOptions,//获取loader配置的options的信息
}