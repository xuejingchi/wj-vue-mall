import request from '@/utils/request'

export function fetchAuthInfo(data) {
  return request({
    url: '/companyService/getCompanyInfoByUserId',
    method: 'post',
    data
  })
}
