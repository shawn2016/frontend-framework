import React, { useLayoutEffect,useEffect,useState } from 'react';

export default function MyLayoutEffect(){
  const [count, setCount] = useState(0);
  useLayoutEffect(()=>{
    console.log("useLayoutEffect 执行")
  })
  useEffect(()=>{
    console.log("第一次 useEffect 执行")
  },[])
  useEffect(()=>{
   if(count>0){
     console.log("count 值修改 useEffect执行")
   }
  },[count]) 
  return (<div>
     {count} 
     <button onClick={()=>{setCount(count+1)}}>+1</button>
  </div>)
}