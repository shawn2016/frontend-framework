/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-02-05 10:09:24
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-05 10:30:47
 */
import React, { useState } from 'react';
import { Slider } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import './index.css'

function UseStateDemo(){
  const [width,setWidth] = useState(10)
  const [height,setHeight] = useState(10)
  const [color,setColor] = useState({r:0,g:0,b:0})
  const [radius,setRadius] = useState(30)

  const style = {
    height:`${height}px`,
    width:`${width}px`,
    backgroundColor:`rgb(${color.r},${color.g},${color.b})`,
    borderRadius:`${radius}px`
  } 
  return (<div className="container">
    <h1>useState demo学习</h1>
    <div className="item">
      高度：<Slider max={300} min={10} onChange={(n)=>{setHeight(n|0)}}></Slider>
    </div>
    <div className="item">
    宽度:<Slider max={300} min={10} onChange={(n)=>{setWidth(n|0)}}></Slider>
    </div>
    <div className="item">
    颜色: <br></br>
     r:<Slider max={255} min={0} onChange={(n)=>{setColor({...color,r:n})}}></Slider>
     g:<Slider max={255} min={0} onChange={(n)=>{setColor({...color,g:n})}}></Slider>
     b:<Slider max={255} min={0} onChange={(n)=>{setColor({...color,b:n})}}></Slider>
     </div>
     <div className="item">
    半径：<Slider max={300} min={0} onChange={(n)=>{setRadius(n)}}></Slider> 
    </div>
    
    <div className="reactAngle" style={style}></div>
  </div>)
}
export default UseStateDemo;