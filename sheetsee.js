// globals for everyone! 

var YEARS = ["year2012", "year2013", "year2014", "year2015", "year2016", "year2017", "year2018", "year2019"]
var URL = 'https://docs.google.com/spreadsheet/pub?key=0Aj3c4mZCQQaMdGE2TVphOWlXMUMyclRXa2Z1c0g5MGc&output=html';
var categoryColumn = "category"
var focusAreaColumn = "focusarea"
var projectColumn = "project"
var tot = "total"


// get that spreadsheet!

function loadSpreadsheet() {
  
  Tabletop.init( { key: URL, callback: showInfo, simpleSheet: true } )
}

// generic things

function getCurrentYear() {
  return new Date().getFullYear()  
}

function getCurrentMonth() {
  var month = new Date().getMonth() + 1
  return month
}

// ---------------------------------------------------- //

// filtering Category on "projections" spreadsheet

function getType(projects, projectFilter) {
  var filteredProjects = []
  projects.forEach(function (element) {
    var projectType = element[categoryColumn]
    if (projectType === projectFilter) filteredProjects.push(element)
  })
  return filteredProjects
}

// ---------------------------------------------------- //

// filtering to Category on "actuals" spreadsheet

function getActualsArea(projects, projectFilter) {
  var filteredProjects = []
  projects.forEach(function (element) {
    var projectType = element[focusAreaColumn]
    if (projectType === projectFilter) filteredProjects.push(element)
  })
  return filteredProjects
}

// ---------------------------------------------------- //

function getActualsCategory(projects, projectFilter) {
  var filteredProjects = []
  projects.forEach(function (element) {
    var projectType = element[categoryColumn]
    if (projectType === projectFilter) filteredProjects.push(element)
  })
  return filteredProjects
}

// ---------------------------------------------------- //

// filteriong to Focus Area
  
function getProject(projects, projectFilter){
  var oneProject = []
  projects.forEach(function (element) {
	  var name = element[focusAreaColumn]
	  if (name === projectFilter) oneProject.push(element)
  })
  return oneProject
}

function getStatusCount(projects, statusFilter) {
  var statusGroup = []
  projects.forEach(function (project) {
    if (project.status.match(statusFilter)) statusGroup.push(project)
  })
  return statusGroup.length
  if (statusGroup = []) return "0" 
}

// get column total 

function getColumnTotal(projects, column){
  var dollars = []
  projects.forEach(function (project) {
    if (project[column] === "") return 
    dollars.push(+project[column]) 
  })
  return dollars.reduce(function(a,b) {
    return a + b
  })
}

// ---------------------------------------------------- //

// diff of budgeted and actual

function getDiff(budgeted, actual){
  var diff = actual - budgeted
  return diff
}

// turning into currency 

function getMoney(value) {
  if (value === "") return false
  return accounting.formatMoney(parseInt(value))  
}
 
function turnCurrency(projects) {
  projects.forEach(function (project) {
    var totalMoney = getMoney(project.total)
    if (totalMoney) project.total = totalMoney
    YEARS.forEach(function (year){
      var totalYear = getMoney(project[year])
      if (totalYear) project[year] = totalYear
    })
  })
return projects
}

function turnReportCurrency(projects) {
  projects.forEach(function (project) {
    var totalBudget = getMoney(project.budget)
    if (totalBudget) project.budget = totalBudget
  })
  projects.forEach(function (project){
    var totalPTD = getMoney(project.ptdactual)
    if (totalPTD) project.ptdactual = totalPTD
  })
  return projects
}

function turnMonthlyCurrency(projects) {
  projects.forEach(function (project) {
  var actualMoney = getMoney(project.actual)
  var budgetedMoney = getMoney(project.budgeted)
  if (actualMoney) project.actual = actualMoney
  if (budgetedMoney) project.budgeted = budgetedMoney
  })
  return projects
}

// ------------------------------------------------ //

// for quick stats table

function getInProgress (projects) {
  var inProgress = []
  projects.forEach(function (project) {
    if (project.status.match(/in progress/i)) inProgress.push(project)
      else return "0"
  })
  return inProgress
}

function inProgressSpent (projects) {
  if (projects = []) return "0"
  var inProgressDollars = []
  projects.forEach(function (project) {
    if (project.ptdactual === "") return 
    inProgressDollars.push(+project.ptdactual) 
  })
  return inProgressDollars.reduce(function(a,b) {
    return a + b
  })
}

// ------------------------------------------- //
  
// function comboArrays(projectsA, projectsB) {
// 	 var arrayA = projectsA
// 	 var arrayB = projes
// 	 var comboArray = arrayA.concat(arrayB)
// 	 return comboArray
//  } 

// function isComplete(element) {
//   var currentYear = "year" + getCurrentYear()
//   var dollars = element[currentYear]
//   if (dollars > 0) return "active"
//   else 
//   return "not active"
// }

// function getPreviousYears() {
//   var currentYear = "year" + getCurrentYear()
//   return YEARS.slice(0, YEARS.indexOf(currentYear))
// }

// function getFutureYears() {
//   var currentYear = "year" + getCurrentYear()
//   return YEARS.slice(YEARS.indexOf(currentYear))
// }

// function hasActiveFuture(element) {
//   var activeFuture = false
//   getFutureYears().forEach(function (year){
//     if (element[year] > 0) activeFuture = true            
//   })   
//   return activeFuture
// }

// function getActiveProjects(projects) {
//   var activeProjects = []
//   projects.forEach(function getActive(element) {
//     if (isActive(element)) activeProjects.push(element)
//   })
//   return activeProjects
// }

// function getProjectTotal(project) {
//   var projectTotal = project[tot]
//   return projectTotal
// }

// function getCatTotal(projects) {
//   var catTotal = 0
//   projects.forEach(function (element) {
//     var projectTotal = element[tot]
//     catTotal += parseInt(projectTotal)
//   })
//   return catTotal
// }

// function completedProjects(projects) {
//   var completed = 0
//   projects.forEach(function (project) {
//     if (!hasActiveFuture(project)) completed = completed + 1
//   })
//   return completed      
// }

// function isActive(element) {
//   var currentYear = "year" + getCurrentYear()
//   var dollars = element[currentYear]
//   if (dollars > 0) return true
//   return false
// }

// function amountSpent(projects) {
//   var spent = 0
//   projects.forEach(function (project) {
//     var currentYear = "year" + getCurrentYear()
//     var funds = parseInt(project[currentYear]) 
//     if (funds > 0) spent = spent + funds
//     getPreviousYears().forEach(function (year) {
//       var funds = parseInt(project[year])
//       if (funds > 0) spent = spent + funds 
//     })
//   })
//   return spent
// } 

// Mappin' with Leaflet.js

function displayAddress(map, project) {
  var markerLocation = new L.LatLng(project.lat, project.long);
  setCenter(map, markerLocation)
  var marker = new L.Marker(markerLocation);
  map.addLayer(marker);
  marker.bindPopup(project[focusAreaColumn]).openPopup();
}

function loadMap() {
  var	map = new L.Map('map', {
    touchZoom: true,
    scrollWheelZoom: false,
    dragging: true});
	var cloudmade = new L.TileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>, Tiles from <a href="http://tiles.stamen.com" target="_blank">Stamen</a>',
	    maxZoom: 18
	});
 map.addLayer(cloudmade);
 return map
}

function setCenter(map, markerLocation) {
	map.setView(markerLocation, 13)
}	

// d3 chartyness

function renderGraph(data, noProjsInCat, divTown) {

var m = [30, 60, 10, 200],
    w = 780 - m[1] - m[3],
    h = (noProjsInCat * 40) - m[0] - m[2];

var format = d3.format(",.0f");

var x = d3.scale.linear().range([0, w]),
    y = d3.scale.ordinal().rangeRoundBands([0, h], .1);

var xAxis = d3.svg.axis().scale(x).orient("top").tickSize(-h).tickFormat(d3.format(".2s")),
    yAxis = d3.svg.axis().scale(y).orient("left").tickSize(0);

var svg = d3.select(divTown).append("svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
  .append("g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");
 

  // Parse numbers, and sort by value.
  data.forEach(function(d) { d.total = +d.total; });
  // data.sort(function(a, b) { return b.total - a.the_post_thumbnail; });

  // Set the scale domain.
  x.domain([0, d3.max(data, function(d) { return d.total; })]);
  y.domain(data.map(function(d) { return d.focusarea; }));

  var bar = svg.selectAll("g.bar")
      .data(data)
    .enter().append("g")
      .attr("class", "bar")
      .attr("transform", function(d) { return "translate(0," + y(d.focusarea) + ")"; });

  bar.append("rect")
      .attr("width", function(d) { return x(d.total); })
      .attr("height", y.rangeBand())
      .style("fill", function(d) { return d.hexcolor; });

  bar.append("text")
      .attr("class", "value")
      .attr("x", function(d) { return x(d.total); })
      .attr("y", y.rangeBand() / 2)
      .attr("dx", 60)
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .text(function(d) { return format(d.total); });
      

  svg.append("g")
      .attr("class", "x axis")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis);
};


