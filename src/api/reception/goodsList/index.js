import request from '@/utils/request'
// 搜索接口
export function search(query) {
  return request({
    url: '/searchService/search',
    // url: '/mockjsdata/13/search',
    method: 'post',
    data: query
  })
}
// 加入采购清单
export function addFavorites(query) {
  return request({
    url: '/favoritesService/addFavorites',
    method: 'post',
    data: query
  })
}
// 获取SPU下商品列表
export function findSpuItemList(query) {
  return request({
    url: '/comparatorService/findSpuItemList',
    method: 'post',
    data: query
  })
}
// 获取比价器商品信息
export function findListItemInfo(query) {
  return request({
    url: '/comparatorService/findListItemInfo',
    method: 'post',
    data: query
  })
}
