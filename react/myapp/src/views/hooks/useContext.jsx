import React, { useContext} from 'react';
import './index.css'

function MyUseContext(){ 
  //1.先进行创建context 上下文
  const AppContext = React.createContext({}); 
  const A = ()=>{
    //3.使用刚刚创建的上下文
    const {name} = useContext(AppContext);
    return (<p>
       我是A组件 名字为{name}
    </p>)
  }
  const B = ()=>{
    const {name} = useContext(AppContext);
    return (<div>
       我是B组件 名字为{name}
    </div>)
  }
  //2.向上下文中进行传递数据
  return (<AppContext.Provider value={{name:"useContext测试"}}> 
    <h1>MyUseContext</h1>
     <A></A>
     <B></B>
  </AppContext.Provider>) 
}

export default MyUseContext;