import React, { useState,useMemo,useCallback} from 'react';

 const Child1=React.memo((props)=>{
  console.log("Child1执行了")
  return (<div onClick={()=>{props.onClick()}}>child1 {props.value}</div>)
})
const Child2=React.memo((props)=>{
  console.log("Child2执行了")
  return (<div onClick={()=>{props.onClick()}}>child2 {props.value}</div>)
})
function MyUseMemo(){ 
  const [count, setCount] = useState(0);
  const [count1, setCount1] = useState(0);
 
  const add1 = useMemo(() => {
    return () => {
      setCount1(count1+1);
    };
  }, [count1]); //表示监控m变化 

  const add = useCallback(() => { 
      setCount(count+1); 
  }, [count]); //表示监控m变化

  return (<div>
    <h1>useMemo</h1>
    <button onClick={()=>{add1()}}>修改count1</button>
    <button onClick={()=>{add()}}>修改count</button>
    <Child1 value={count}  onClick={add}></Child1>
    <Child2 value={count1} onClick={add1}></Child2>
  </div>) 
}
export default MyUseMemo;