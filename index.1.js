const MarkdownIt = require('markdown-it')
const Renderer = require('markdown-it')('Renderer')
const fs = require('fs')
var TurndownService = require('turndown')
var turndownService = new TurndownService()
const mdFile = fs.readFileSync('./test.md', 'utf8')

var turndownPluginGfm = require('turndown-plugin-gfm')
var gfm = turndownPluginGfm.gfm
var tables = turndownPluginGfm.tables
var strikethrough = turndownPluginGfm.strikethrough

turndownService.use([gfm, tables, strikethrough])

const md = new MarkdownIt()
const renderer = new Renderer()
const tokens = md.parse(mdFile)
let html = renderer.renderToken(tokens)
var markdown = turndownService.turndown(html)
// console.log(tokens)
// console.log("mdFile", mdFile)
console.log("markdown", markdown)

// const toMarkdown = require('ast-to-markdown')

// const mdText = toMarkdown(tokens)

// console.log(mdText)