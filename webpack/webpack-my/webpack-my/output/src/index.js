// import _ from 'lodash';
import printMe from './print.js';
import './styles.css'
import { cube } from './math.js';

function component() {
  var element = document.createElement('div');
  var btn = document.createElement('button');
  var element = document.createElement('pre');
  element.innerHTML = [
         'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
       ].join('\n\n')
    
  // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  // element.classList.add('color')
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;

  element.appendChild(btn);

  return element;
}

document.body.appendChild(component());

 if (module.hot) {
   module.hot.accept('./print.js', function() {
    console.log('Accepting the updated printMe module!');
    document.body.removeChild(element);
    let element = component(); // 当 print.js 改变导致页面重新渲染时，重新获取渲染的元素
    document.body.appendChild(element);
  })
 }