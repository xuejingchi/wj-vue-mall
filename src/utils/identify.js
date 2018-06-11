import { getAcountFlag, getAllCookie } from '@/api/person/identification'
import { getUserInfo, getAccountFlag, setUserInfo, setAccountFlag, setCustomerLevel, setToken, setUserId, setCompanyId, setCompanyStatus, setCompanyName, setCompanyFlag, setPhoneNumber, setUserName } from '@/utils/auth.js'

export function configAccountFlag (component) {
  return new Promise((resolve, reject) => {
    if (getUserInfo().userId) {
      getAcountFlag({
        userId: getUserInfo().userId
      }).then(res => {
        if (res.data.code === 200) {
          if (!res.data.data) {
            component.$router.push('/identification')
            reject(new Error())
          }
          let userInfo = getUserInfo()
          let accountFlag = getAccountFlag()
          if (accountFlag !== res.data.data && accountFlag !== 'null' && accountFlag !== undefined) {
            let parmas = {
              token: getUserInfo().token
            }
            getAllCookie(parmas).then(res => {
              if (res.data.code === 200) {
                setToken(res.data.data.token)
                setUserId(res.data.data.userId)
                setCompanyId(res.data.data.companyId)
                setCompanyStatus(res.data.data.companyStatus)
                setCompanyName(res.data.data.companyName)
                setCompanyFlag(res.data.data.companyFlag)
                setAccountFlag(res.data.data.accountFlag)
                setCustomerLevel(res.data.data.customerLevel)
                setPhoneNumber(res.data.data.phoneNumber)
                setUserName(res.data.data.userName)
                setUserInfo(JSON.stringify(res.data.data))
                window.location.reload()
              }
            })
          }
          userInfo.accountFlag = res.data.data
          setUserInfo(JSON.stringify(userInfo))
          setAccountFlag(res.data.data)
          if (res.data.data === '1') {
            component.$router.push('/identification')
            reject(new Error())
          }
          if (res.data.data === '2') {
            component.$router.push('/identification/result')
            reject(new Error())
          }
          if (res.data.data === '3') {
            resolve()
          }
        } else {
          reject(new Error())
        }
      }, err => {
        reject(new Error(err))
      })
    }
  })
}
