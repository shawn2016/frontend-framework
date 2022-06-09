/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-27 08:57:19
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-27 09:23:46
 */
import React from 'react' 
import { HashRouter as Router, Route, Redirect,Switch } from 'react-router-dom' 
import MainRouterList from './page'  
import Loadable from 'react-loadable' 
const RouterList = [
  ...MainRouterList
]  
function RouterMap() {  
    return (
      <Router>
        <Switch> 
          {RouterList.map(route => {  
           var Component= Loadable({
              loader:route.component,
              loading: () => (<div>加载中</div>)
            }) 
              return <Route
                key={route.path}  
                exact
                path={route.path} 
                render={props => { 
                  
                  //页面title设置
                  var title = (route.meta && route.meta.title) || "满惠"  
                     document.title =title;   
                  return <Component  {...props}   routes={route.routes}></Component>
              }} 
              />
          })} 
          <Redirect to='/'></Redirect>
        </Switch>
      </Router> 
   )
  } 

export default RouterMap;
