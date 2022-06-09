<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 13:24:43
-->
<template>
  <div>
     <!-- 
      1.ref 和reactive的区别
      在template中使用ref类型的数据，vue会自动帮我们天计算.value
      在template中使用reactive类型的数据，vue不会自动帮我们天计算.value
      
      2.vue 是如何决定是否自动添加.value的
      Vue在解析数据之前，会自动判断这个数据是否是ref类型的，如果是，则自动添加上.value,如果不是，则不会自动添加
      
      3.vue 是如何判断当前数据是否是ref类型的
      通过当掐按数据的__v_isRef来进行判断的，
      如果有私有的属性，并且取值为true,那么就代表是一个ref类型的数据
      
      4.

      -->
   <p>{{age}}</p>
   <button @click="changeAge">更改年龄</button>
 </div>
</template>

<script> 
import { reactive,ref,isRef,isReactive} from 'vue';
/**
 * 1.ref 和reactive的区别
 * 2.为什么ref会自动添加
 * 
 */
export default {
  name: 'App',
  setup(props) {
    // 传递一个值 
    //  let age = reactive({
    //    value:18
    //  });
     let age =ref(18);
     function changeAge(){
       console.log(age)
       console.log("判断是否是ref类型数据",isRef(age))
       age.value +=1;
   }
     return{
       age,
       changeAge
     }
  }
 
  
}

</script>
