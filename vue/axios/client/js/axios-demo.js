 
import kxios from './Kxios/index.js'
import axios from 'axios'
console.log(axios)

let nAxios = axios.create({
  // baseURL: process.env.BASE_API,
  // timeout: 5000,
  withCredentials: true,
  headers: {'X-Requested-With': 'XMLHttpRequest'}
})
console.log(nAxios)



kxios.interceptors.request.use((config)=>{
    console.log(config)
    console.log("请求拦截器")
    //要请求return
    return config;
},()=>{

})
kxios.interceptors.response.use((res)=>{
  console.log("响应拦截器")
  console.log(res)
  return res;
},()=>{

})
kxios.get('http://localhost:4000/',{
  baseURL:'http://localhost:4000/',
  methods:'get',
  headers:{
    'Content-Type':'333',
    'Type':333
  }
}).then((res)=>{
  console.log("请求后的then")
  console.log(res)
})
