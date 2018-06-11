import request from '@/utils/request'
// 首页

// 解决方案或帮助中心列表
export function findHelpAndSolutionList(query) {
  return request({
    url: '/helpAndSolutionService/findHelpAndSolutionList',
    method: 'post',
    data: query
  })
}

// 解决方案或帮助中心列表
export function getInformationDetail(query) {
  return request({
    url: '/helpAndSolutionService/getInformationDetail',
    method: 'post',
    data: query
  })
}
