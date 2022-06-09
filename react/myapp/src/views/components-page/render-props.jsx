import React, { PureComponent } from 'react';
import {Button,Modal} from 'antd-mobile'
// 实现一个控制modal visible的高阶组件
class ToggleVisible extends React.Component {
  state = {
      visible: false
  };
  toggle = () => {
      this.setState({visible: !this.state.visible});
  }
  render() {  
    let visible = this.state.visible;
    let toggle = this.toggle 
      return (
          <> 
          {this.props.children({visible,toggle})}
          </>
      );
  }
}
//使用
const EditUser = () => (
  // 函数组件
   <ToggleVisible>
      {({visible, toggle}) => (<>
          <Modal visible={visible}/>
          <Button onClick={toggle}>打开/关闭modal</Button>
      </>)}
  </ToggleVisible>
)
export default EditUser;