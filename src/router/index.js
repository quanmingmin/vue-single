import Vue from 'vue'
import {EpetJs} from '@/utils/epetsdk'
import Router from 'vue-router'
import store from '@/store/index'

Vue.use(Router)

/*
title:页面标题
keepAlive:true是否缓存页面
requiresAuth:true页面是否需要登录
{
  path:'/about/:id(\\d+)',
  name: 'about',
  alias:'/about',
  redirect:'http://www.baidu.com',
  component:  resolve => require(['@/pages/about/about'], resolve),
  beforeEnter(to,from,next){
    next();
  },
  meta:{title:'about'},
  children:[{
    path:'list',
    name:'list',
    component:  resolve => require(['@/pages/about/list'], resolve),
    meta:{title:'list'}
  }]
},
{ path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }

*/

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component:  resolve => require(['@/pages/index/index'], resolve),//异步组件
      meta:{title:'index',keepAlive:true}
    },
    {
      path:'/about/:id(\\d+)',
      name:'about',
      component:  resolve => require(['@/pages/about/about'], resolve),
      props:(route) => {{ query:route.params.id}}
    },
    {
      path:'/login',
      name:'login',
      component:  resolve => require(['@/pages/login/login'], resolve),
      meta:{title:'登录-E宠商城',keepAlive:true}
    },
    { 
    	path: '*',
      name:'404', 
    	component: resolve => require(['@/pages/404/404'], resolve) 
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y:0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  store.commit('loading',{'Loading':true})

  /*
   设置页面title标题
  */
  if(to.meta.title){
    document.title = to.meta.title;
  }

  /*
  检测页面是否需要登录，如果需要且没有登录，自动跳转到登录页面
  */
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(!store.state.isLogin){
      EpetJs.Common.locationTo('wap:login');
      next();
    }else{
      next();
    }
  }else{
    next();
  }
})

router.afterEach((to, from) => {
  store.dispatch('loading',{'Loading':false})
})

export default router