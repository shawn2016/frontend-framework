<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-02-22 18:24:51
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-22 18:55:40
-->
<template>
  <div>
    <h1>学生</h1>
    <ul>
      <li v-for="(stu, index) in studentList" :key="index">
        <p class="name">{{ stu.name }}</p>
        <p class="age">{{ stu.age }}</p>
        <p class="score" @click="editScore(index)">{{ stu.score }}</p>
      </li>
    </ul>
    <h1>老师</h1>
    <ul>
      <li v-for="(stu, index) in teachList" :key="index" @click="lookDetail(index)">
        <p class="name">{{ stu.name }}</p>
        <p class="age">{{ stu.class }}</p> 
      </li>
    </ul> 
  </div>
</template>
<script>
export default {
  data() {
    return {
      studentList: [
        { name: "mafe", age: 1, score: 88 },
        { name: "mafe", age: 1, score: 99 },
      ],
      teachList: [
        { name: "myy", class: 2 },
        { name: "myy", class: 2 },
      ],
    };
  },
  methods: {
    addStudent(data) {
      this.studentList.push(data);
    },
    deleteStudent(index) {
      this.studentList.splice(index, 1);
    },
    editScore(index) {
      this.$set(this.studentList[index], "score", 88);
    },
    lookDetail(index){
      console.log("查看教师详情",index)
    }
  },
};
</script>