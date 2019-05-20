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
  let reg = typeMap.word.reg;
  let regResult = null

  let results = []
  // let start = this.checkLine(line, typeMap.orderList.reg)
  let result = line.replace(start, '')

  while ((regResult = reg.exec(line)) != null) {
    results.push(regResult[0])
  }
  if (results.length) {
    results.map(key => {
      result = result.replace(key, " `" + key.trim() + "` ")
    })

  }

  result = start + result

  return result
}

rl.on('line', (line) => {
  let noCheck = checkTypes(line, 'noCheckType')
  let check = checkTypes(line, 'checkType')

  if (!noCheck) {
    // 不需要做匹配
    textArr.push(line + '\n')
  } else if (check) {
    // 需要匹配
    console.log("check", check)
    // textArr.push(regWord1(line, check))
  } else if (checkTypes(line, 'checkType')) {
    // 需要继续检验，才能确定是否需要检验

  } else {

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