import _ from 'lodash';
 import './styles.css'
 
function component() {
   var btn = document.createElement('button');
  var element = document.createElement('pre');
  element.innerHTML = [
         'Hello webpack!',
        '5 cubed is equal to ' + cube(5)
       ].join('\n\n')
 

  return element;
}
if (!PRODUCTION) {
  console.log('Debug info')
}

if (PRODUCTION) {
  console.log('Production log')
}

document.body.appendChild(component());

 