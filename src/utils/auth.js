import Cookies from 'js-cookie'

const tk = 'tk'
const TokenKey = 'token'
const UserIdKey = 'userId'
const VerifyNum = 'verifyNum'
const CompanyId = 'companyId'
const userName = 'userName'
const companyStatus = 'companyStatus'
const companyName = 'companyName'
const companyFlag = 'companyFlag'
const companyCode = 'companyCode'
const accountFlag = 'accountFlag'
const customerLevel = 'customerLevel'
const phoneNumber = 'phoneNumber'
const userInfo = 'userInfo'

// 手机号
export function setPhoneNumber(token) {
  return Cookies.set(phoneNumber, token)
}

export function getPhoneNumber() {
  return Cookies.get(phoneNumber)
}

// userName
export function setUserName(token) {
  return Cookies.set(userName, token)
}

export function getUserName() {
  return Cookies.get(userName)
}

// 1、待提交；2、待认证；3、已认证；4、已驳回；
export function setCustomerLevel(token) {
  return Cookies.set(customerLevel, token)
}

export function getCustomerLevel() {
  return Cookies.get(customerLevel)
}

// 1、待提交；2、待认证；3、已认证；4、已驳回；
export function setCompanyStatus(token) {
  return Cookies.set(companyStatus, token)
}

export function getCompanyStatus() {
  return Cookies.get(companyStatus)
}
// 企业名称
export function setCompanyName(token) {
  return Cookies.set(companyName, token)
}

export function getCompanyName() {
  return Cookies.get(companyName)
}
export function removeCompanyName() {
  return Cookies.remove(companyName)
}

// 企业标识 1、供方，2、需方，
export function setCompanyFlag(token) {
  return Cookies.set(companyFlag, token)
}

export function getCompanyFlag() {
  return Cookies.get(companyFlag)
}
export function removeCompanyFlag() {
  return Cookies.remove(companyFlag)
}

// 企业代码
export function setCompanyCode(token) {
  return Cookies.set(companyCode, token)
}

export function getCompanyCode() {
  return Cookies.get(companyCode)
}

// 1: 注册未认证 2: 提交认证中 3:已认证
export function setAccountFlag(token) {
  return Cookies.set(accountFlag, token)
}

export function getAccountFlag() {
  return Cookies.get(accountFlag)
}

export function removeAccountFlag() {
  return Cookies.remove(accountFlag)
}

export function getTk() {
  return Cookies.get(tk)
}

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getCompanyId() {
  return Cookies.get(CompanyId)
}

export function setCompanyId(companyId) {
  return Cookies.set(CompanyId, companyId)
}

export function removeCompanyId() {
  return Cookies.remove(CompanyId)
}

export function getUserId() {
  return Cookies.get(UserIdKey)
}

export function setUserId(userId) {
  return Cookies.set(UserIdKey, userId)
}

export function removeUserId() {
  return Cookies.remove(UserIdKey)
}

export function setVerifyNum(verifyNum) {
  return Cookies.set(VerifyNum, verifyNum)
}

export function getVerifyNum() {
  return Cookies.get(VerifyNum)
}

export function removeVerifyNum() {
  return Cookies.remove(VerifyNum)
}

// 存储用户信息
export function setUserInfo(content) {
  return Cookies.set(userInfo, content)
}

// 获取用户信息
export function getUserInfo() {
  return Cookies.get(userInfo) ? JSON.parse(Cookies.get(userInfo)) : {}
}

export function removeUserInfo() {
  return Cookies.remove(userInfo)
}

export function removeCookies () {
  Cookies.remove(TokenKey)
  Cookies.remove(UserIdKey)
  Cookies.remove(CompanyId)
  Cookies.remove(companyName)
  Cookies.remove(companyFlag)
  Cookies.remove(companyCode)
  Cookies.remove(accountFlag)
  Cookies.remove(phoneNumber)
  Cookies.remove(userInfo)
}
