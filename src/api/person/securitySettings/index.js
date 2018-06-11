import request from '@/utils/request'
// 获取用户信息
export function getUserInfoByUserId(query) {
  return request({
    url: '/securityService/getUserInfoByUserId',
    method: 'post',
    data: query
  })
}
// 验证短信验证码
export function checkVerifyCode(query) {
  return request({
    url: '/verifyCodeService/checkVerifyCode',
    method: 'post',
    data: query
  })
}
// 修改手机号
export function modifyPhone(query) {
  return request({
    url: '/securityService/modifyPhone',
    method: 'post',
    data: query
  })
}
// 修改密码
export function modifyPassword(query) {
  return request({
    url: '/securityService/modifyPassword',
    method: 'post',
    data: query
  })
}
// 获取短信验证码
export function sendSmsCode(query) {
  return request({
    url: '/smsMsgService/sendSmsCode',
    method: 'post',
    data: query
  })
}
