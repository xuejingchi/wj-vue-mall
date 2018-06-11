import request from '@/utils/request'
// 广告信息

// 获取广告列表
export function fetchAdvertisement(query) {
  return request({
    url: '/mallCartService/getAdvertisementList',
    method: 'post',
    data: query
  })
}

// 获取版本对应的CMS信息
export function fetchCMS(query) {
  return request({
    url: '/mallCartService/getCmsBySectionId',
    method: 'post',
    data: query
  })
}
