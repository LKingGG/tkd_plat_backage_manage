import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
import { getToken } from '@/utils/auth'
import qs from 'qs'
// 导入本地json

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})
// request interceptor
service.interceptors.request.use(
  config => {
    console.log(Object.prototype.toString.call(config.data))
    console.log(config.data)
    if (Object.prototype.toString.call(config.data) === '[object FormData]') {
      // 请求拦截器处理
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': getToken() ? getToken() : ''
      }
    } else {
      /* config.data = JSON.stringify(config.data); */
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        'Authorization': getToken() ? getToken() : ''
      }
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

  /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    console.log(res)
    if (res.code != 0) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 2 && window.location.pathname.indexOf("login") === -1) {
        // to re-login
        MessageBox.confirm('您的登录已过期', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          router.push(`/login?redirect=${this.$route.fullPath}`)
          store.dispatch('user/login').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
