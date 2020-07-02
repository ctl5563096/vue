import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import router from '../src/router/index'

axios.defaults.headers = {
  'Content-Type': 'application/json'
}

axios.defaults.timeout = 10000

// 请求发起前的拦截处理
axios.interceptors.request.use(config => {
  return config;
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(config => {
  return config;
}, error => {
  return Promise.reject(error)
})
