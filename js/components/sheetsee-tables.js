var ich = require('icanhaz')

module.exports = {
  // Make Table, Sort and Filter Interactions

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
  }
}
