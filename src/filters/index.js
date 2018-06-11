import moment from 'moment'
// 中文校验
const chineseReg = new RegExp('[\\u4E00-\\u9FFF]+', 'g')
const filterTimeToDate = (num) => {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

// 日期毫秒格式化 { TIME | timeFormat('YYYY-MM-DD  HH:mm:ss') }
const timeFormat = (value, format) => {
  if (value) {
    return moment(value).format(format)
  }
  return ''
}
const toThousands = num => {
  num = (parseInt(num, 10) || 0).toString()
  let result = ''
  while (num.length > 3) {
    let single = num.slice(-3) + result
    result = `,${single}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return result
}

// 精确到整数
const showPriceToIntegar = price => {
  if (chineseReg.test(price)) {
    return price
  }
  if (!price || parseInt(price, 10) < 0 || price === '议价') {
    return '议价'
  }
  return toThousands(price)
}

// 数量精确到整数
const showQuantityToIntegar = quantity => {
  if (!quantity) {
    return ''
  }
  if (quantity && quantity.toString().indexOf('.') > -1) {
    return quantity.toString().split('.')[0]
  } else {
    return quantity
  }
}

// 精确到一位小数
const showPriceToOneDecimal = price => {
  if (chineseReg.test(price)) {
    return price
  }
  if (!price || parseInt(price, 10) < 0 || price === '议价') {
    return '议价'
  }
  let intPart = toThousands(price)
  let floatPart = price.toString().indexOf('.') > -1 ? parseFloat(price).toFixed(1).toString().replace(/\d+\.(\d*)/, '$1') : '0'
  floatPart = floatPart.length ? floatPart.slice(0, 1) : '0'
  return `${intPart}.${floatPart}`
}

// 精确到两位小数
const showPriceToTwoDecimal = price => {
  if (chineseReg.test(price)) {
    return price
  }
  if (!price || parseInt(price, 10) < 0 || price === '议价') {
    return '议价'
  }
  let intPart = toThousands(price)
  let floatPart = price.toString().indexOf('.') > -1 ? parseFloat(price).toFixed(2).toString().replace(/\d+\.(\d*)/, '$1') : '0'
  if (!floatPart.length) {
    floatPart = '00'
  } else if (floatPart.length < 2) {
    floatPart += '0'
  } else {
    floatPart = floatPart.slice(0, 2)
  }
  return `${intPart}.${floatPart}`
}

// 仿JQuery检查class
const hasClass = (obj, cls) => {
  let objClass = obj.className
  let objClassLst = objClass.split(/\s+/)
  let x = 0
  for (x in objClassLst) {
    if (objClassLst[x] === cls) {
      return true
    }
  }
}
// 过滤信息数量, 超过显示99+ {{ number | filterNum}}
const filterNum = (num) => {
  if (num) {
    return num > 99 ? '99+' : num
  }
}

export {
  timeFormat,
  filterTimeToDate,
  showPriceToOneDecimal,
  showPriceToTwoDecimal,
  showPriceToIntegar,
  hasClass,
  filterNum,
  showQuantityToIntegar
}
