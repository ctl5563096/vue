import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
  state:{
    //存放的键值对就是所要管理的状态
    token:'',
    userInfo:'',
    userId:'',
    loading:true
  },
  mutations: {
    // 改变state里面的值一定要通过mutations 不然不经过vuex的生命周期无法记录
    // 记录token
    setToken (state,token) {
      state.token = token
    },
    // 将用户信息存储到缓存里面
    setUserInfo(state,userInfo){
      state.userInfo = userInfo
      let userObj = JSON.parse(userInfo)
      state.userId = userObj.id
    },
    // 更改loading图标
    setLoading(state,loading){
      state.loading = loading
    }
  },
  plugins:[createPersistedState({ storage: window.sessionStorage })]
})

export default store
