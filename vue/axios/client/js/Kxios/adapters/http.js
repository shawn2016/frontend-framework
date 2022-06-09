 
import http from 'http';
import { resolve } from 'path';
export default function(configs){
  return new Promise((resolve,reject)=>{
    const postData = '';

     const req = http.request(options,(res)=>{
       req.setDefaultEncoding('utf-8');
       let chunks = [];
       let size = 0;
       res.on('data',chunk=>{
        chunks.push(chunk);
        size+=chunk.length;
       })
       res.on('end',()=>{
         resolve(chunks.join(''))
       }) 
     })

     req.on('error',(e)=>{
       console.log("请求遇到问题 暂时不能解决嘻嘻嘻哈哈哈")
     })
  })

}