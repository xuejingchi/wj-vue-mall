import request from '@/utils/request'
// 购物车

// 添加购物车
export function fetchAddCart(query) {
  return request({
    url: '/mallCartService/addCart',
    method: 'post',
    data: query
  })
}

// 从购物车删除
export function fetchRemoveCart(query) {
  return request({
    url: '/mallCartService/removeCart',
    method: 'post',
    data: query
  })
}

// 购物车列表--cartList
export function fetchCartList(query) {
  return request({
    url: '/mallCartService/getCartList',
    method: 'post',
    data: query
  })
}

// 修改购物车商品数量 orderService/createAdvanceOrder
export function modifyCart(query) {
  return request({
    url: '/mallCartService/modifyCart',
    method: 'post',
    data: query
  })
}

// 修改购物车商品数量
export function createAdvanceOrder(query) {
  return request({
    url: '/orderService/createAdvanceOrder',
    method: 'post',
    data: query
  })
}

// 提交采购清单
export function fetchBatchOrder(query) {
  return request({
    url: '/orderService/addBatchOrder',
    method: 'post',
    data: query
  })
}
