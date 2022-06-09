import React, {  useState,useEffect,useRef} from 'react';
import './index.css'
function UseEffectDemo(){
  const [list, setList] = useState([1,2,3]);
  const [loading, setLoading] = useState(false); 
  useEffect(() => {
    //只有当loading变化的时候才进行数据获取
    if(loading){
       console.log("加载数据") 
       setList([...list,3,2,2,3])
       setLoading(false)
    }  
  }, [loading]); //第二个参数 
  return (<div>
    <h1>useEffect</h1>
    <button onClick={()=>{setLoading(true)}}>加载数据</button>
    <div>
      {list.length>0 && list.map((item,index)=>{
       return <div key={index}>{item}</div>
      })}
    </div>
  </div>)
}

/**
 * 点击之后，执行第一段动画。
 * 再之后的500ms，执行第二段动画
 */
function UseEffectDemoAn(){
  let [an1,setAn1] = useState(false)
  let [an2,setAn2] = useState(false)
  const [style, setStyle] = useState({}); 
  const element = useRef(null);
  useEffect(() => {
     //执行动画操作
     an1 && !an2 && an01();
     !an1 && an2 && an02();
  }, [an1,an2]);
  function handerClick(){
    setAn1(true) 
  }
  function an01(){
    console.log("an01执行")
    setStyle({animation:'an1 2s ease'});
    setTimeout(()=>{
      setAn1(false)
      setAn2(true)
    },2000)  
  } 
  function an02(){
    console.log("an02执行")
    setStyle({animationName:'an2 1s ease-in-out'})
    setTimeout(()=>{ 
      setAn2(false)
    },2000) 
  } 
  return (<div className="box" >
    <button onClick={handerClick}>点击执行动画</button>
    <div className="an1" ref={element} style={style}></div> 
  </div>)

}

function AnimateDemo() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCounter(counter + 1);
    }, 1000);
    console.log('effect:', timer);

    return () => {
      console.log('clear:', timer);
      clearTimeout(timer);
    }
  });

  console.log('before render');

  return (
    <div className="container">
      <div className="el">{counter}</div>
    </div>
  )
}

//副作用 性能 
function AppMany(){
  const [count, setCount] = useState(0);
  const [index, setIndex] = useState(0);
  const [age, setAge] = useState(0);
  const [name, setName] = useState(0);
  useEffect(() => {
    console.log(count)
    return () => {
      console.log("清除")
    };
  },[index] );
  useEffect(() => {
    console.log(count)
    return () => {
      console.log("清除")
    };
  },[count] );
  return (<div> <h2>副作用</h2>  </div>)
}
export default AppMany;