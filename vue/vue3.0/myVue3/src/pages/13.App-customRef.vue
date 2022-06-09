<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 14:33:29
-->
<template>
  <div> 
    <p>{{mName}}</p>
    <p>{{name}}</p> 
   <button @click="changeRef">更改ref</button>
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
 */
function myRef(initValue,delay=200){
 return customRef((track,trigger)=>{
   return{
     get(){
       track();//告诉Vue这个数据是需要追踪变化的 
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
  setup(props) { 
   let name = ref('3')
   let mName = myRef(18)
   
   function changeRef(){
     name.value =name.value+ 'fff'
     mName.value +=1;
   }

   return{
     mName,
     name,
     changeRef
   }
  }

  
}

</script>
