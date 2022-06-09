<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-22 16:48:07
-->
<template>
  <div> 
    <p>{{state}}</p>
    <button @click="changeReadonly">修改readonly</button>
  </div>
</template>

<script> 
import {readonly,shallowReadonly,isReadonly,reactive} from 'vue';
/**
 * 1. readonly 
 *    创建只读的数据 递归只读的数据 
 * 
 */
 
export default {
  name: 'App',
  //setup是一个同步的函数 不能是异步的函数
  setup(props) { 
    // const obj = reactive({name:'33'})
    // console.log(obj)
    // let state = readonly({name:'mfy',age:34,attr:{weight:45,height:1.88}})
    // console.log(state)
    // shallowReadonly 用于创建一个第一层只读的数据，但是不是递归只读
    let state = shallowReadonly({name:'mfy',age:34,attr:{weight:45,height:1.88}})
    console.log(state)
    /**
     * const 和 readonly的区别
     * const 赋值保护 不能给变量重新赋值
     * readonly 属性保护，不能给属性重新赋值
     */

    
    // 能够创建只读的数据
    const value = {name:'mfy',age:23} 
    function changeReadonly(){
      state.age = 2; //修改第一层
      state.attr.weight = 2; //修改第二层
      console.log('state',state)
      console.log('state.attr',state.attr) 
      value.name ='my'
      console.log(value)
    }
    return{  
      state,
      changeReadonly
    }
  }

  
}

</script>
