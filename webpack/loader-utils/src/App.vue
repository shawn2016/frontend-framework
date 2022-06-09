<!--
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-12 16:56:52
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-12 18:45:48
-->
<template>
 <div>
   <h1>我是md文档的加载呢</h1> 
 {{md}}
 </div>
</template>
<script>
import md from './content/mymd.md'
import text from './content/mytxt.md' 
import json from './content/my.json' 
console.log(json)
 
export default { 
  data(){
    return{
      md:md
    }
  }
}
</script>
<style lang="css">
@import url('./content/index.css');
@import url('./content/index.css');
@import url('./content/index.less');
div{
  color:red;
}
</style>