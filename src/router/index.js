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
import Parameter from '@/pages/system/parameter'
import homeCustomer from '@/pages/customer/home'
import Carousel from '@/pages/system/carousel'

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
      name: 'index',
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
        path: '/parameter',
        name: 'parameter',
        component: Parameter,
        meta: {
          title : '系统参数'
        },
      },
      {
        path: '/customerHome',
        name: 'homeCustomer',
        component: homeCustomer,
        meta: {
          title : '租客列表'
        },
      },
      {
        path: '/homeList',
        name: 'Home',
        component: Home,
        meta: {
          title : '房间数据'
        },
      },
      {
        path: '/carousel',
        name: 'Carousel',
        component: Carousel,
        meta: {
          title : '首页轮播图'
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
