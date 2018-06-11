import request from '@/utils/request'

// 会员认证 --- 获取企业类型列表
export function getCompanyTypeList (query) {
  return request({
    url: '/companyService/getCompanyTypeList',
    method: 'post',
    data: query
  })
}

// 会员认证 --- 供方认证
export function supplierAuthentication (query) {
  return request({
    url: '/companyService/supplierAuthentication',
    method: 'post',
    data: query
  })
}

// 会员认证 --- 需方认证
export function customerAuthentication (query) {
  return request({
    url: '/companyService/customerAuthentication',
    method: 'post',
    data: query
  })
}

// 获取会员认证信息
export function getAcountFlag (query) {
  return request({
    url: '/accountService/getAccountFlagByUserId',
    method: 'post',
    data: query
  })
}

// 获取全部cookie
export function getAllCookie (query) {
  return request({
    url: '/accountService/getUserInfo',
    method: 'post',
    data: query
  })
}
