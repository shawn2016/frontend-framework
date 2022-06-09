<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-24 09:39:43
-->
<template>
  <div> 
   <p>{{state}}</p>
   <p>{{state2}}</p>
   <button @click="changeRef">更改ref</button>
 </div>
</template>

<script> 
import {ref,toRef,toRefs,reactive,markRaw} from 'vue';
 /**
  * 1.toRef 永远不想被追踪 
  *  出现的原因
  */
export default {
  name: 'App',
  setup(props) {  

    

   //定义多个属性为响应式   
    let obj1 = {age:34,name:'mfy'}  
    let state3 = toRefs(obj1,'name','age')
    console.log(state3)
   //将响应式对象转化成普通对象
  
   let obj = {age:34,name:'mfy'} 
   let state =reactive(obj);
   console.log(state) 
   let state2 = toRefs(state)
   console.log(state2) 
  
   function changeRef(){  
     //修改值 
     obj.age = 232323;
     console.log('state2',state2)
     console.log('state',state)
     console.log('obj',obj)

   }

   return{ 
     state, 
     changeRef
   }
  }

  
}

</script>
