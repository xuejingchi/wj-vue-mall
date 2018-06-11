import request from '@/utils/request'
// 首页

// 品牌列表
export function findBrandList(query) {
  return request({
    url: '/brandService/findBrandList',
    method: 'post',
    data: query
  })
}

// 品牌详情
export function getBrandDetailById(query) {
  return request({
    url: 'brandService/getBrandDetailById',
    method: 'post',
    data: query
  })
}
