import request from '@/utils/request'
import { getUserInfo } from '@/utils/auth'

export function fetchVerifyCode() {
  return request({
    url: '/userService/getVerifyCode',
    method: 'post'
  })
}
export function logOut() {
  return request({
    url: '/accountService/logout',
    method: 'post',
    data: {
      token: getUserInfo().token
    }
  })
}
