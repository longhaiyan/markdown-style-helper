const TurndownService = require('turndown')
const turndownService = new TurndownService({ headingStyle: 'atx' })
const turndownPluginGfm = require('turndown-plugin-gfm')
const gfm = turndownPluginGfm.gfm
const tables = turndownPluginGfm.tables
const strikethrough = turndownPluginGfm.strikethrough
turndownService.use([gfm, tables, strikethrough])

const insertStr = (source, start, newStr) => {
  return source.slice(0, start) + source.slice(start).replace(newStr, "`" + newStr + "`");
}

const regWord = (text) => {
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

turndownService.addRule('my_heading', {
  filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  replacement: function(content, node, options) {
    return options.rules.heading.replacement(regWord(content), node, options)
  }
})
turndownService.addRule('my_paragraph', {
  filter: ['p'],
  replacement: function(content, node, options) {
    return options.rules.paragraph.replacement(regWord(content), node, options)
  }
})
turndownService.addRule('my_blockquote', {
  filter: 'blockquote',
  replacement: function(content, node, options) {
    console.log("content p", content)
    return options.rules.blockquote.replacement(regWord(content), node, options)
  }
})
turndownService.addRule('my_listItem', {
  filter: 'li',
  replacement: function(content, node, options) {
    return options.rules.listItem.replacement(regWord(content), node, options)
  }
})

exports.turndownService = turndownService