 
export default class InterceptorManager{
  constructor(){
    this.handlers = [];
    // {
    //   resolve:[],
    //   reject:[],
    // }
  }
  use(resolveHandler,rejectHander){ 
    this.handlers.push({
      resolveHandler,
      rejectHander,
    })
  }
}