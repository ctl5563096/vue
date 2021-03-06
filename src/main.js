// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import globalAPI  from '../global/global';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueWechatTitle from 'vue-wechat-title';
import store from './store/index';
import HighchartsVue from 'highcharts-vue'

// 引入阿里字体图标
import './assets/font_20210205/iconfont.css'

// console.log(globalAPI);

// 引用elementUi
Vue.use(ElementUI,{ size: 'small', zIndex:  3000 })
// 引用自定义标题
Vue.use(VueWechatTitle)
Vue.use(HighchartsVue)

// 全局自定义常量
Vue.prototype.globalBaseUrl = globalAPI.apiBaseUrl;
Vue.prototype.globalAPI = globalAPI;
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    // 从url访问直接重定向到登录页面
    if(to.name === null){
      next('/login');
      return
    }
    // 路由守卫判断是否存在token 如果不存在就跳转到登录页面
    if(!store.state.token && to.name !== 'Login'){
      ElementUI.Message({
        message : 'token过期，请重新登录',
        type: 'error',
        duration: 3 * 1000
      })
      next('/login');
      return
    } else{
      next();
    }
  }
)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
