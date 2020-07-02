// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import globalAPI  from '../global/global';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueWechatTitle from 'vue-wechat-title';
import store from './store/index'

// 引用elementUi
Vue.use(ElementUI,{ size: 'small', zIndex:  3000 })
// 引用自定义标题
Vue.use(VueWechatTitle)


Vue.prototype.globalAPI = globalAPI;
Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
