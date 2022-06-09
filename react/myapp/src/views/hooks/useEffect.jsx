import React, { PureComponent,useEffect ,useState} from 'react';
//模拟compontDidMount
function MockcompontDidMount(){ 
  const [count,setCount] = useState(0); 
  //mock compontDidMount
  useEffect(()=>{
    console.log("组件创建---第一次render")
  },[]);//传递空数组进行判断是否是需要参数监听 
  return (<div>
    <h1>useEffect</h1>
    <p>
      {count}
      <button onClick={()=>{setCount(count+1)}}>点击增加</button>
    </p>
  </div>)
}

//模拟compontDidMount
function MockcomponentDidUpdate(){ 
  const [count,setCount] = useState(0); 
  //mock compontDidMount
  useEffect(()=>{
    console.log('count的值改变了')
  },[count]);//传递空数组进行判断是否是需要参数监听 
  return (<div>
    <h1>useEffect</h1>
    <p>
      {count}
      <button onClick={()=>{setCount(count+1)}}>点击增加</button>
    </p>
  </div>)
}


//mock componentWillUnMount 
 function MockcomponentWillUnMount() {
  const [state, setState] = React.useState(0);
  return (
    <div className="App">
      {state === 1 ? null : <Child />}
      <h1>{state}</h1>
      <button
        onClick={() => {
          setState((x) => x + 1);
        }}
      >
        按钮+1
      </button>
      <button
        onClick={() => {
          setState((x) => x -1);
        }}
      >
        按钮-1
      </button>
    </div>
  );
}
const Child = () => {
  React.useEffect(() => {
  console.log("这个child组件第一次render了")//这里是第一次进入时执行的代码
    return () => { // **注意看这里的代码**
      console.log("孩子组件被销毁了");
    };
  }, []);
  return <div>孩子组件</div>;
};

export default MockcomponentWillUnMount;