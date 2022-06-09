<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2020-05-27 01:50:14
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-18 09:46:31
-->
<template>
  <div> 
    <!-- <p>{{count}}</p> -->
    <!-- <button @click="addCount">点击</button> -->
    <input type="text" placeholder="添加姓名" v-model="state2.formMsg.name"> <br>
    <input type="text" placeholder="添加年龄" v-model="state2.formMsg.age"><br>
    <button @click="addList">添加名单</button> 
    <ul>
      <li v-for="(item,index) in state.list" :key = index @click="deleteIndex(index)">{{item.name}}:{{item.age}}</li>
    </ul>
  </div>
</template>

<script> 
import { reactive} from 'vue';
export default {
  name: 'App', 
  // setup 是组合api的入口函数
  setup(props) {
    // ref 的注意点 ref 函数只能监听简单类型变化，不能监听复杂类型变化
   let {state,deleteIndex} = useRemoveStu()
   let {state2,addList}  = useAddStu(state) 
    return { 
      state,
      state2,
      deleteIndex,
      addList
    }
  }
}
/**
 * 可以将组合api的内容放在其他的文件中
 */
function useAddStu(state){
 let state2 = reactive({
     formMsg:{
       name:'',
       age:0
     }
   })
     function addList(e){
       e.preventDefault();
       state.list.push(state2.formMsg)
       state2.formMsg = {}
    }
    return{
      state2,
      addList
    }
}
function useRemoveStu(){
 let state = reactive({
        list:[
          { name:'mfy'},
          { name:'mfy1'},
          { name:'mfy2'},
        ], 
    }) 
    //删除项目列表中的某一个
    function deleteIndex(index){
      state.list = state.list.filter((item,idx)=>{
        return idx !=index;
      })
    }
    return{
      state,
      deleteIndex,
    }
}

</script>
