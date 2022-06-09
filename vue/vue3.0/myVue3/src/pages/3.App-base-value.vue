<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 09:28:11
-->
<template>
  <div> 
    <p>{{count}}</p>
    <button @click="addCount">点击</button>
    <!-- <input type="text" placeholder="添加姓名" v-model="formMsg.name"> <br>
    <input type="text" placeholder="添加年龄" v-model="formMsg.age"><br>
    <button @click="addList">添加名单</button> 
    <ul>
      <li v-for="(item,index) in list" :key = index @click="deleteIndex(index)">{{item.name}}:{{item.age}}</li>
    </ul> -->
  </div>
</template>

<script> 
import { ref} from 'vue';
export default {
  name: 'App',
  // setup 是组合api的入口函数
  setup(props) {

    //1.定义了一个名称为count的变量，变量的初始值是 0 ，变量改变后 会自动更新
    let count = ref(0)

    //在入口函数中进行修改
    function addCount(){
       //是一个组合api的值
       console.log(count) 
       count.value +=1;
    }
    //在组合api中定义的变量，要想在外界使用，需要return 出去
    return {
      count,
      addCount
    }
  }
}
</script>
