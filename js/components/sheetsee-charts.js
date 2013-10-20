var d3 = require('d3')

module.exports = {
	d3: d3, // If you want an external dependency to be available to other files, add an export like this. It will be available with Sheetsee.nameOfDep

	// Bar Chart
	// Adapted mostly from http://bl.ocks.org/mbostock/3885705
	// options = {units: "string", labels: "string", m: [60, 150, 30, 150], w: 800, h: 300, div: "#dogBar", xaxis: "cuddlability", hiColor: "#EE0097"}

	d3BarChart: function(data, options) {
	  
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
	  },

	  // Pie Chart
	  // pieOptions = {units: "string", labels: "string", m: [80, 80, 80, 80], w: 800, h: 400, div: "#dogPie", hiColor: "#E4EB29"}
	  d3PieChart: function(data, options) {

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
	  },

	  // Line Chart
	  // Adapted from http://bl.ocks.org/1166403 and
	  // http://www.d3noob.org/2013/01/adding-tooltips-to-d3js-graph.html
	  /// options = {units: "string", labels: "string", m: [80, 100, 120, 100], w: 800, h: 400, div: "#dogLine", yaxis: "cuddlability", hiColor: "#E4EB29"}
	  d3LineChart: function(data, options) {
	    
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
}