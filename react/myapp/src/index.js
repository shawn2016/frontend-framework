/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-27 08:43:03
 * @LastEditors: Mfy
 * @LastEditTime: 2021-01-27 09:24:09
 */
import React from 'react';
import ReactDOM from 'react-dom'; 
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import Router from './router/index' 


ReactDOM.render( 
  <React.StrictMode> 
    <Router></Router>
    {/* <App /> */}
  </React.StrictMode>,
   document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
