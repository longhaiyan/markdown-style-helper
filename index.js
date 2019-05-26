#!/usr/bin/env node

const fs = require('fs');
var path = require('path');
const readline = require('readline');
const typeMap = require('./lib/type-map')
const { regWord, checkLine, checkTypes } = require('./lib/tool')
const inputPath = process.argv[2] || 'test.md'
const outputPath = process.argv[3] || 'test1.md'
let textArr = [];

const rl = readline.createInterface({
  input: fs.createReadStream(path.resolve(process.cwd(), inputPath)),
  crlfDelay: Infinity
});


function regWord1(line, start) {
  console.log("line, start", start)
  let reg = typeMap.word.reg;
  let regResult = null

  let results = []
  // let start = this.checkLine(line, typeMap.orderList.reg)
  let result = line.replace(start, '')

  while ((regResult = reg.exec(result)) != null) {
    results.push({ key: regResult[0], index: })
  }
  if (results.length) {
    results.map(key => {
      if (key.trim()) {
        result = result.replace(key.trim(), "`" + key.trim() + "`")
      }
    })

  }

  result = start + result + '\n'

  return result
}

rl.on('line', (line) => {
  let noCheck = checkTypes(line, 'noCheckType')
  let check = checkTypes(line, 'checkType')

  if (noCheck) {
    console.log("不需要做匹配")
    textArr.push(line + '\n')
  } else if (check) {
    console.log("需要匹配")
    console.log("check", check)
    textArr.push(regWord1(line, check.result[0]))
  } else if (checkTypes(line, 'checkType')) {
    console.log("需要继续检验，才能确定是否需要检验")

  } else {
    console.log("else")
    textArr.push(line + '\n')
  }

});
rl.on('close', () => {
  fs.writeFile(path.resolve(process.cwd(), outputPath), textArr.join(''), (err, stats) => {
    if (err) {
      return console.error(err);
    }
  });
  console.log(`${outputPath} 文件已生成`)
})