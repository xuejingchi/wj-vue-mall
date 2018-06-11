import request from '@/utils/request'
// 首页

// 商品类目
export function updateBillStatus(data) {
  return request({
    url: '/findContractService/updateBillStatus',
    method: 'post',
    data
  })
}
