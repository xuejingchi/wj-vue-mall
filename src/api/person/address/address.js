import request from '@/utils/request'

export function fetchModifyAddress(data) {
  return request({
    url: '/addressService/modifyAddress',
    method: 'post',
    data
  })
}

// 获取地址列表
export function getAddressList(data) {
  return request({
    url: '/addressService/getAddressListByUserId',
    method: 'post',
    data
  })
}

// 删除地址
export function deleteAddress(data) {
  return request({
    url: '/addressService/deleteAddress',
    method: 'post',
    data
  })
}

// 设为默认地址
export function setDefaultAddress(data) {
  return request({
    url: '/addressService/setDefaultAddress',
    method: 'post',
    data
  })
}
