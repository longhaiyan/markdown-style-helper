const typeMap = require('./type-map')
exports.regWord = (line) => {
  let reg = typeMap.word.reg;
  let regResult = null

  let results = []
  let start = this.checkLine(line, typeMap.orderList.reg)
  let result = start ? line.replace(start, '') : line

  while ((regResult = reg.exec(line)) != null) {
    results.push(regResult[0])
  }
  if (results.length) {
    results.map(key => {
      result = result.replace(key, "`" + key + "`")
    })

  }

  result = start ? start + result : result

  return result
}


/**
 * 检查当前行的类型
 * @param {string} line 要检查的内容
 * @param {reg} reg 正则表达式
 */
exports.checkLine = (line, reg) => {
  let result = reg.exec(line)
  return result ? result[0] : false
}