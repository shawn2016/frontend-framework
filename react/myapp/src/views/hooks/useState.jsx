import React, { useState ,useEffect} from 'react';
import './index.css'

function Myhook(){
 const [count,setCount] = useState(0)


 useEffect(()=>{ 
  //  console.log("useEffect:点击了count"+count) 
   return ()=>{
    //  console.log("useEffect 清除副作用")
   }
 })
 const add =()=>{
  setCount((old)=>{
    console.log(old+1)
    return old+1
  }) 
 }

 //useState是对象
 const [obj,setObj] = useState({name:111})
 const changeName =()=>{
   console.log(obj)
   setObj((state)=>{
     console.log(state)
     return {...state,name:'mfy'}
   })
   setTimeout(()=>{
    console.log(obj)
   },0) 
 }
  return (<div> 
    <h1>useState</h1>
    <button onClick={changeName}>更改名字</button>
    <p>名字是：{obj.name}</p>
    <div className="countWrapper">

      <span onClick={()=>{setCount(count-1)}}>-</span>
      <p> {count}</p>
      <span onClick={()=>{add()}}>+</span>
    </div>
  </div>) 
}

export default Myhook;