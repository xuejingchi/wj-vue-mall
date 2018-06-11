import request from '@/utils/request'
// 注册、 登录 、获取验证码

// 获取验证码
export function sendSmsCode(query) {
  return request({
    url: '/smsMsgService/sendSmsCode',
    method: 'post',
    data: query
  })
}

// 校验手机号码
export function verifyPhone(query) {
  return request({
    url: '/accountService/verifyPhone',
    method: 'post',
    data: query
  })
}

// 注册
export function register(query) {
  return request({
    url: '/accountService/register',
    method: 'post',
    data: query
  })
}

// 登录
export function login(query) {
  return request({
    url: '/accountService/login',
    method: 'post',
    data: query
  })
}

// 获取图片
export function getJigsaw(query) {
  return request({
    url: '/verifyJigsawService/getJigsaw',
    method: 'post',
    data: query
  })
}

// 滑动验证
export function verifyJigsaw(query) {
  return request({
    url: '/verifyJigsawService/verifyJigsaw',
    method: 'post',
    data: query
  })
}
