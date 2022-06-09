 
export default (configs)=>{
  return new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest();
    xhr.onload=function(){
      
    }
    xhr.onreadystatechange =function(){
      if(xhr.readyState !==4) return ;
      if(xhr.readyState==4){
        console.log("刚刚响应回来")
        resolve( {
          data:xhr.response,
          statusCode:xhr.statusCode,
          statusText:xhr.responseText,
          header:xhr.getAllResponseHeaders()
        });
      }
    }
    xhr.open('get',configs.url)
    xhr.send();
  })
}