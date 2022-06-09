<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-02-22 18:39:06
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-22 19:06:56
-->
<template>
  <div>
    <h1>学生</h1>
    <ul>
      <li v-for="(stu, index) in stuData.studentList" :key="index">
        <p class="name">{{ stu.name }}</p>
        <p class="age">{{ stu.age }}</p>
        <p class="score" @click="editScore(index)">{{ stu.score }}</p>
      </li>
    </ul>
    <h1>老师</h1>
    <ul>
      <li v-for="(stu, index) in teacherData.teachList" :key="index"  
       @click="lookDetail(index)">
        <p class="name">{{ stu.name }}</p>
        <p class="age">{{ stu.class }}</p>
      </li>
    </ul>
  </div>
</template>
<script>
import { reactive } from "vue"; 
function useStudent() {
  let stuData = reactive({
    studentList: [
      { name: "mafe", age: 1, score: 88 },
      { name: "mafe", age: 1, score: 99 },
    ],
  });
  function addStudent(data) {
    stuData.studentList.push(data);
  }
  function deleteStudent(index) {
    stuData.studentList.splice(index, 1);
  }
  function editScore(index) {
    stuData.studentList[index].score = 99;
  }
  return {
    stuData,
    addStudent,
    deleteStudent,
    editScore,
  };
}
function useTeacher() {
  let teacherData = reactive({
    teachList: [
      { name: "myy", class: 2 },
      { name: "myy", class: 2 },
    ],
  });
  function lookDetail(index) {
    console.log("查看教师详情", index);
  }
  return {
    lookDetail,
    teacherData,
  }
}
export default {
  setup(props) {
    let stuData = useStudent();
    let teaData = useTeacher();
    return{
      ...stuData,
      ...teaData
    }
  },
};
</script>