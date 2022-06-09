import React, { PureComponent,useState,useEffect } from 'react';
import { Button,Flex,Card,List } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
import axios from 'axios' 
import './index.css'


function equal(arr1,arr2){
  if(arr2.length ==0 && arr1.length ==1) return true;
  if(arr1.length != arr2.length) return false;
  return arr2.every((item,idex)=>item === arr1[idex])
 }
 //自定义hook


function DefineHook(){
  const [arr1, setArr1] = useState([1]);
  const [arr2, setArr2] = useState([1]);

  //每次修改的时候都会重新render，调用当前的内容
  const isEq = equal(arr1,arr2) 
 
  return (<div className="container-box">
    <h1>demo hook</h1>
    <Flex justify="between" align="start">
      <Card>
       <Button onClick={()=>{setArr1([...arr1,1])}}>新增数字1</Button>
       {arr1.map((item,index)=>{
         return (<div className="item" key={index}>{item}</div>)
       })}
       <Button onClick={()=>{setArr1([...arr1,2])}}>新增数字2</Button>
      </Card> 
       是否相等{isEq+''}
      <Card>
       <Button onClick={()=>{setArr2([...arr2,1])}}>新增数字1</Button>
       {arr2.map((item,index)=>{
         return (<div className="item" key={index}>{item}</div>)
       })}
       <Button onClick={()=>{setArr2([...arr2,2])}}>新增数字2</Button>
      </Card>  
    </Flex>
  </div>)
}


function useEqualArr(){
  const [arrA, setArrA] = useState([]);
  const [arrB, setArrB] = useState([])
  const isEqual = equal(arrA,arrB)
  return { arrA,setArrA,arrB,setArrB,isEqual }
}
function UseDefineHook(){
  const {arrA, arrB, setArrA, setArrB, isEqual} = useEqualArr();
  return (<div className="container-box">
    <h1>demo hook</h1>
    <Flex justify="between" align="start">
      <Card>
       <Button onClick={()=>{setArrA([...arrA,1])}}>新增数字1</Button>
       {arrA.map((item,index)=>{
         return (<div className="item" key={index}>{item}</div>)
       })}
       <Button onClick={()=>{setArrA([...arrA,2])}}>新增数字2</Button>
      </Card> 
       是否相等{isEqual+''}
      <Card>
       <Button onClick={()=>{setArrB([...arrB,1])}}>新增数字1</Button>
       {arrB.map((item,index)=>{
         return (<div className="item" key={index}>{item}</div>)
       })}
       <Button onClick={()=>{setArrB([...arrB,2])}}>新增数字2</Button>
      </Card>  
    </Flex>
  </div>)
}

//实现一个hook，请求api

// 
let data ={"date":"20210205","stories":[{"image_hue":"0xb3947d","title":"有哪些适合在春节期间与父母一同玩耍的桌游？","url":"https:\/\/daily.zhihu.com\/story\/9732718","hint":"一刻馆桌游 · 3 分钟阅读","ga_prefix":"020507","images":["https:\/\/pic4.zhimg.com\/v2-2025d9ea8b594947b0c97f1858992b67.jpg?source=8673f162"],"type":0,"id":9732718},{"image_hue":"0xb39c7d","title":"现代生活中，早餐的重要性多大？","url":"https:\/\/daily.zhihu.com\/story\/9732797","hint":"倩Sur · 4 分钟阅读","ga_prefix":"020507","images":["https:\/\/pic2.zhimg.com\/v2-4c81e8be21cfaeaa0b5b1b72fe141826.jpg?source=8673f162"],"type":0,"id":9732797},{"image_hue":"0x454130","title":"拍电影真的需要那么多人吗？","url":"https:\/\/daily.zhihu.com\/story\/9732794","hint":"张释元RICO · 2 分钟阅读","ga_prefix":"020507","images":["https:\/\/pic1.zhimg.com\/v2-91d40c5f4d1dd8108410ebb2e977f9a4.jpg?source=8673f162"],"type":0,"id":9732794},{"image_hue":"0xb3b3b3","title":"为何清华大学比北京大学距离地铁口远？","url":"https:\/\/daily.zhihu.com\/story\/9732780","hint":"万金油 · 1 分钟阅读","ga_prefix":"020507","images":["https:\/\/pic1.zhimg.com\/v2-8d0112e639ccdfa1c486cb14cf9a791b.jpg?source=8673f162"],"type":0,"id":9732780},{"image_hue":"0xb38452","title":"欧洲城堡很多修在小山丘上，在中世纪如何解决饮水问题?","url":"https:\/\/daily.zhihu.com\/story\/9732773","hint":"知乎用户 · 2 分钟阅读","ga_prefix":"020507","images":["https:\/\/pic1.zhimg.com\/v2-9da320500827bd264505516cf203f723.jpg?source=8673f162"],"type":0,"id":9732773},{"image_hue":"0x2d3140","title":"瞎扯 · 如何正确地吐槽","url":"https:\/\/daily.zhihu.com\/story\/9732772","hint":"VOL.2587","ga_prefix":"020506","images":["https:\/\/pic1.zhimg.com\/v2-0bfe71a6f7b7d8c2dcbcff1622d637d6.jpg?source=8673f162"],"type":0,"id":9732772}],"top_stories":[{"image_hue":"0xb3a378","hint":"作者 \/ 杨韬","url":"https:\/\/daily.zhihu.com\/story\/9732707","image":"https:\/\/pic2.zhimg.com\/v2-0d5f90a3cd99753801725441f8788cf9.jpg?source=8673f162","title":"通假字是古人的错别字吗？","ga_prefix":"020407","type":0,"id":9732707},{"image_hue":"0x211e17","hint":"作者 \/ 喜剧杂货铺","url":"https:\/\/daily.zhihu.com\/story\/9732645","image":"https:\/\/pic1.zhimg.com\/v2-5dc1bebc1699fd55f23c51ffb57c9e1d.jpg?source=8673f162","title":"回看《武林外传》你有哪些新感受？","ga_prefix":"020207","type":0,"id":9732645},{"image_hue":"0xb3967d","hint":"作者 \/ 再来人留学","url":"https:\/\/daily.zhihu.com\/story\/9732470","image":"https:\/\/pic2.zhimg.com\/v2-a7f3a182710786229bc2a459b118e61e.jpg?source=8673f162","title":"低等动物拥有哪些令人叹为观止的记忆？","ga_prefix":"012907","type":0,"id":9732470},{"image_hue":"0xb39e7d","hint":"作者 \/ 李明殊","url":"https:\/\/daily.zhihu.com\/story\/9732458","image":"https:\/\/pic1.zhimg.com\/v2-81ff95f469f33cfc76d9f171866d8394.jpg?source=8673f162","title":"快门速度是什么？","ga_prefix":"012707","type":0,"id":9732458},{"image_hue":"0x292f3b","hint":"作者 \/ 苏澄宇","url":"https:\/\/daily.zhihu.com\/story\/9732404","image":"https:\/\/pic1.zhimg.com\/v2-6d88833c20912673417d2c297402dd5b.jpg?source=8673f162","title":"一个人正常的挨饿极限是多少？","ga_prefix":"012607","type":0,"id":9732404}]}
function useFeed(initValue){
  const [feed, setFeed] = useState(initValue);
  const [loading, setLoad] = useState(true);
  useEffect(() => { 
    if(!loading) {
      return ;
    } 
    //...假装去请求了
    setLoad(false) 
    setFeed(data) 
  }, [loading]); 
  return {feedList:feed,loading,setLoad};
}

function GetFeedList(){
  let {feedList,loading,setLoad} = useFeed({}) 
  if(loading){
    return <div>加载数据中</div>
  } 
  if(!feedList) return (<div> <Button onClick={()=>{setLoad(true)}}> 刷新页面数据</Button>数据为空 </div>)
  let { stories,top_stories} = feedList
  return (<div>
    <Button onClick={()=>{setLoad(true)}}> 刷新页面数据</Button>
    <div></div>
    <h1>故事荟萃</h1> 
    { stories.length>0 && stories.map((item,index)=>{
      return (<Card key={index} className="item-box"> 
        <Flex justify="start" align="center">
          <img src={item.images[0]} alt=""/>
          <div className="right">
            <p className="title">{item.title}</p>
            <span >{item.hint}</span>
          </div>
        </Flex> 
      </Card>) 
    })}
    <h1>热点故事</h1>
    {top_stories.length>0 &&  top_stories.map((item,index)=>{
    return (<Card key={index} className="item-box" > 
      <Flex justify="start" align="center">
        <img src={item.image} alt=""/>
        <div className="right">
          <p className="title">{item.title}</p>
          <span >{item.hint}</span>
        </div>
      </Flex> 
    </Card>) 
  })}
  </div>)
  
}

export default GetFeedList;