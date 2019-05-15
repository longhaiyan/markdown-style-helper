const readline = require('readline');
const fs = require('fs');
let text = ''

const typeMap = {
  /**
   * 有序列表
   */
  orderList: {
    reg: /^(\d\s*\.\s*)/, // 正则匹配表达式
  },
  title: {
    reg: /^(\s*\#+)/
  }
}
const rl = readline.createInterface({
  input: fs.createReadStream('test.md'),
  crlfDelay: Infinity
});

function regWord(line) {
  let reg = /\b(\w|\+|\-|\*|\s|\%|\/)+\b/g;
  let regResult = null
  let result = line
  let results = []

  while ((regResult = reg.exec(line)) != null) {
    results.push(regResult[0])
  }
  console.log("regResult", regResult, results)
  if (results.length) {
    results.map(key => {
      result = result.replace(key, "`" + key + "`")
    })

  }

  return result
}

/**
 * 检查当前行的类型
 * @param {string} line 要检查的内容
 * @param {reg} reg 正则表达式
 */
function checkLine(line, reg) {
  let result = reg.exec(line)
  return result ? result[0] : false
}


rl.on('line', (line) => {
  if (!checkLine(line, typeMap.title.reg)) {
    text += regWord(line) + '  \n'
  } else {
    text += line + '  \n'
  }

});
rl.on('close', () => {
  fs.writeFile('test1.md', text, (err, stats) => {
    if (err) {
      return console.error(err);
    }
  });
  console.log('test1.md 文件已生成')
})