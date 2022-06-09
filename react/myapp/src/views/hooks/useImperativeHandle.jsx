import React, { useImperativeHandle,useRef,forwardRef} from 'react'; 
function InputFouce(props, ref) {
  const inputRef = useRef();
  //能够在子组件中收集焦点文案
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    onChange:(e)=>{
      console.log(inputRef.current.value)
    }
  }));
  return <input ref={inputRef} value={props.value}/>;
}
//用fordward包起来 获取ref 将ref传入到子组件中
InputFouce = forwardRef(InputFouce); 

function MyuseIm(){
  const inputChildRef = useRef(0)

  const getFocus =()=>{
    //获取子组件中暴露给父组件的内容
    console.log(inputChildRef.current)
    inputChildRef.current.focus()
  }
  return(
    <div>
      <button onClick={getFocus}>子组件的输入框获取焦点</button>
      <InputFouce ref={inputChildRef}></InputFouce>
    </div>
  )
}

export default MyuseIm