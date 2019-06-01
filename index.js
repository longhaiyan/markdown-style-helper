#!/usr/bin/env node

const fs = require('fs')
const TurndownService = require('turndown')
const turndownService = new TurndownService()
const turndownPluginGfm = require('turndown-plugin-gfm')
const gfm = turndownPluginGfm.gfm
const tables = turndownPluginGfm.tables
const strikethrough = turndownPluginGfm.strikethrough
turndownService.use([gfm, tables, strikethrough])
turndownService.addRule('addCode', {
  filter: ['h1'],
  replacement: function(content) {
    return '# ' + regWord(content)
  }
})

const MarkdownIt = require('markdown-it');
const md = new MarkdownIt();

const mark = fs.readFileSync('./test.md', 'utf-8');
const token = md.parse(mark)
const html = md.renderer.render(token);

const markdown = turndownService.turndown(html)
fs.writeFile('test1.md', markdown, 'utf8', (err) => {
  if (err) throw err;
  console.log('文件已被保存');
});


function insertStr(source, start, newStr) {
  return source.slice(0, start) + source.slice(start).replace(newStr, "`" + newStr + "`");
}

function regWord(text) {
  let reg = /(\.|\w|\+|\-|\*|\s|\%|\/)+/g;
  let regResult = null
  let results = []
  let result = text
  while ((regResult = reg.exec(text)) != null) {
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

  return result
}