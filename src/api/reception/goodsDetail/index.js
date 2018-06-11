import request from '@/utils/request'

// 商品详情---基础信息
export function getItemBaseInfo (query) {
  return request({
    url: '/itemDetailService/getItemBaseInfo',
    method: 'post',
    data: query
  })
}

// 商品技术参数
export function getSkuAttributeList (query) {
  return request({
    url: '/itemDetailService/getSkuAttributeList',
    method: 'post',
    data: query
  })
}

// 商品详情描述技术参数
export function getItemInfoDetail (query) {
  return request({
    url: '/itemDetailService/getItemInfoDetail',
    method: 'post',
    data: query
  })
}

// 加入收藏
export function addFavorites (query) {
  return request({
    url: '/mallCartService/addCart',
    method: 'post',
    data: query
  })
}
