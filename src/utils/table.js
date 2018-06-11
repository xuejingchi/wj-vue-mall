export function getSummaries (param, properties) {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    if (properties.indexOf(column.property) > -1) {
      const values = data.map(item => {
        return Number(item[column.property])
      })
      if (!values.every(value => isNaN(value))) {
        sums[index] = values.reduce((prev, curr) => {
          const value = Number(curr)
          if (!isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)
      } else {
        sums[index] = ''
      }
    } else {
      sums[index] = ''
    }
  })
  return sums
}
