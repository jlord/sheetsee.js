var glob = require('glob')
var fs = require('fs')

glob('*/**/*.html', function (err, files) {
  if (err) return console.log(err)
  files.forEach(function (file) {
    // delete all generated files, not the demos
    // which are bespoke and hand crafted artisan
    if (file.match('demos')) return
    fs.unlinkSync(file)
  })
})
