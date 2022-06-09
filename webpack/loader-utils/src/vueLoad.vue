<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 17:07:48
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 17:47:47
-->
<template>
  <div class="my-md-page">
    <div v-html="content"></div>
  </div>
</template>
<script>
export default {
  props:{
    mdContent:{
      type:String,
      default:'',
    }
  },
  data(){
    return{
      content:''
    }
  },
  mounted() {
     //解析md内容
     this.resolveMd(this.mdContent)
  },
  methods: {
    resolveMd(content){ 
      content = content.replace(/(?<=#)(.*?)(?=\\n)/,'<h1>$2</h1>');
      //匹配替换# 
      console.log(content)

      this.content = content;
    }
  },
}
</script>