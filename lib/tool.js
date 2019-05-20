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
      result = result.replace(key, " `" + key.trim() + "` ")
    })

  }

  result = start ? start + result : result

  return result
}

/**
 * 检查类型集合的结果
 * @param {string} line 要检查的内容
 * @param {string} types 类型集合名称
 */
exports.checkTypes = (line, type) => {
  const types = typeMap[type]
  let result = null
  for (let i = 0, l = types.length; i < l; i++) {
    result = types[i].reg.exec(line)
    if (result) {
      // result.concat([type: types[i]])
      console.log("result", result.input)
      break;
    }
  }
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