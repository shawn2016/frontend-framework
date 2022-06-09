/*
 * @Descripttion: 
 * @version: 1.0.0
 * @Author: Mfy
 * @Date: 2021-01-27 08:58:12
 * @LastEditors: Mfy
 * @LastEditTime: 2021-02-07 13:50:41
 */

const pages = [
  {
    path: '/useState',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hooks/useState.jsx'),
    meta: {
      title: 'hooks学习'
    },
  },
  {
    path: '/useEffect',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hooks/useEffect.jsx'),
    meta: {
      title: 'hooks学习'
    },
  },
  {
    path: '/layoutEffect',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hooks/layoutEffect.jsx'),
    meta: {
      title: 'layoutEffect'
    },
  }, 
  {
    path: '/useContext',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hooks/useContext.jsx'),
    meta: {
      title: 'hooks学习'
    },
  },
  {
    path: '/useReducer',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hooks/useReducer.jsx'),
    meta: {
      title: 'useReducer 学习'
    },
  },
  {
    path: '/useRef',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hooks/useRef.jsx'),
    meta: {
      title: 'useRef 学习'
    },
  },
  {
    path: '/useMemo',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hooks/useMemo.jsx'),
    meta: {
      title: 'useMemo 学习'
    },
  },
  {
    path: '/useImperativeHandle',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hooks/useImperativeHandle.jsx'),
    meta: {
      title: 'useImperativeHandle 学习'
    },
  },
  {
    path: '/useDefineHook',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hooks/defineHook.jsx'),
    meta: {
      title: 'useImperativeHandle 学习'
    },
  },

  //手写react-hooks
  {
    path: '/write-useState',
    component: () => import( /* webpackChunkName: "hook" */ '../views/write-hooks/write-useState.jsx'),
    meta: {
      title: '手写write-useState'
    },
  },
  //demo
  {
    path: '/demo-useState',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hook-demo/useStateDemo'),
    meta: {
      title: 'useStateDemo'
    },
  },
  {
    path: '/demo-useEffect',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hook-demo/useEffectdemo'),
    meta: {
      title: 'useEffectDemo'
    },
  },
  {
    path: '/demo-defineHook',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hook-demo/defineHookdemo'),
    meta: {
      title: 'useDemoDefine'
    },
  },
  {
    path: '/demo-useReducer',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hook-demo/useReducer'),
    meta: {
      title: 'useDemoDefine'
    },
  },
  {
    path: '/demo-useContext',
    component: () => import( /* webpackChunkName: "hook" */ '../views/hook-demo/useContextdemo'),
    meta: {
      title: 'useContextDemo'
    },
  },
  {
    path: '/demo-fun',
    component: () => import( /* webpackChunkName: "hook" */ '../views/components-page/function.jsx'),
    meta: {
      title: 'useDemoFun'
    },
  },
  {
    path: '/demo-render-props',
    component: () => import( /* webpackChunkName: "hook" */ '../views/components-page/render-props'),
    meta: {
      title: 'useDemoRenderProps'
    },
  },
 
  
  
  
]
pages.map((item, index) => {
  var meta = Object.assign({ auth: true }, item.meta)
  return Object.assign(item, { meta })
})
export default pages;