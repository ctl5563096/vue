import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Order from '@/pages/order'
import Error from '@/components/error'
import Index from '@/pages/index'
import Personal from '@/components/personal'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login, 
      meta: {
        title : '后台登录'
       }
    },
    {
      path: '/home',
      name: '',
      component: () => import('../pages/Home.vue'),
      meta: {
        title : '主页'
      },
      children: [  
      {
        path:'/order',
        name: 'Order',
        component: Order,
        meta: {
          title : '订单页'
        },
      },
      {
        path: '/index',
        name: 'Index',
        component: Index,
        meta: {
          title : '主页'
        },
      },
      {
        path: '/personal',
        name: 'personal',
        component: Personal,
        meta: {
          title : '个人治疗页'
        },
      },
      {
        path:'*',
        component:Error
      },
      ]
    },
  ]
})
