/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 15:20:02
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 16:02:37
 */
/**
 * 检索加载程序调用选项的推荐方法：
  1.如果this.query是字符串:尝试解析查询字符串并返回一个新对象
  2.如果它不是有效的查询字符串则抛出
  3.如果this.query是对象，它只是返回this.query
  4.在任何其他情况下，它只是返回 null
*/

const parseQuery=require('./parseQuery');//引入parseQuery模块



function getOptions(params) {
  console.log(this)
  const query=loaderContext.query;//拿到Loader上下文的query
 
  if(typeof query==="string" && query!==''){//query是字符串且query不是空字符串
      return parseQuery(query);//返回对象
  }
  
  if (!query || typeof query !== 'object') {//如果不存在或者不是对象返回null
      // Not object-like queries are not supported.
      return null;
  }

  return query;

}
module.exports =getOptions;
