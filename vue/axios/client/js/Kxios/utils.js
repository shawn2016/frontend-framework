
 
/**
 * 深拷贝函数 实现配置分离
 * 注意是数组 的时候要初始化成为一个数组
 */
function deepCopy(source){

  let tatget =Array.isArray(source) ?[]: {};
  for(let key in source){ 
    //包含可迭代属性
    if(source.hasOwnProperty(key)){
       //判断是否是对象 是对象要进行进一步引用操作
      if(typeof  tatget[key] =='object' && source!=null){
        tatget[key]= deepCopy(tatget[key])
      }else{
        tatget[key] = source[key]
      }
    }  
  }  
  return tatget;
}
function mergeConfig(config1,config2){
  let target = deepCopy(config1)
  let source = deepCopy(config2) //传入的值 
   //合并并且覆盖 
  Object.keys(source).reduce((t,k)=>{ 
    if(['url','baseURL','method'].includes(k)){
      t[k] = source[k]
    } 
    //如果存在新增的属性，则进行新增
    if(['headers'].includes(k)){ 
      t[k]= Object.assign(target[k],source[k]) ; 
    }; 
    return t;
  },target) 
  return target;
}
export default {
  deepCopy,
  mergeConfig
}