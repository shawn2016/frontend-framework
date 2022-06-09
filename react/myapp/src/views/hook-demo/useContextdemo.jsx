import React, { createContext ,useState,useContext} from 'react';
import { Button, Flex,Badge,Stepper} from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import './index.css'

//1.创建上下文
const context = createContext({}); 

function MyUseContextDemo(){
 const [counter, setCounter] = useState(0);
  const value = {
    counter,
    setCounter,
    increment: () => setCounter(counter + 1),
    decrement: () => setCounter(counter - 1)
  }
  return (<div>
    <h1>useContext demo</h1>
    counter的内容：{counter}
    {/* 2.提供provider 通过value向下传递 */}
    <context.Provider value={value}>
      <Child></Child>
    </context.Provider>
  </div>)
}

function Child(props){ 
  //3. 通过useContext使用
  const {counter =0,increment,decrement} = useContext(context) 
  return (<div>
  {counter}
   <Flex justify="center" align="center">
     {/* 4.直接调用 */}
     <Button onClick={()=>{increment()}}>增加+1</Button>
     <Button onClick={()=>{decrement()}}>增加-1</Button></Flex>
  </div>)
}



//big --demo ------------- 
const ctx = createContext({})
function ListDemo(){
  const [indexCount,setIndexCount] =  useState(0);
  const [hotCount,setHotCount] =  useState(0);
  const value = {
    indexCount,
    hotCount,
    setIndexCount,
    setHotCount,
  }
  return (
    <ctx.Provider value={value}>
       <App></App>
    </ctx.Provider>
  )

}

function App(){
  const {indexCount,hotCount} = useContext(ctx)
  const  [tabIndex,setTabIndex] = useState(0)
  return (<div className="use-context-demo">
     <div className="tab">
       <Flex justify="between" style={{height:'60px'}}>
         <Badge text={indexCount}  style={{ marginLeft: 42 }}>
           <div onClick={()=>{setTabIndex(0)}}>首页</div>
         </Badge>
         <Badge text={hotCount}  style={{ marginLeft: 42 }}>
           <div onClick={()=>{setTabIndex(1)}}>热门</div>
         </Badge>
         <Badge text={indexCount}  style={{ marginLeft: 42 }}>
           <div onClick={()=>{setTabIndex(2)}}>设置</div>
         </Badge>
       </Flex>
     </div>
     {tabIndex==0  && <IndexPage></IndexPage>}
     {tabIndex==1  && <HotPage></HotPage>}
     {tabIndex==2  && <SetPage></SetPage>}

  </div>)
}
function IndexPage(){
  return (<div>
    <h1>我是首页</h1>
  </div>)
}

function HotPage(){
  const {setIndexCount,setHotCount,indexCount,hotCount} = useContext(ctx) 
  console.log(indexCount)
  return (<div>
    <h1>我是热门</h1>
    <div>
      首页热门 <Stepper showNumber min={0} value={indexCount} onChange={setIndexCount}></Stepper>
    </div>
    <div>
    热门热点 <Stepper showNumber min={0}  step={3} value={hotCount} onChange={setHotCount}></Stepper>
    </div> 
  </div>)

}
function SetPage(){
  return (<div>
    <h1>我是设置</h1>
  </div>)
}
export default ListDemo;