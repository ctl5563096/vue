import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
  state:{
    //存放的键值对就是所要管理的状态
    token:''
  },
  mutations: {
    // 改变state里面的值一定要通过mutations 不然不经过vuex的生命周期无法记录
    setToken (state,token) {
      // 变更状态
      state.token = token
    }
  },
  plugins:[createPersistedState({ storage: window.sessionStorage })]
})

export default store
