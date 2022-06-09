import ajax from './adapters/ajax'
import  http  from './adapters/http'
//通用配置项目
export default {
    baseURL:  'localhost:999',
    methods: 'post',
    headers:{
      'Content-Type':'eeee',
      'Default':888
    },
    //adaptor 进行访问配置
    adaptor(configs){
      //判断
      if(typeof window == 'object'){
        console.log("333")
        return ajax(configs)
      }else{
        return http(configs)
      }
    }
}