import React, { useReducer,useContext } from 'react';
import './index.css'
function MyUseReducer(){
  //1.定义reducer 处理事件函数
  const reducer=(state,action)=>{
    switch(action.type){
      case 'add':{
        return {
          ...state,
          count:state.count+1
        }
      }
      case 'reduce':{
        return {
          ...state,
          count:state.count-1
        }
      }
    }
  }
  //2.定义state中的数据
  const [state, dispatch] = useReducer(reducer, {count: 0})
  return <>
     <div className="countWrapper">
       {/* 进行调用使用 */}
      <span onClick={()=>{dispatch({type:'reduce'})}}>-</span>
      <p> {state.count}</p>
      <span onClick={()=>{dispatch({type:'add'})}}>+</span>
    </div>
  </>
}



//示例demo
// 建立容器
const store = {
  user:null,
  book:null,
  movies:null
}
//创建reducer函数存储操作
const reducer = (state,action)=>{
  switch(action.type){
    case 'setUser':{
      return {...state,user:action.user}
    }
    case "setBooks":{
      return {...state,book:action.book}
    }
    case "setMovies":{
      return {...state, movies:action.movies}
    }
    default :
    break;
  }
}

//创建上下文
const Context = React.createContext();

function User(){
  const { state, dispatch } = useContext(Context);
  function inputName(e){
    dispatch({
      type:'setUser',
      user:e.target.value
    })
  }
  return (<div>
       名字{state.user}
       <input type="text" onChange={inputName}/>
    </div>     
    )
}
function Books(){
  const { state, dispatch } = useContext(Context);
  console.log(Context)
  function inputBook(e){
    dispatch({
      type:'setBooks',
      book:e.target.value
    })
  }
  return (<div>书籍{state.book}
    <input type="text" onChange={inputBook}/>
  </div>)
}
function Moives(){
  const { state, dispatch } = useContext(Context);
  function inputMovies(e){
    dispatch({
      type:'setMovies',
      movies:e.target.value
    })
  }
  return (<div>电影{state.movies}
    <input type="text" onChange={inputMovies}/>
  </div>)
}


function MyReducer(){ 
  //创建一个读写的api
  const [state, dispatch] = useReducer(reducer, store);
  return (
    <Context.Provider value={{state:state,dispatch:dispatch}}>
      <User></User>
      <Moives></Moives>
      <Books></Books>
    </Context.Provider>
  )
}

export default MyReducer;