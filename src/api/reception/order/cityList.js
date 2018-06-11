import request from '@/utils/request'
// 城市列表

// 获取省市区
export function fetchCityList(query) {
  return request({
    url: '/areaService/getArea',
    method: 'post',
    data: query
  })
}

// 获取单挑地址信息
export function fetchAddressById(data) {
  return request({
    url: '/addressService/getAddressById',
    method: 'post',
    data
  })
}
