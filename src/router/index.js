import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
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
      }
    }
  ]
})
