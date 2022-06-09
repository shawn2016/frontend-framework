 
// import { createNamespacedHelpers } from "vuex";
/**
 * 命名空间参数
 * @param {*} namespace 
 */
var createNamespacedHelpers = function (namespace) { return ({
  mapState: mapState.bind(null, namespace),
  mapGetters: mapGetters.bind(null, namespace),
  mapMutations: mapMutations.bind(null, namespace),
  mapActions: mapActions.bind(null, namespace)
}); };
//考虑嵌套问题 可能会影响到
// createNamespacedHelpers
export function mapState(stateArr){
  let obj = {};
  for(var i =0;i<stateArr.length;i++){
   let stateName =  stateArr[i];
   obj[stateName] = function(){
     return this.$store.state[stateName]
   }
  }
  return obj; 
}
export function mapGetters(gettersArr){
  let obj = {};
  for(var i =0;i<gettersArr.length;i++){
   let stateName =  gettersArr[i];
   obj[stateName] = function(){
     return this.$store.getters[stateName]
   }
  }
  return obj; 
}