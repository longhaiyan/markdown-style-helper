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

function insertStr(source, start, newStr) {
  return source.slice(0, start) + source.slice(start).replace(newStr, "`" + newStr + "`");
}

function regWord1(line, start) {
  console.log("line, start", start)
  let reg = typeMap.word.reg;
  let regResult = null

  let results = []
  // let start = this.checkLine(line, typeMap.orderList.reg)
  let result = line.replace(start, '')

  while ((regResult = reg.exec(result)) != null) {
    if (regResult[0].trim()) {
      results.push({ key: regResult[0].trim(), index: regResult.index })
    }
  }
  if (results.length) {
    results.map(({ key, index }, i) => {
      if (i > 0) {
        index += 2
      }
      result = insertStr(result, index, key)
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