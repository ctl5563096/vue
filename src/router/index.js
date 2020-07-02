import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: { 
        title : '后台登录'
       }
    },
    {
      path: '/test',
      name: 'Test',
      component: () => import('../pages/Test.vue'),
      meta: {
        word: '新增记录', keepAlive: false
      }
    }
  ]
})
