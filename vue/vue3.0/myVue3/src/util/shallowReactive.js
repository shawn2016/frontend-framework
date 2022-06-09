 

//包装成proxy
function shallowReactive(obj){
  return new Proxy(obj,{
    get(obj,key){
      return obj[key]
    },
    set(obj,key,val){
      obj[key] = val;
      // 更新ui界面
      console.log("更新ui界面")
      return true;
    }
  })
}


// 包装内容
function  shallowRef(val){
  return new shallowReactive({value:val})
}


function reactive(obj){
  //对对象进行遍历
  if(typeof obj == 'object'){
    if(obj instanceof Array){
     //如果是数组 取出数组中的每一个元素 
     //判断元素是否又是一个对象，如果是一个对象，则包装成proxy
     obj.forEach((item,index)=>{
       if(typeof item === 'object'){
          obj[index] = reactive(item)
       }
     })
    }else{
      //如果是一个对象 那么取出对象属性的值进行判断，判断对象属性是否是一个对象，如果也是一个对象，进行遍历
      for(var key in obj){
        if(typeof obj[key] === 'object'){
          obj[key] = reactive(item)
       }
      } 
    }
    return  new Proxy(obj,{
      get(obj,key){
        return obj[key]
      },
      set(obj,key,val){
        obj[key] = val;
        // 更新ui界面
        console.log("更新ui界面")
        return true;
      }
    })
  }else{
     console.warn(`message:${obj} is not object`)
  }
}

// let arr = [{id:1},{id:2},{id:3}];
// let stateArr =reactive(arr);
// stateArr[0].id=4
// stateArr[1].id=5

function ref(val){
  return reactive({value:val})
}

function shallowReadonly(obj){
  return new Proxy(obj,{
    get(obj,key){
      return obj[key]
    },
    set(obj,key,val){ 
      console.warn(`message:${key} can not set value`) 
      return true;
    }
  })
}
function readonly(obj){
  //对对象进行遍历
  if(typeof obj == 'object'){
    if(obj instanceof Array){
     //如果是数组 取出数组中的每一个元素 
     //判断元素是否又是一个对象，如果是一个对象，则包装成proxy
     obj.forEach((item,index)=>{
       if(typeof item === 'object'){
          obj[index] = reactive(item)
       }
     })
    }else{
      //如果是一个对象 那么取出对象属性的值进行判断，判断对象属性是否是一个对象，如果也是一个对象，进行遍历
      for(var key in obj){
        if(typeof obj[key] === 'object'){
          obj[key] = reactive(item)
       }
      } 
    }
    return  new Proxy(obj,{
      get(obj,key){
        return obj[key]
      },
      set(obj,key,val){ 
        // 更新ui界面
        console.warn(`message:${key} can not set value`)
        return true;
      }
    })
  }else{
     console.warn(`message:${obj} is not object`)
  }
}

