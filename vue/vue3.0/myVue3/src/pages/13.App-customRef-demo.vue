<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 14:54:25
-->
<template>
  <div> 
    <ul>
     <li v-for="(item,index) in state" :key=index>{{item.name}}</li> 
    </ul>
  </div>
</template>

<script> 
import {ref,toRef,customRef, toRefs,reactive,markRaw} from 'vue';
 /**
  * 1.customRef 
  *  返回ref对象，可以显示的控制依赖追踪和触发响应
  */
/**
 * 进行自定义的ref
 * 1.为什么要进行自定义一个ref 
 */
function myRef(initValue,delay=200){
 return customRef((track,trigger)=>{
   //在自定义的ref中获取数据
    fetch(initValue).then((res)=>{
      return res.json()
    }).then((data)=>{ 
      initValue= data
      trigger()
    })
   return{
     get(){
       track();//告诉Vue这个数据是需要追踪变化的
       //注意 不能在get中发送请求，  保存数据 更新页面，又是一个无限循环过程 
       return initValue;
     },
     set(newValue){  
       initValue =  newValue;
       setTimeout(()=>{
          trigger();// 告诉Vue页面的数据需要进行更新
       },delay)  
     }, 
   }
 })
}
export default {
  name: 'App',
  //setup是一个同步的函数 不能是异步的函数
  setup(props) { 
    // let state = ref([])
    // //异步进行获取
    // fetch('../public/data.json').then((res)=>{
    //   return res.json()
    // }).then((data)=>{
    //   console.log(data)
    //   state.value = data
    // })
    //将请求接口获取到内容中
    let state = myRef('../public/data.json')
 
    return{ 
      state
    }
  }

  
}

</script>
