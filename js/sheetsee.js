var ich = require('icanhaz')

var Sheetsee = {
  // Sorting, Ordering Data

  getKeywordCount: function(data, keyword) {
    var group = []
    data.forEach(function (d) {
      for(var key in d) {
        var value = d[key].toString().toLowerCase()
        if (value.match(keyword.toLowerCase())) group.push(d)
      }
    })
    return group.length
    if (group = []) return "0"
  },

  getKeyword: function(data, keyword) {
    var group = []
    data.forEach(function (d) {
      for(var key in d) {
        var value = d[key].toString().toLowerCase()
        if (value.match(keyword.toLowerCase())) group.push(d)
      }
    })
    return group
    if (group = []) return "no matches"
  },

  getColumnTotal: function(data, column) {
    var total = []
    data.forEach(function (d) {
      if (d[column] === "") return
      total.push(+d[column])
    })
    return total.reduce(function(a,b) {
      return a + b
    })
  },

  getColumnAverage: function(data, column) {
    var total = getColumnTotal(data, column)
    var average = total / data.length
    return average
  },

  getMax: function(data, column) {
    var result = []
    data.forEach(function (element){
      if (result.length === 0) return result.push(element)
        else {
          if (element[column].valueOf() > result[0][column].valueOf()) {
            result.length = 0
            return result.push(element)
          }
          if (element[column].valueOf() === result[0][column].valueOf()) {
            return result.push(element)
          }
        }
    })
    return result
  },

  getMin: function(data, column) {
    var result = []
    data.forEach(function (element){
      if (result.length === 0) return result.push(element)
        else {
          if (element[column].valueOf() < result[0][column].valueOf()) {
            result.length = 0
            return result.push(element)
          }
          if (element[column].valueOf() === result[0][column].valueOf()) {
            return result.push(element)
          }
        }
    })
    return result
  },

  // out of the data, filter something from a category
  getMatches: function (data, filter, category) {
    var matches = []
    data.forEach(function (element) {
      var projectType = element[category].toString().toLowerCase()
      if (projectType === filter.toLowerCase()) matches.push(element)
    })
    return matches
  },

  mostFrequent: function(data, category) {
      var count = {}
      for (var i = 0; i < data.length; i++)  {
        if (!count[data[i][category]]) {
          count[data[i][category]] = 0
        }
      count[data[i][category]]++
      }
      var sortable = []
      for (var category in count) {
        sortable.push([category, count[category]])
      }
        sortable.sort(function(a, b) {return b[1] - a[1]})
        return  sortable
        // returns array of arrays, in order
  },

  // thank you! http://james.padolsey.com/javascript/deep-copying-of-objects-and-arrays/
  deepCopy: function(obj) {
    if (Object.prototype.toString.call(obj) === '[object Array]') {
        var out = [], i = 0, len = obj.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    if (typeof obj === 'object') {
        var out = {}, i;
        for ( i in obj ) {
            out[i] = arguments.callee(obj[i]);
        }
        return out;
    }
    return obj;
  },

  getOccurance: function(data, category) {
    var occuranceCount = {}
    for (var i = 0; i < data.length; i++)  {
     if (!occuranceCount[data[i][category]]) {
         occuranceCount[data[i][category]] = 0
     }
     occuranceCount[data[i][category]]++
    }
    return occuranceCount
    // returns object, keys alphabetical
  },

  makeColorArrayOfObject: function(data, colors, category) {
    var category = category
    var keys = Object.keys(data)
    var counter = 1
    var colorIndex
    return keys.map(function(key){
      if (keys.length > colors.length || keys.length <= colors.length ) {
        colorIndex = counter % colors.length
      }
      var h = {units: data[key], hexcolor: colors[colorIndex]}
      h[category] = key
      counter++
      colorIndex = counter
      return h
    })
  },

  makeArrayOfObject: function(data) {
    var keys = Object.keys(data)
    return keys.map(function(key){
      // var h = {label: key, units: data[key], hexcolor: "#FDBDBD"}
      var h = {label: key, units: data[key]}
      return h
    })
  }
}

$(document).on("click", ".tHeader", Sheetsee.sendToSort)

Sheetsee.ich = ich
module.exports = Sheetsee
