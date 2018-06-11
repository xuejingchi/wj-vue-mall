import { getUserInfo, removeUserInfo, getTk } from '@/utils/auth'
import axios from 'axios'
import { Message } from 'element-ui'
const CryptoJS = require('crypto-js')
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 30000 // request timeout
})
// request interceptor
service.interceptors.request.use(config => {
  // Do something before request is sentx
  let data = config.data
  let result
  if (config.headers['Content-Type'] === 'multipart/form-data') {
    result = data
    config.data = result
    return config
  }
  config.url = `${config.url}?randomNum=${Math.random()}`
  let val
  (data === undefined) ? (val = '') : (val = JSON.stringify(data))
  let dataEncrypt
  getTk()
    ? dataEncrypt = encodeURI(CryptoJS.AES.encrypt(val.toString(), CryptoJS.enc.Utf8.parse(getTk()), {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    }).toString())
    : dataEncrypt = val
  result = {
    data: dataEncrypt,
    tk: getTk(),
    token: getUserInfo().token
  }
  config.data = result
  return config
}, error => {
  // Do something with request error
  return Promise.reject(error)
})

// respone interceptor
service.interceptors.response.use(
  /**
   * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
   * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
   */
  response => {
    const res = response.data
    // const reg = /^1/
    // console.log(111, reg.test(res.code))
    if (res.code !== 200) {
      // 失效、没有token
      if (res.code === 10106 || res.code === 10107 || res.code === 10111) {
        Message({
          message: '登录失效',
          type: 'error',
          duration: 30 * 1000
        })
        removeUserInfo()
        setTimeout(() => {
          window.location.href = '/'
        }, 1500)
      }
      return Promise.resolve(response)
    } else {
      return Promise.resolve(response)
    }
  },
  error => {
    Message({
      message: '服务器请求超时',
      type: 'error',
      duration: 25 * 1000
    })
    return Promise.reject(error)
  })

export default service
