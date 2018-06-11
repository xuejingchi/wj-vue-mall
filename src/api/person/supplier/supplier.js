import request from '@/utils/request'
// 获取供方派发单列表
export function findSolutionList(query) {
  return request({
    url: '/solutionService/findSolutionList',
    method: 'post',
    data: query
  })
}

// 获取单派发详情页面
export function getSolutionInfo(query) {
  return request({
    url: '/solutionService/getSolutionInfo',
    method: 'post',
    data: query
  })
}

// 需求发布
export function addDemandInfo(query) {
  return request({
    url: '/demandService/addDemandInfo',
    method: 'post',
    data: query
  })
}

// 锁货通知
export function getInformList(query) {
  return request({
    url: '/salesReservationService/findSalesReservationList',
    method: 'post',
    data: query
  })
}

// 获取单条锁货详情
export function getSalesReservationInfo(query) {
  return request({
    url: '/salesReservationService/getSalesReservationInfo',
    method: 'post',
    data: query
  })
}

// 获取单提交
export function uploadAttachment(query) {
  return request({
    url: '/solutionService/uploadAttachment',
    method: 'post',
    data: query
  })
}

// 获取订单列表
export function findOrderList(query) {
  return request({
    url: '/purchaseOrderService/findOrderList',
    method: 'post',
    data: query
  })
}

// 获取订单执行下的发货单列表
export function findInvoiceList(query) {
  return request({
    url: '/purchaseOrderService/findInvoiceList',
    method: 'post',
    data: query
  })
}

// 获取发货管理-发货通知列表
export function findDeliveryNoticeList(query) {
  return request({
    url: '/deliveryService/findDeliveryNoticeList',
    method: 'post',
    data: query
  })
}

// 获取发货信息列表
export function findDeliveryList(query) {
  return request({
    url: '/deliveryService/findDeliveryList',
    method: 'post',
    data: query
  })
}

// 获取订单发货商品详情
export function getDeliveryItem(data) {
  return request({
    url: '/deliveryService/getDeliveryItem',
    method: 'post',
    data
  })
}

// 供方 --- 订单详情
export function getOrderInfo (query) {
  return request({
    url: '/purchaseOrderService/getOrderInfo',
    method: 'post',
    data: query
  })
}

// 供方 --- 确认订单
export function confirmOrder (query) {
  return request({
    url: '/purchaseOrderService/confirmOrder',
    method: 'post',
    data: query
  })
}

// 获取已发货订单商品详情
export function getDeliveryInfo(data) {
  return request({
    url: '/deliveryService/getDeliveryInfo',
    method: 'post',
    data
  })
}

// 供方-发货单通知
export function getSupplierDeliveryNoticeInfo (query) {
  return request({
    url: '/deliveryService/getSupplierDeliveryNoticeInfo',
    method: 'post',
    data: query
  })
}
// 获取已发货订单商品详情
export function submitDeliveryInfo(data) {
  return request({
    url: '/deliveryService/submitDeliveryInfo',
    method: 'post',
    data
  })
}

// 获取已发货订单商品详情
export function getSolutionPurchaseExcel(data) {
  return request({
    url: 'solutionService/getSolutionPurchaseExcel',
    method: 'post',
    data
  })
}
