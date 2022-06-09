import React, { PureComponent,useState } from 'react';
import { render } from 'react-dom';
 
function useMyState(initValue){
  //定义状态值
  let state = initValue;
  let opState = (args)=>{ 
    //判断args是否是函数 
    if(typeof args == "function"){
      state = args(state)
    }else{
       state = args
    }  
    console.log(state) 
  } 
  return [initValue,opState];
}

function WriteHook(){

  const [count,setCount ] =  useState(2);
  const [count1,setCount1 ] =  useMyState(2);
  console.log(setCount1)
  console.log(setCount)
  function clickWrite(){
    setCount1(count1+1)
    console.log(count1)
  }
  return (<div>
   <h1>useState 的手写实现</h1>
   引用：{count}
   手写：{count1}  <br/><br/>
   <button onClick={()=>{setCount(count+1)}}>引用</button> &nbsp; &nbsp;
   <button onClick={clickWrite}>手写</button> 
  </div>)
}

export default WriteHook;