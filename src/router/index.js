import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Order from '@/pages/order'
import Error from '../pages/error.vue'
import Index from '@/pages/index'

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
        component: Order,
      },
      {
        path: '/index',
        name: 'Index',
        component: Index
      },
      {
        path: '/order',
        name: 'Order',
        component: Order
      },
      {
        path:'*',
        component:Error
      },
      ]
    },
  ]
})
