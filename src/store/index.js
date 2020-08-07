import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

//挂载Vuex
Vue.use(Vuex)
// 初始化stateInit 便于销毁vuex时候使用
const stateInit = {
  token:'',
  userInfo:'',
  userId:'',
  loading:true,
  menuLists:[] 
};
//创建VueX对象
const store = new Vuex.Store({
  state:{
    //存放的键值对就是所要管理的状态
    token:'',
    userInfo:'',
    userId:'',
    loading:true,
    menuLists:[] 
  },
  mutations: {
    // 改变state里面的值一定要通过mutations 不然不经过vuex的生命周期无法记录、
    // 清空state
    reset(state){
      // 清空state
      Object.assign(state,stateInit)
    },
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
    },
    // 设置菜单
    setMenuLists(state,menuLists){
      state.menuLists = menuLists
    }
  },
  plugins:[createPersistedState({ storage: window.sessionStorage })]
})

export default store
