import React, { useReducer } from 'react';
import { Button,Flex,Card,List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';


const num = 0
const reducer = (state,action)=>{
  switch(action.type){
    case 'add' :{
      return state+1
    }
    case 'reduce': {
      return state-1
    }
    case 'reset':{
      return 0
    }
    default : return state;
  }
}

function UseReducerDemo(){
  const [count,diapatch] = useReducer(reducer,num)

  return (<div> 
    <h1>reducer demo</h1>
    <Card style={{'textAlign':'center','fontSize':'20px'}}>{count}</Card>
    <Card>
      <Button onClick={()=>{diapatch({type:'add'})}}>增加+1</Button>
      <Button onClick={()=>{diapatch({type:'reduce'})}}>增加-1</Button>
      <Button onClick={()=>{diapatch({type:'reset'})}}>reset</Button>
    </Card>
  </div>)
}



//--------------------demo2 拆分reducer

const combineReducer = (reducers)=>{
  //获取reducer中的keys
  const reducerKeys = Object.keys(reducers);
  //存储合并后的state
  let objInitState = {};
  //遍历每一个key 进行存储
  reducerKeys.forEach((key)=>{
     // 传入的空的type 获取默认值 a
     const initState = reducers[key](undefined,{type:''});
     if(initState == undefined) { 
       throw new Error(`${key} does not return state`)
     }
     objInitState[key] = initState
  })
   return (state,action)=>{
    if(action){
      reducerKeys.forEach((key)=>{
        const previous = objInitState[key];
        objInitState[key] = reducers[key](previous,action)
      })
    }
    return { ...objInitState}
  }
} 


const stateA = 0;
function reducerA(state = stateA, action) {
  switch (action.type) {
    case 'incrementA': 
      return state + action.payload
    case 'decrementA':
      return state - action.payload
    default:
      return state;
  }
}


const stateB = 0
function reducerB(state = stateB, action) {
  switch (action.type) {
    case 'incrementB': 
      return state + action.payload
    case 'decrementB':
      return state - action.payload
    default:
      return state;
  }
}


let reducerMy = combineReducer({reducerB,reducerA});
function Counter() {
  const [counter, dispatch] = useReducer(reducerMy, reducerMy());  
  return (
    <Card >
      <div>{counter.reducerA}</div>
      <Button onClick={() => dispatch({type: 'incrementA', payload: 10})}>递增A</Button>
      <Button onClick={() => dispatch({type: 'decrementA', payload: 10})}>递减A</Button>
      <div>{counter.reducerB}</div>
      <Button onClick={() => dispatch({type: 'incrementB', payload: 10})}>递增B</Button>
      <Button onClick={() => dispatch({type: 'decrementB', payload: 10})}>递减B</Button>
    </Card>
  );
}

export default Counter;