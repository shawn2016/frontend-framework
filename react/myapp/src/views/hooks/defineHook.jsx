import React, { useState } from 'react';

const initialState = [
  { id: 1, name: "qiu" },
  { id: 2, name: "yan" },
  { id: 2, name: "xi" }
];

function DefineHook(){
  const [state, setstate] = useState(initialState);

  const deleteLi = (index)=>{
    console.log("删除"+index)
    setstate((state)=>{
      const newState = JSON.parse(JSON.stringify(state));
      newState.splice(index,1)
      return newState;
    })
  }
  return (<>
  <h1>DefineHook</h1>
  {state && state.map((item,index)=>{
    return <div key={index}>
      {item.name}
      <button onClick={()=>{
        deleteLi(index)
      }}>删除{item.name}</button>
    </div>
  })}
  </>) 
}

//demo

 

const useDelList = (initialState)=>{
  const [state, setstate] = useState(initialState); 
  const deleteLi = (index)=>{ 
    setstate((state)=>{
      const newState = JSON.parse(JSON.stringify(state));
      newState.splice(index,1)
      return newState;
    })
  }
  return {state,setstate,deleteLi}
}

function UseHook(){ 
  //使用自定义的Hook
  const { state, deleteLi } = useDelList(initialState);
  return (<>
  <h1>DefineHook</h1>
  {state && state.map((item,index)=>{
    return <div key={index}>
      {item.name}
      <button onClick={()=>{
        deleteLi(index)
      }}>删除{item.name}</button>
    </div>
  })}
  </>) 
}
export default UseHook;