var Sheetsee = {}
var extend   = require('lodash.assign')

// consider this a "build file!" you can add/remove dependencies here, and the file will be created at dist/sheetsee.full.js.
// creating these components are easy, just export an object, and things inside it will be extended to the main Sheetsee here.
extend(Sheetsee, require('sheetsee-core'), require('sheetsee-tables'), require('sheetsee-maps'), require('sheetsee-charts'))

module.exports = Sheetsee
