#!/usr/bin/env node

const fs = require('fs')
const path = require('path');
const { turndownService } = require('./lib/turndownService')
const inputPath = path.resolve(process.cwd(), process.argv[2])
const outputPath = process.argv[3]

const mark = fs.readFileSync(inputPath, 'utf-8')

const marked = require('marked')
marked.setOptions({ breaks: true })
const html = marked(mark)
const markdown = turndownService.turndown(html)

fs.writeFile(outputPath, markdown, 'utf8', (err) => {
  if (err) throw err;
  console.log('文件已生成');
});