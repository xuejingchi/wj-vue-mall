import request from '@/utils/request'
// 订单页，收藏功能

// 获取收藏列表--favoritesList
export function getFavoritesListByUserId(query) {
  return request({
    url: '/favoritesListByUserIdService/getFavoritesListByUserId',
    method: 'post',
    data: query
  })
}

// 添加收藏
export function fetchAddFavorites(query) {
  return request({
    url: '/mallCartService/addFavorites',
    method: 'post',
    data: query
  })
}

// 移除收藏列表--favoritesList
export function fetchRemoveFavorites(query) {
  return request({
    url: '/favoritesService/removeFavorites',
    method: 'post',
    data: query
  })
}
