import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Order from '@/pages/order'
import Error from '@/components/error'
import Index from '@/pages/index'
import Personal from '@/components/personal'
import Rule from '@/pages/role/role'
import User from '@/pages/user/list'
import House from '@/pages/data/house'
import Home from '@/pages/data/Home'

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
          title : '个人资料页'
        },
      },
      {
        path: '/ruleList',
        name: 'rule',
        component: Rule,
        meta: {
          title : '权限控制'
        },
      },
      {
        path: '/userList',
        name: 'user',
        component: User,
        meta: {
          title : '用户列表'
        },
      },
      {
        path: '/houseList',
        name: 'house',
        component: House,
        meta: {
          title : '房屋列表'
        },
      },
      {
        path: '/homeDetail',
        name: 'home',
        component: Home,
        meta: {
          title : '房屋详情'
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
