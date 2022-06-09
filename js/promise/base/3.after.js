 
// after 在某个函数执行之后执行
//js的执行过程
function after(times,callback){ 
  return function(){
    if(--times ==0){
      callback()
    } 
  } 
}
/**
 * fn 执行3次之后在执行after 
 */
let fn = after(3,function(){
  console.log("really")
})
fn();
fn();
fn();
fn()