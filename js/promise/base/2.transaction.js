 
//顺序执行多个函数
function perform(anyMethod,wrappers){
  wrappers.forEach(wrapper=>wrapper.initalize())
  anyMethod();
  wrappers.forEach(wrapper=>wrapper.close())
}
perform(function(){
  console.log("函数")
},[
  {
    initalize(){
      console.log("wrapper1 before")
    },
    close(){
      console.log("wrapper1 closee")
    },
  },
  {
    initalize(){
      console.log("wrapper2 before")
    },
    close(){
      console.log("wrapper2 closee")
    },
  }
])