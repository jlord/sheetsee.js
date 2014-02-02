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
    var html = marked(content)
    applyTemplate(html, name)
  })
})

function applyTemplate(html, name) {
  var content = {content: html}
  var file = "template.hbs"
  var rawTemplate =  fs.readFileSync(file).toString()
  var template = hbs.compile(rawTemplate)
  var page = template(content)
  writeFile(page, name) 
}

function writeFile(page, name) {
  mkdirp('./site/docs', function (err) {
    if (err) return console.error(err)
    fs.writeFileSync('./site/docs/' + name + '.html' , page)  
  })
}

