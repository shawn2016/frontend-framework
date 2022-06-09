<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 09:25:51
-->
<template>
  <div> 
    <input type="text" placeholder="添加姓名" v-model="formMsg.name"> <br>
    <input type="text" placeholder="添加年龄" v-model="formMsg.age"><br>
    <button @click="addList">添加名单</button> 
    <ul>
      <li v-for="(item,index) in list" :key = index @click="deleteIndex(index)">{{item.name}}:{{item.age}}</li>
    </ul>
  </div>
</template>

<script> 
export default {
  name: 'App',
  //vue
  components: { 
  },
  data(){
    return{
      formMsg:{},
      msg:"我是dev",
      list:[
        {name:'mfy', age:34},
        {name:'mfy1',age:34},
        {name:'mfy2',age:34},
        {name:'mfy3',age:34},
      ]
    }
  },
  methods: {
    clickBtn(){
      this.msg = "hhahaha"
    },
    deleteIndex(index){
      this.list = this.list.filter((item,idx)=>{
        return idx !==index;
      })
    },
    addList(){ 
      this.list.push(this.formMsg)
      this.formMsg ={}
    }
  },
}
</script>
