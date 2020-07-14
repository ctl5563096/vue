import axios from 'axios'
import QS from 'qs'
import { Message } from 'element-ui'
import router from '../src/router/index'
import store from '../src/store'

// 路由跳转控制
router.beforeEach((to, from, next) => {
  next()
})
router.afterEach((to, from) => {

})
const service = axios.create({
  baseURL: 'http://localhost', 
  timeout: 5000 ,
  headers: {
    'Content-Type': 'application/json'
  }
})


// 请求发起前的拦截处理
service.interceptors.request.use(config => {
  const token = store.state.token;
  //  看是否携带token值去请求 
  token && (config.headers.Authorization = token);   
  console.log(token);
  return config;  
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(config => {
  // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据     
  // 否则的话抛出错误
  if (response.status === 200) {            
      return Promise.resolve(response);        
  } else {            
      return Promise.reject(response);        
  }
}, error => {
  // return Promise.reject(error);
  if (error.response.status){
    switch (error.response.status) {
      case 401:
        router.replace({                        
          path: '/login',                        
          query: { 
              redirect: router.currentRoute.fullPath 
          }
        });
        break;
      case 403:
        Message({
          message : 'token过期，请重新登录',
          type: 'error',
          duration: 3 * 1000
        })
        localStorage.removeItem('token');
        store.state.token = '';
        setTimeout(() => {                        
          router.replace({                            
              path: '/login',                            
              query: { 
                  redirect: router.currentRoute.fullPath 
              }                        
          });                    
        }, 1000);                    
        break;
      case 404:
        Message({
          message : '网络请求不存在',
          type: 'error',
          duration: 3 * 1000
        })
        break;
      default:
        Message({
          message : '系统错误,请联系管理员',
          type: 'error',
          duration: 3 * 1000
        })
        break;
    }
    return Promise.reject(error.response)
  }
})

// 封装get方法
export function get(url, params){    
  return new Promise((resolve, reject) =>{        
    service.get(url, {            
          params: params        
      }).then(res => {
          resolve(res.data);
      }).catch(err =>{
          reject(err.data)        
  })    
})};

// 封装post方法
export function post(url, params) {
  console.log(service);
  service.post(url, QS.stringify(params))
  return
  return new Promise((resolve, reject) => {
       axios.post(url, QS.stringify(params))
      .then(res => {
          resolve(res.data);
      })
      .catch(err =>{
          reject(err.data)
      })
})};
