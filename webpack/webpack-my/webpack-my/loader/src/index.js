 
import _ from 'lodash'; 
import './index.css'
import './font/iconfont.css'
import Icon from './1.png'
import Data from './data.xml'
function component() {
    var element = document.createElement('div'); 
   // Lodash, currently included via a script, is required for this line to work
   // Lodash, now imported by this script
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello')
     // 将图像添加到我们现有的 div 
    var myIcon = new Image();
    myIcon.src = Icon;
    element.appendChild(myIcon);
    var ele =document.createElement('span');
    ele.classList.add('icon-huchudianhua')
    element.appendChild(ele);
    console.log(Data)
    return element;
  }

  document.body.appendChild(component());