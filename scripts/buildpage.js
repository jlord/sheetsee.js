var fs = require('fs')
var marked = require('marked')
var glob = require('glob')
var path = require('path')
var mustache = require('mustache')

glob('docs/*.md', function (err, files) {
  if (err) return console.log(err)
  files.forEach(function (file) {
    var filename = file.replace('docs/', '').split('.md')[0]
    var md = fs.readFileSync(file).toString()
    var html = changeExtensions(marked(md), filename)
    applyTemplate(html, filename)
  })
})

// Turn .md extension links within the files into .html
function changeExtensions (html, name) {
  if (name === 'index') {
    html = html.replace('/\./\.\/', '')
  }
  // var re = /.md$/
  var newHtml = html.replace(/\.md/g, '.html')
  return newHtml
}

function applyTemplate (html, name) {
  var content = {content: html, name: name}
  if (name === 'index') {
    content.rootstyle = '.'
    content.rootdoc = 'docs'
    content.rootdemo = '.'
  } else {
     content.rootstyle = '..'
     content.rootdoc = '.'
     content.rootdemo = '..'
  }
  var rawTemplate =  fs.readFileSync('./scripts/template.hbs').toString()
  var page = mustache.render(rawTemplate, content)
  writeFile(page, name)
}

function writeFile (page, name) {
  if (name === 'index') {
    fs.writeFileSync(path.join(name + '.html'), page)
  } else  fs.writeFileSync(path.join('docs/', name + '.html'), page)
}
