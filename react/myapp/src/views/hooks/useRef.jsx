import React, { useRef,useEffect,useImperativeHandle ,forwardRef,useState} from 'react';

//4.React.forward接受渲染函数作为参数，React将使用prop和ref作为参数来调用此函数。
//3.React.forwardRef会创建一个React组件，这个组件能够将其接受的ref属性转发到其组件树下的另一个组件中。
const Child =forwardRef((props,ref)=>{
  //useImperativeHandle(ref,createHandle,[deps])可以自定义暴露给父组件的实例值。
  //如果不使用，父组件的ref(chidlRef)访问不到任何值（childRef.current==null）
  useImperativeHandle(ref, () => ({
    say: sayHello,
  }));
  const sayHello = () => {
    alert("hello,我是子组件");
  };
  return <h3>子组件</h3>; 
})


// function MyUseRef(){

//   //保存值
//   const domRef = useRef(1)
//   const childRef = useRef(null)
//   useEffect(() => {
//     console.log("ref:deom-init", domRef, domRef.current);
//     console.log("ref:child-init", childRef, childRef.current);
//   }); 

//   //child
//   const showChild = ()=>{
//     console.log("ref:child",childRef,childRef.current)
//     childRef.current.say();
//   }

//   return (<>
//   <div style={{ margin: "100px", border: "2px dashed", padding: "20px" }}>
//       <h2>这是外层组件</h2>
//       <div
//         onClick={() => {
//           console.log("ref:deom", domRef, domRef.current);
//           domRef.current.focus();
//           domRef.current.value = 'hh';
//         }}
//       >
//        <label>这是一个dom节点</label><input ref={domRef} />
//       </div>
//       <br />
//       <p onClick={showChild} style={{ marginTop: "20px" }}>
//         这是子组件
//       </p>
//       <div style={{ border: "1px solid", padding: "10px" }}>
//         <Child ref={childRef} />
//       </div>
//     </div> 
//   </>)
// }
function MyUseRef(){
  const r = useRef(0);
  function add(){
    r.current +=1
    console.log("此时修改了r.current",r.current)
  }
  return (<div>
      当前值{r.current}
      <div onClick={add}>点击修改</div>
  </div>)
}

function MockComponentUpdate(){
  const r = useRef(0);
  let [count,setCount] = useState(0);
  useEffect(()=>{
    console.log("useEffect触发了")
    r.current+=1;
    if(r.current>1){
      //表示当前count发生了变化
      console.log("mockComponentUpdate成功")
    }
  }) 
  return (<div>
    count的值：{count}
    <div onClick={()=>{setCount(count+1)}}>点击修改count+1</div>
  </div>)
}

//使用forwardRef进行包裹组件
const ChildRef =forwardRef((props,ref)=>{

  return <div ref={ref}> 子孩子</div>
})
// 复制 <div ref={ref}> 子孩子</div>
// 粘贴 字孩子
function GetForwardRef(){
  const inputRef = useRef(null);
  const childRef = useRef(null)
  const getRef = ()=>{
    console.log("inputRef",inputRef.current)
    console.log("childRef",childRef.current)
  }
  return (<div> 
    <button onClick={()=>{  getRef()}}>获取ref</button><br/>
    <input type="text" ref ={inputRef}/>
    <ChildRef ref={childRef}></ChildRef>
  </div>)
}
export default GetForwardRef;