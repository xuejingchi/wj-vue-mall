import request from '@/utils/request'
// 获取供方派发单列表
export function findContractList(query) {
  return request({
    url: '/findContractService/findContractList',
    method: 'post',
    data: query
  })
}
// 获取合同的发货通知单列表
export function findDeliverNoticeList(query) {
  return request({
    url: '/findDeliverService/findDeliverNoticeList',
    method: 'post',
    data: query
  })
}
// 获取合同的详情
export function fgetContractInfo(query) {
  return request({
    url: '/findContractService/getContractInfo',
    method: 'post',
    data: query
  })
}
// 获取合同的详情
export function confirmationContract(query) {
  return request({
    url: '/confirmationContractService/confirmationContract',
    method: 'post',
    data: query
  })
}
// 合同对应的发货单信息列表
export function findDeliverInfoList(query) {
  return request({
    url: '/findDeliverService/findDeliverInfoList',
    method: 'post',
    data: query
  })
}
// 获取发货单的物流信息列表
export function findLogisticsList(query) {
  return request({
    url: '/findLogisticsService/findLogisticsList',
    method: 'post',
    data: query
  })
}

// 需求发布
export function addDemandInfo (query) {
  return request({
    url: '/demandService/addDemandInfo',
    method: 'post',
    data: query
  })
}

// 需求详情
export function getDemandInfo (query) {
  return request({
    url: '/demandService/getDemandInfo',
    method: 'post',
    data: query
  })
}

// 需求记录列表
export function getRecordList(query) {
  return request({
    url: '/demandService/findDemandList',
    method: 'post',
    data: query
  })
}

// 需求确认
export function affirmScheme(query) {
  return request({
    url: '/demandService/updateSchemeStatus',
    method: 'post',
    data: query
  })
}

// 获取需求列表附件
export function getAccessoryList(query) {
  return request({
    url: '/demandService/findSchemeList',
    method: 'post',
    data: query
  })
}

// 需方-派发单列表
export function findSchemeList (query) {
  return request({
    url: '/demandService/findSchemeList',
    method: 'post',
    data: query
  })
}

// 供方-发货单通知
export function getDeliveryNoticeInfo (query) {
  return request({
    url: '/findContractService/getDeliveryNoticeInfo',
    method: 'post',
    data: query
  })
}

// 需方 --- 付款历史
export function findPaymentHistory (data) {
  return request({
    url: '/findContractService/findPaymentHistory',
    method: 'post',
    data
  })
}

// 需方 --- 付款凭证
export function voucherUpload (data) {
  return request({
    url: '/findContractService/voucherUpload',
    method: 'post',
    data
  })
}

// 需方 --- 发货详情
export function getDeliveryInfo (data) {
  return request({
    url: '/findContractService/getDeliveryInfo',
    method: 'post',
    data
  })
}

// 需方 --- 发货单签收
export function logisticsReceipt (data) {
  return request({
    url: '/findContractService/logisticsReceipt',
    method: 'post',
    data
  })
}
