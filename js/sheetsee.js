function exportFunctions(exports) {

// // // // // // // // // // // // // // // // // // // // // // // //  // //
//
// // // Make Table, Sort and Filter Interactions
//
// // // // // // // // // // // // // // // // // // // // // // // //  // //

function initiateTableFilter(data, filterDiv, tableDiv) {
  $('.clear').on("click", function() { 
    $(this.id + ".noMatches").css("visibility", "hidden")
    $(this.id + filterDiv).val("")
    makeTable(data, tableDiv)
  })
  $(filterDiv).keyup(function(e) {
    var text = $(e.target).val()
    searchTable(data, text, tableDiv)
  })
}

function searchTable(data, searchTerm, tableDiv) {
  var filteredList = []
  data.forEach(function(object) {
    var stringObject = JSON.stringify(object).toLowerCase()
    if (stringObject.match(searchTerm.toLowerCase())) filteredList.push(object)
  })
  if (filteredList.length === 0) {
    console.log("no matchie")
    $(".noMatches").css("visibility", "inherit")
    makeTable("no matches", tableDiv)
  }
  else $(".noMatches").css("visibility", "hidden")
  makeTable(filteredList, tableDiv) 
  return filteredList
}

function sortThings(data, sorter, sorted, tableDiv) {
  data.sort(function(a,b){
    if (a[sorter]<b[sorter]) return -1
    if (a[sorter]>b[sorter]) return 1
    return 0
  })
  if (sorted === "descending") data.reverse()
  makeTable(data, tableDiv)
  var header 
  $(tableDiv + " .tHeader").each(function(i, el){
    var contents = resolveDataTitle($(el).text())
    if (contents === sorter) header = el
  })
  $(header).attr("data-sorted", sorted)
}

function resolveDataTitle(string) {
  var adjusted = string.toLowerCase().replace(/\s/g, '').replace(/\W/g, '')
  return adjusted
}

function sendToSort(event) {
  var tableDiv = "#" + $(event.target).closest("div").attr("id")
  console.log("came from this table",tableDiv)
  var sorted = $(event.target).attr("data-sorted")
  if (sorted) {
    if (sorted === "descending") sorted = "ascending"
    else sorted = "descending"
  }
  else { sorted = "ascending" }
  var sorter = resolveDataTitle(event.target.innerHTML)
  sortThings(gData, sorter, sorted, tableDiv)
}

$(document).on("click", ".tHeader", sendToSort)

function makeTable(data, targetDiv) {
  var templateID = targetDiv.replace("#", "")
  var tableContents = ich[templateID]({
    rows: data
  })
  $(targetDiv).html(tableContents)
}

// // // // // // // // // // // // // // // // // // // // // // // //  // //
//
// // // Sorting, Ordering Data
//
// // // // // // // // // // // // // // // // // // // // // // // //  // //

function getKeywordCount(data, keyword) {
  var group = []
  data.forEach(function (d) {
    for(var key in d) {
      var value = d[key].toString().toLowerCase()
      if (value.match(keyword.toLowerCase())) group.push(d)
    } 
  })
  return group.length
  if (group = []) return "0" 
}

function getKeyword(data, keyword) {
  var group = []
  data.forEach(function (d) {
    for(var key in d) {
      var value = d[key].toString().toLowerCase()
      if (value.match(keyword.toLowerCase())) group.push(d)
    } 
  })
  return group
  if (group = []) return "no matches" 
}

function getColumnTotal(data, column){
  var total = []
  data.forEach(function (d) {
    if (d[column] === "") return 
    total.push(+d[column]) 
  })
  return total.reduce(function(a,b) {
    return a + b
  })
}

function getColumnAverage(data, column) {
  var total = getColumnTotal(data, column)
  var average = total / data.length
  return average
}

function getMax(data, column){
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
}

function getMin(data, column){
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
}

// out of the data, filter something from a category
function getMatches(data, filter, category) {
  var matches = []
  data.forEach(function (element) {
    var projectType = element[category].toString().toLowerCase()
    if (projectType === filter.toLowerCase()) matches.push(element)
  })
  return matches
}

function mostFrequent(data, category) {
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
}

// thank you! http://james.padolsey.com/javascript/deep-copying-of-objects-and-arrays/
function deepCopy(obj) {
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
}

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

function getOccurance(data, category) {
  var occuranceCount = {}
  for (var i = 0; i < data.length; i++)  {
   if (!occuranceCount[data[i][category]]) {
       occuranceCount[data[i][category]] = 0
   }
   occuranceCount[data[i][category]]++
  }
  return occuranceCount
  // returns object, keys alphabetical
}

function makeColorArrayOfObject(data, colors, category) {
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
}

function makeArrayOfObject(data) {
  var keys = Object.keys(data)
  return keys.map(function(key){ 
    // var h = {label: key, units: data[key], hexcolor: "#FDBDBD"}  
    var h = {label: key, units: data[key]}        
    return h
  })
}

// // // // // // // // // // // // // // // // // // // // // // //  // //
// 
// // // // Mapbox + Leaflet Map
//
// // // // // // // // // // // // // // // // // // // // // // // // //  

function buildOptionObject(optionsJSON, lineItem) {
  var newObj = {}
  optionsJSON.forEach(function(option) {
    newObj[option] = lineItem[option]
  })
  return newObj
}

// for geocoding: http://mapbox.com/tilemill/docs/guides/google-docs/#geocoding
// create geoJSON from your spreadsheet's coordinates
function createGeoJSON(data, optionsJSON) {
  var geoJSON = []
  data.forEach(function(lineItem){
    // skip if there are no coords
    if (!lineItem.long || !lineItem.lat) return
    if (optionsJSON) var optionObj = buildOptionObject(optionsJSON, lineItem)
    var feature = {
      type: 'Feature',
      "geometry": {"type": "Point", "coordinates": [lineItem.long, lineItem.lat]},
      "properties": {
        "marker-size": "small",
        "marker-color": lineItem.hexcolor
      },
      "opts": optionObj,
    }
    geoJSON.push(feature)
  })
  return geoJSON
}

// load basic map with tiles
function loadMap(mapDiv) {
  var map = L.mapbox.map(mapDiv)
  // map.setView(, 4)
  // map.addLayer(L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png'))
  map.touchZoom.disable()
  map.doubleClickZoom.disable()
  map.scrollWheelZoom.disable()
  return map
}

function addTileLayer(map, tileLayer) {
  var layer = L.mapbox.tileLayer(tileLayer)
  layer.addTo(map)
}

function addMarkerLayer(geoJSON, map, zoomLevel) { 
  var viewCoords = [geoJSON[0].geometry.coordinates[1], geoJSON[0].geometry.coordinates[0]]
  var markerLayer = L.mapbox.markerLayer(geoJSON)
  markerLayer.setGeoJSON(geoJSON)
  map.setView(viewCoords, zoomLevel)
  // map.fitBounds(geoJSON)
  markerLayer.addTo(map)
  return markerLayer
}

// moved to be used on the .html page for now
// until I find a better way for users to pass in their
// customized popup html styles
// function addPopups(map, markerLayer, popupContent) {
//   markerLayer.on('click', function(e) {
//     var feature = e.layer.feature
//     var popupContent = '<h2>' + feature.opts.city + '</h2>' +
//                         '<h3>' + feature.opts.placename + '</h3>'
//     e.layer.bindPopup(popupContent,{closeButton: false,})
//   })
// }

// // // // // // // // // // // // // // // // // // // // // // //  // //
// 
// // // // // D3 Charts
//
// // // // // // // // // // // // // // // // // // // // // // // // // 

// Bar Chart
// Adapted mostly from http://bl.ocks.org/mbostock/3885705
// options = {units: "string", labels: "string", m: [60, 150, 30, 150], w: 800, h: 300, div: "#dogBar", xaxis: "cuddlability", hiColor: "#EE0097"}

function d3BarChart(data, options) {
  
  // format data into units and labels
  var data = data.map(function(r) {
    var labels = options.labels
    var units = options.units
    return {units: r[units], labels: r[labels], hexcolor: r.hexcolor}
  })

  //  m = [t0, r1, b2, l3]
  var m = options.m,
      w = options.w - m[1] - m[3],
      h =  options.h - (m[0] + m[2])
  var format = d3.format(",.0f")

  var x = d3.scale.linear().range([0, w]),
      y = d3.scale.ordinal().rangeRoundBands([0, h], .1)

  var xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-h).tickFormat(d3.format("1s")),
      yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0)

  var svg = d3.select(options.div).append("svg")
      .attr("width", w + m[1] + m[3])
      .attr("height", h + m[0] + m[2])
    .append("g")
      .attr("transform", "translate(" + m[3] + "," + m[0] + ")")

  x.domain([0, d3.max(data, function(d) { return d.units })]) // 0 to max of units
  y.domain(data.map(function(d) { return d.labels })) // makes array of labels

  var mouseOver = function() {
      var rect = d3.select(this)
      var indexValue = rect.attr("index_value")

      var barSelector = "." + "rect-" + indexValue
      var selectedBar = d3.selectAll(barSelector)
      selectedBar.style("fill", options.hiColor)

      var valueSelector = "." + "value-" + indexValue
      var selectedValue = d3.selectAll(valueSelector)
      selectedValue.style("fill", options.hiColor)

      var textSelector = "." + "labels-" + indexValue
      var selectedText = d3.selectAll(textSelector)
      selectedText.style("fill", options.hiColor)
  }

  var mouseOut = function() {
      var rect = d3.select(this)
      var indexValue = rect.attr("index_value")

      var barSelector = "." + "rect-" + indexValue
      var selectedBar = d3.selectAll(barSelector)
      selectedBar.style("fill", function(d) { return d.hexcolor})

      var valueSelector = "." + "value-" + indexValue
      var selectedValue = d3.selectAll(valueSelector)
      selectedValue.style("fill", "#333333")

      var textSelector = "." + "labels-" + indexValue
      var selectedText = d3.selectAll(textSelector)
      selectedText.style("fill", "#333")
  }

  var bar = svg.selectAll("g.bar")
    .data(data)
  .enter().append("g")
    .attr("class", "bar")
    .attr("transform", function(d) { return "translate(0," + y(d.labels) + ")" })

  bar.append("text")
    .attr("x", function(d) { return x(d.units) })
    .attr("y", y.rangeBand() / 2)
    .attr("dx", 12)
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("index_value", function(d, i) { return "index-" + i })
    .text(function(d) { return format(d.units) })
    .attr("class", function(d, i) { return "value-" + "index-" + i })
    .on('mouseover', mouseOver)
    .on("mouseout", mouseOut)

  bar.append("text")
    .attr("x", -5)
    .attr("y", y.rangeBand() / 2)
    .attr("dx", 0)
    .attr("dy", ".35em")
    .attr("text-anchor", "end")
    .attr("index_value", function(d, i) { return "index-" + i })
    .text(function(d) { return d.labels })
    .attr("class", function(d, i) { return "value-" + "index-" + i })
    .on('mouseover', mouseOver)
    .on("mouseout", mouseOut)

  bar.append("rect")
    .attr("width", function(d) { return x(d.units)})
    .attr("height", y.rangeBand())
    .attr("index_value", function(d, i) { return "index-" + i })
    .style("fill", function(d) { return d.hexcolor})
    .on('mouseover', mouseOver)
    .on("mouseout", mouseOut)
    .attr("class", function(d, i) { return "rect-" + "index-" + i })

  svg.append("g")
    .attr("class", "x axis")
    .call(xAxis)
  .append("text")
    // .attr("transform", "rotate(-90)")
    .attr("y", -20)
    .attr("x", m[1])
    .attr("class", "xLabel")
    .style("text-anchor", "end")
    .text(function() {
      if (options.xaxis) return options.xaxis
      return
    })
}

// Pie Chart
// pieOptions = {units: "string", labels: "string", m: [80, 80, 80, 80], w: 800, h: 400, div: "#dogPie", hiColor: "#E4EB29"}

function d3PieChart(data, options) {

  // format data into units and labels
  var data = data.map(function(r) {
    var labels = options.labels
    var units = options.units
    return {units: r[units], labels: r[labels], hexcolor: r.hexcolor}
  })


  var width = options.w,
      height = options.h,
      radius = Math.min(width, height) / 2.3

  var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(0)

  var arcOver = d3.svg.arc()
      .outerRadius(radius + .1)

  var pie = d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.units })

var svg = d3.select(options.div).append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + width / 3 + "," + height / 2 + ")")

var data = data

  data.forEach(function(d) {
    d.units = +d.units
  })
function mouseOver(d) {
  d3.select(this).select("path").transition()
     .duration(500)
     .attr("d", arcOver)
  var slice = d3.select(this)
  var indexValue = slice.attr("index_value")

  var pathSelector = "." + "path-" + indexValue
  var selectedPath = d3.selectAll(pathSelector)
  selectedPath.style("fill", options.hiColor)

  var textSelector = "." + "labels-" + indexValue
  var selectedText = d3.selectAll(textSelector)
  selectedText.transition()
    .duration(150)
    .style("font-size", "12px").style("font-weight", "bold").style("fill", options.hiColor)
  selectedText.attr("class", function(d, i) { return "labels-" + indexValue + " bigg" })
}
function mouseOut(d) {
  d3.select(this).select("path").transition()
     .duration(150)
     .attr("d", arc)
  var slice = d3.select(this)
  var indexValue = slice.attr("index_value")

  var pathSelector = "." + "path-" + indexValue
  var selectedPath = d3.selectAll(pathSelector)
  selectedPath.style("fill", function(d) { return d.data.hexcolor })

  var textSelector = "." + "labels-" + indexValue
  var selectedText = d3.selectAll(textSelector)
  selectedText.transition()
    .duration(200)
    .style("font-size", "10px").style("font-weight", "normal").style("fill", function(d) { return d.hexcolor })
}

  var g = svg.selectAll(".arc")
      .data(pie(data))
    .enter().append("g")
      .attr("index_value", function(d, i) { return "index-" + i })
      .attr("class", function(d, i) { return "slice-" + "index-" + i + " slice arc" })
      .on("mouseover", mouseOver)
      .on("mouseout", mouseOut)

  var path = g.append("path")
      .attr("d", arc)
      .attr("index_value", function(d, i) { return "index-" + i })
      .attr("class", function(d, i) { return "path-" + "index-" + i })
      .style("fill", function(d) { return d.data.hexcolor})
      .attr("fill", function(d) { return d.data.hexcolor})

svg.selectAll("g.labels")
  .data(data)
  .enter().append("g") // Append legend elements
      .append("text")
        .attr("text-anchor", "start")
        .attr("x", width / 2.5)
        .attr("y", function(d, i) { return (height / 2) - i*(data.length * 20)})
        .attr("dx", 0)
        .attr("dy", "-140px") // Controls padding to place text above bars
        .text(function(d) { return d.labels + ", " + d.units})
        .style("fill", function(d) { return d.hexcolor })
        .attr("index_value", function(d, i) { return "index-" + i })
        .attr("class", function(d, i) { return "labels-" + "index-" + i + " aLabel "})
        .on('mouseover', mouseOver)
        .on("mouseout", mouseOut)
}

// Line Chart
// Adapted from http://bl.ocks.org/1166403 and
// http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
/// options = {units: "string", labels: "string", m: [80, 100, 120, 100], w: 800, h: 400, div: "#dogLine", yaxis: "cuddlability", hiColor: "#E4EB29"}

function d3LineChart(data, options){

    // format data into units and labels
    var data = data.map(function(r) {
      var labels = options.labels
      var units = options.units
      return {units: r[units], labels: r[labels], hexcolor: r.hexcolor}
    })
    
    var m = options.m
    var w = options.w - m[1] - m[3]
    var h = options.h - m[0] - m[2]
    var data = data

    var x = d3.scale.ordinal().rangeRoundBands([0, w], 1)
        x.domain(data.map(function(d) { return d.labels }))
    var y = d3.scale.linear().range([0, h])
        y.domain([d3.max(data, function(d) { return d.units }) + 2, 0])

    var line = d3.svg.line()
       .x(function(d, i) { return x(i) })
       .y(function(d) { return y(d) })

    var graph = d3.select(options.div).append("svg:svg")
          .attr("width", w + m[1] + m[3])
          .attr("height", h + m[0] + m[2])
        .append("svg:g")
          .attr("transform", "translate(" + m[3] + "," + m[0] + ")")

    var div = d3.select(options.div).append("div")   
        .attr("class", "tooltip")               
        .style("opacity", 0)

    // create yAxis
    var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true)
    // Add the x-axis.
    graph.append("svg:g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + h + ")")
          .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dy", "-.5em")
          .attr('dx', "-1em")
          .attr("transform", "rotate(-80)")
          .call(xAxis)

    // create left yAxis
    var yAxisLeft = d3.svg.axis().scale(y).ticks(4).tickSize(-w).tickSubdivide(true).orient("left")
    // Add the y-axis to the left
    graph.append("svg:g")
          .attr("class", "y axis")
          .attr("dx", "25")
          .attr("transform", "translate(0,0)")
          .call(yAxisLeft)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", -40)
          .attr("dy", 0)
          .style("text-anchor", "end")
          .text(function() {
            if (options.yaxis) return options.yaxis
            return
          })
      
   var lineData = data.map(function(d) { return d.units })
      graph.append("svg:path")
          .attr("d", line(lineData))
          .attr("class", "chartLine")
          .attr("index_value", function(d, i) { return i })
          // .attr("stroke", options.hiColor).attr("fill", "none")

    graph.selectAll("dot")    
        .data(data)         
    .enter().append("circle")                               
        .attr("r", 3.5) 
        .attr("fill", options.hiColor)      
        .attr("cx", function(d) { return x(d.labels); })       
        .attr("cy", function(d) { return y(d.units); })     
        .on("mouseover", function(d) {      
            div.transition().duration(200).style("opacity", .9)    
            div .html(d.labels + ", "  + d.units)  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px")   
            })                  
        .on("mouseout", function(d) {       
            div.transition().duration(500).style("opacity", 0) 
        })
}
// tables
exports.searchTable = searchTable
exports.initiateTableFilter = initiateTableFilter
exports.makeTable = makeTable
exports.sendToSort = sendToSort
exports.resolveDataTitle = resolveDataTitle
exports.sortThings = sortThings
// charts
exports.d3LineChart = d3LineChart
exports.d3PieChart = d3PieChart
exports.d3BarChart = d3BarChart
// maps
exports.createGeoJSON = createGeoJSON
// exports.addPopups = addPopups
exports.addMarkerLayer = addMarkerLayer
exports.addTileLayer = addTileLayer
exports.loadMap = loadMap
// data
exports.makeArrayOfObject = makeArrayOfObject
exports.makeColorArrayOfObject = makeColorArrayOfObject
exports.mostFrequent = mostFrequent
// exports.addUnitsLabels = addUnitsLabels
exports.getOccurance = getOccurance
exports.getMatches = getMatches
exports.getKeyword = getKeyword
exports.getKeywordCount = getKeywordCount
exports.getColumnTotal = getColumnTotal
exports.getMax = getMax
exports.getMin = getMin
exports.getColumnAverage = getColumnAverage
}
var Sheetsee = {}
exportFunctions(Sheetsee)
