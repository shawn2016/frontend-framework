import React, { PureComponent } from 'react';

//无状态组件
function Nostatus(){
  return <div>
    <h1>单纯渲染</h1>
    <p></p>
  </div>
}



//类组建
class StatueCom extends PureComponent {
  constructor(props) {
    super(props); 
    console.log(props)
    this.state = props.state
  }
  componentDidMount(){
    console.log("组建componentDidMount")
    console.log(this.state)
  }
  render() { 
    return (<div>
      <h1>有状态组件</h1>
    </div>  );
  }
}

let hocCom= (WrappedComponent) => {  
  return class extends PureComponent {
        constructor(props) {
          super(props)
          this.state = { //定义可复用的状态
            name:'ma'    
          } 
        } 
        componentWillMount() {
           console.log("我是高阶组件内容-------")
        } 
        render() {
          return (
            <div>
              <WrappedComponent getName={this.getName} state={this.state} {...this.props}/>
            </div>
          )
        }
      }
}

 
export default hocCom(StatueCom);
// export default Nostatus;