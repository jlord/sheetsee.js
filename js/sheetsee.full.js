var Sheetsee = require('./sheetsee')

// adapted from underscore.js
var extendo = function (obj) {
  var args = Array.prototype.slice.call(arguments, 1)
  args.forEach(function(source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop]
      }
    }
  })
}

// consider this a "build file!" you can add/remove dependencies here, and the file will be created at dist/sheetsee.full.js.
// creating these components are easy, just export an object, and things inside it will be extended to the main Sheetsee here.
// in the future, these could be separate node modules. (for example: sheetsee-d3, sheetsee-mapbox, etc)
extendo(Sheetsee, require('./components/d3'), require('./components/mapbox'))

module.exports = Sheetsee;
