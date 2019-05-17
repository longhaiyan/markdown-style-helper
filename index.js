#!/usr/bin/env node

const fs = require('fs');
var path = require('path');
const readline = require('readline');
const typeMap = require('./lib/type-map')
const { regWord, checkLine } = require('./lib/tool')
const inputPath = process.argv[2] || 'test.md'
const outputPath = process.argv[3] || 'test1.md'
let text = '';

const rl = readline.createInterface({
  input: fs.createReadStream(path.resolve(process.cwd(), inputPath)),
  crlfDelay: Infinity
});


rl.on('line', (line) => {
  if (!checkLine(line, typeMap.title.reg)) {
    text += regWord(line) + '  \n'
  } else {
    text += line + '\n'
  }

});
rl.on('close', () => {
  fs.writeFile(path.resolve(process.cwd(), outputPath), text, (err, stats) => {
    if (err) {
      return console.error(err);
    }
  });
  console.log(`${outputPath} 文件已生成`)
})