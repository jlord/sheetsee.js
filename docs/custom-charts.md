# Custom Charts

It's easy to take a [D3.js](http://d3js.org/) chart of your own and use it with Sheetsee.js. If you make it into a module, anyone can use your chart, too!

Sheetsee charts currently work by taking in some options, like so:

```javascript
var pieOptions = {labels: "name", units: "units", m: [80, 80, 80, 80], w: 600, h: 400, div: "#pieChart", hiColor: "#14ECC8"}
```

The _labels_ represent the actual thing you're charting and _units_ are how many of those things. Margin, width and height are _m, w, h_ and the `<div>` to build your chart in is _div_. Finally, you can supply a highlight color if you want.

So, your chart could take the same options, but map them into your D3 code with the correct variables. An example from [maxogden/sheetsee-d3bubble](https://github.com/maxogden/sheetsee-d3bubble):


_Append the d3.js code with a map of your sheetsee options_

```JavaScript
Sheetsee.d3BubbleChart = function(data, options) {
	var tree = {name: "data", children: []}
	var groups = {}

	// data needs to look like this:
	// var data = { name: "wahtever", children: [
	//   { name: "group1", children: [
	//     { name: 'bob', size: 3},
	//     { name: 'judy', size: 5}
	//   ]},
	//   { name: "group2", children: [
	//     { name: 'jim', size: 10},
	//     { name: 'bill', size: 5}
	//   ]}
	// ]}
  
	data.map(function(r) {
		var groupName = r[options.group]
		groups[groupName] = true
	})

	Object.keys(groups).map(function(groupName) {
		var groupMembers = []
		data.map(function(r) {
			if (r[options.group] !== groupName) return
			groupMembers.push({name: r[options.name], size: r[options.size]})
		})
		tree.children.push({name: groupName, children: groupMembers})
	})
  
  // the rest of the code
```

_In your HTML call it like so_

```JavaScript
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {
    var URL = "0AvFUWxii39gXdFhqZzdTeU5DTWtOdENkQ1Y5bHdqT0E"
    Tabletop.init( { key: URL, callback: showInfo, simpleSheet: true } )
  })

  function showInfo(data) {
    Sheetsee.d3BubbleChart(data, { name: 'name', size: 'cuddlability', group: 'kind', div: '#stuff'})
  }
</script>
```

There are lots of charts to get excited about in the [D3 gallery](https://github.com/mbostock/d3/wiki/Gallery).

_View the [entire source](https://github.com/maxogden/sheetsee-d3bubble)_
