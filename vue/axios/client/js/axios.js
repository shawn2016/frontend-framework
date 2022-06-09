 
 
import axios from 'axios' 
// var nAxios = axios.create({
//   baseURL: process.env.BASE_API,
//   timeout: 5000,
//   withCredentials: true,
//   headers: {'X-Requested-With': 'XMLHttpRequest'}
// })
// console.log(nAxios)

// nAxios.interceptors.request.use((config) => { 
//   config.method === 'post'
//       ? config.data = qs.stringify({...config.data}, { arrayFormat: 'brackets' })   // 后端需要的数组类型为：'a[]=1&a[]=2&a[]=3'
//       : config.params = {...config.params};
//   config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

//   // 发起请求时，取消掉当前正在进行的相同请求
//   if (promiseArr[config.url]) {
//     promiseArr[config.url]('操作取消')
//     promiseArr[config.url] = cancel
//   } else {
//     promiseArr[config.url] = cancel
//   }
//   return config
// }, error => {
//   return Promise.reject(error)
// })
// // 响应拦截器即异常处理
// nAxios.interceptors.response.use(response => { 
//   let status = response.data.status
//   console.log(response)
  
//   return response
// }, err => {
//    console.log(err)
//   return Promise.resolve(err.response)
// })
console.log(axios)
axios.get('http:locallhost:888')

export default nAxios

 