#!/usr/bin/env node

var glob = require('glob')
var fs = require('fs')
var marked = require('marked')
var hbs = require('handlebars')
var mkdirp = require('mkdirp')
var path = require('path')
var cpr = require('cpr')

cpr('./demos', './site/demos', function(err, files) {
  if (err) return console.log(err)
  cpr('./js', './site/js', function(err, files) {
    if (err) return console.log(err)
  })
})

fs.readFile('readme.md', function(err, file) {
  if (err) return console.log(err)
  var name = "index"
  var content = file.toString()
  var html = changeExtensions(marked(content))
  applyTemplate(html, name)
})

glob("docs/*.md", function (err, files) {
  if (err) return console.log(err)
  var filenames = files.map(function(name) {
     return path.basename(name)
  })
  filenames.forEach(function (file) {
    var name = file.split('.md')[0]
    var filePath = "./docs/"
    var content = fs.readFileSync(filePath + file).toString()
    var html = changeExtensions(marked(content))
    applyTemplate(html, name)
  })
})

function applyTemplate(html, name) {
  var content = {content: html}
  if (name === "index") {
    content.rootstyle = "."
    content.rootdoc = "docs"
    content.rootdemo = "."
  } else {
     content.rootstyle = ".."
     content.rootdoc = "."
     content.rootdemo = ".."
  }
  var file = "template.hbs"
  var rawTemplate =  fs.readFileSync(file).toString()
  var template = hbs.compile(rawTemplate)
  var page = template(content)
  writeFile(page, name)
}

function writeFile(page, name) {
  if (name === "index") {
    return fs.writeFileSync('./site/' + name + '.html' , page)
  }
  mkdirp('./site/docs', function (err) {
    if (err) return console.error(err)
    fs.writeFileSync('./site/docs/' + name + '.html' , page)
  })
}

function changeExtensions(html, name) {
  if (name === "index") {
    html = html.replace('/\./\.\/', '')
  }
  var re = /.md$/
  var newHtml = html.replace(/\.md/g, '.html')
  return newHtml
}
