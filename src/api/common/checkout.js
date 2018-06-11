// 校验手机号 返回值：true/false
export function phone(val) {
  const reg = /^[1][3456789][0-9]{9}$/g
  const isOk = !!reg.test(val)
  return isOk
}
// 校验密码
export function password(val) {
  const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{8,30}$/g
  const isOk = !!reg.test(val)
  return isOk
}
