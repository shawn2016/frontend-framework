<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-19 08:45:08
-->
<template>
  <div>
   <p>{{age}}</p>
   <button @click="changeAge">更改年龄</button>
 </div>
</template>

<script> 
import { reactive,ref, unref} from 'vue';
/**
 * 1.什么是ref 
 *   - 和reactive一样，也是用来实现响应式数据的方法
 *   - 由于reactive必须传递一个对象，所以导致企业开发的时候是不便捷的，如果我们想要
 *     某个变量实现响应式，是非常麻烦的，
 *   - vue3 提供了ref方法，实现对简单的值进行监听
 * 2.ref的本质
 *   - ref 的底层本质还是reactive 系统会自动根据我们给的ref 传入的值转换成
 *     ref(xx)->reactive({value:xx})
 * 3.ref的注意点
 *   - 在Vue中使用ref的值不用通过value获取
 *   - 在js中使用ref的值必须要用value获取
 * 
 */
export default {
  name: 'App',
  setup(props) {
    // 传递一个值 
     let age = ref(33);
     console.log(age)
     console.log(unref(age))
     function changeAge(){ 
       console.log(age)
       age.value +=1;
     }
     return{
       age,
       changeAge
     }
  }
 
  
}

</script>
