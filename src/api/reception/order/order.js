import request from '@/utils/request'
// 订单

// 立即下单
export function fetchAddOrder(query) {
  return request({
    url: '/orderService/addOrder',
    method: 'post',
    data: query
  })
}
