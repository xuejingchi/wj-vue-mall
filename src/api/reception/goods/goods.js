import request from '@/utils/request'

// 获取商品详情
export function fetchItemInfoDetail(query) {
  return request({
    url: '/mallCartService/getItemInfoDetail',
    method: 'post',
    data: query
  })
}

// 获取商品技术参数
export function fetchSkuAttributeList(query) {
  return request({
    url: '/mallCartService/getSkuAttributeList',
    method: 'post',
    data: query
  })
}

// 获取商品三级类目临时推荐
export function fetchCorrelation(query) {
  return request({
    url: '/mallCartService/getCorrelationBySpuId',
    method: 'post',
    data: query
  })
}

// 搜索
export function fetchSearch(query) {
  return request({
    url: '/mallCartService/search',
    method: 'post',
    data: query
  })
}

// 获取首页详情(CMS)
export function fetchGoodsList(query) {
  return request({
    url: '/tagInfoService/getTagInfoList',
    method: 'post',
    data: query
  })
}
