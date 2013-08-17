var ich = require('icanhaz')

var Sheetsee = {
  // // // // // // // // // // // // // // // // // // // // // // // //  // //
  //
  // // // Make Table, Sort and Filter Interactions
  //
  // // // // // // // // // // // // // // // // // // // // // // // //  // //

  initiateTableFilter: function(data, filterDiv, tableDiv) {
    $('.clear').on("click", function() { 
      $(this.id + ".noMatches").css("visibility", "hidden")
      $(this.id + filterDiv).val("")
      Sheetsee.makeTable(data, tableDiv)
    })
    $(filterDiv).keyup(function(e) {
      var text = $(e.target).val()
      Sheetsee.searchTable(data, text, tableDiv)
    })
  },

  searchTable: function(data, searchTerm, tableDiv) {
    var filteredList = []
    data.forEach(function(object) {
      var stringObject = JSON.stringify(object).toLowerCase()
      if (stringObject.match(searchTerm.toLowerCase())) filteredList.push(object)
    })
    if (filteredList.length === 0) {
      console.log("no matchie")
      $(".noMatches").css("visibility", "inherit")
      Sheetsee.makeTable("no matches", tableDiv)
    }
    else $(".noMatches").css("visibility", "hidden")
    Sheetsee.makeTable(filteredList, tableDiv) 
    return filteredList  
  },

  sortThings: function(data, sorter, sorted, tableDiv) {
    data.sort(function(a,b){
      if (a[sorter]<b[sorter]) return -1
      if (a[sorter]>b[sorter]) return 1
      return 0
    })
    if (sorted === "descending") data.reverse()
    Sheetsee.makeTable(data, tableDiv)
    var header 
    $(tableDiv + " .tHeader").each(function(i, el){
      var contents = Sheetsee.resolveDataTitle($(el).text())
      if (contents === sorter) header = el
    })
    $(header).attr("data-sorted", sorted)  
  },

  resolveDataTitle: function(string) {
    var adjusted = string.toLowerCase().replace(/\s/g, '').replace(/\W/g, '')
    return adjusted
  },

  sendToSort: function(event) {
    var tableDiv = "#" + $(event.target).closest("div").attr("id")
    console.log("came from this table",tableDiv)
    var sorted = $(event.target).attr("data-sorted")
    if (sorted) {
      if (sorted === "descending") sorted = "ascending"
      else sorted = "descending"
    }
    else { sorted = "ascending" }
    var sorter = Sheetsee.resolveDataTitle(event.target.innerHTML)
    Sheetsee.sortThings(gData, sorter, sorted, tableDiv)    
  },

  makeTable: function(data, targetDiv) {
    var templateID = targetDiv.replace("#", "")
    var tableContents = ich[templateID]({
      rows: data
    })
    $(targetDiv).html(tableContents)    
  },

  // // // // // // // // // // // // // // // // // // // // // // // //  // //
  //
  // // // Sorting, Ordering Data
  //
  // // // // // // // // // // // // // // // // // // // // // // // //  // //

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

  // no longer need this
  // function addUnitsLabels(arrayObj, oldLabel, oldUnits) {
  //   var newArray = deepCopy(arrayObj)
  //   for (var i = 0; i < newArray.length; i++) {
  //     newArray[i].label = newArray[i][oldLabel]
  //     newArray[i].units = newArray[i][oldUnits]
  //     delete newArray[i][oldLabel]
  //     delete newArray[i][oldUnits]
  //   }
  // return newArray
  // }

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
