# Sheetsee-charts

_[View Demo](/demos/demo-chart.html)_

Sheetsee.js provides three [D3.js](http://d3js.org/) chart options to use with your spreadsheet data: a bar chart, line graph and pie chart. You can also use a custom D3 chart with Sheetsee, read about that [here](custom-charts.md).

## Make a Chart

Each chart requires your data be an _array of objects_, with objects containing `label` and `units` key/value pairs.

Experiment with the charts to find the correct size your `<div>` will need to be to hold the chart with your data in it nicely.

You can also make your own D3 chart in a separate .js file, link to that in your HTML head and pass your data on to it after Tabletop.js returns. Information [here](custom-charts.md) on using your own chart.

### Bar Chart

To create a bar chart you'll need to add a placeholder `<div>` in your HTML with an id.

```HTML
<div id="barChart"></div>
```

In your CSS, give it dimensions.

```CSS
#barChart {height: 400px; max-width: 600px; background: #F8CDCD;}
```

You'll also have these CSS elements to style however you'd like:

```CSS
.labels text {text-align: right;}
.bar .labels text {fill: #333;}
.bar rect {fill: #e6e6e6;}
.axis {shape-rendering: crispEdges;}
.x.axis line {stroke: #fff; fill: none;}
.x.axis path {fill: none;}
.x.axis text {fill: #333;}
.xLabel {font-family: sans-serif; font-size: 9px;}
```

In a `<script>` tag set up your options.

```JAVASCRIPT
var barOptions = {labels: "name", units: "cuddleability", m: [60, 60, 30, 150], w: 600, h: 400, div: "#barChart", xaxis: "no. of pennies", hiColor: "#FF317D"}
```

- **labels** is a string, usually a column header, it's what you call what you're charting
- **units** is a string, usually a column header, it's the value you're charting
- **m** is margins: top, right, bottom, left
- **w** and **h** are width and height, this should match your CSS specs
- **div** is the id for the `<div>` in your HTML
- **xaxis** is optional text label for your x axis
- **hiColor** is the highlight color of your choosing!

Then call the `d3BarChart()` function with your **data** and **options**.

```javascript
Sheetsee.d3BarChart(data, barOptions)
```

### Line Chart

To create a line chart you'll need to add a placeholder `<div>` in your html with an id.

```HTML
<div id="lineChart"></div>
```

In your CSS, give it dimensions.

```CSS
#lineChart {height: 400px; max-width: 600px; background: #F8CDCD;}
```

And these chart elements to style:

```CSS
.axis {shape-rendering: crispEdges;}
.x.axis .minor, .y.axis .minor {stroke-opacity: .5;}
.x.axis {stroke-opacity: 1;}
.y.axis line, .y.axis path {fill: none; stroke: #acacac; stroke-width: 1;}
.bigg {-webkit-transition: all .2s ease-in-out; -webkit-transform: scale(2);}
path.chartLine {stroke: #333; stroke-width: 3; fill: none;}
div.tooltip {position: absolute; text-align: left; padding: 4px 8px; width: auto; font-size: 10px; height: auto; background: #fff; border: 0px; pointer-events: none;}
circle {fill: #e6e6e6;}
```

In a `<script>` tag set up your options.

```javascript
var lineOptions = {labels: "name", units: "cuddleability", m: [80, 100, 120, 100], w: 600, h: 400, div: "#lineChart", yaxis: "no. of pennies", hiColor: "#14ECC8"}
```

- **labels** is a string, usually a column header, it's what you call what you're charting
- **units** is a string, usually a column header, it's the value you're charting
- **m** is your margins: top, right, bottom, left
- **w** and **h** are width and height, this should match your CSS specs
- **div** is the id for the `<div>` in your HTML
- **yaxis** is optional text label for your y axis
- **hiColor** is the highlight color of your choosing!

Then call the `d3LineChart()` function with your **data** and **options**.

```JAVASCRIPT
Sheetsee.d3LineChart(data, lineOptions)
```

### Pie Chart

To create a bar chart you'll need to add a placeholder `<div>` in your html with an id.

```HTML
<div id="pieChart"></div>
```
In your CSS, give it dimensions.

```CSS
#pieChart {height: 400px; max-width: 600px; background: #F8CDCD;}
```

Style chart elements:

```CSS
.arc path { stroke: #fff;}
```

In a `<script>` tag set up your options.

```JAVASCRIPT
var pieOptions = {labels: "name", units: "units", m: [80, 80, 80, 80], w: 600, h: 400, div: "#pieChart", hiColor: "#14ECC8"}
```

- **labels** is a string, usually a column header, it's what you call what you're charting
- **units** is a string, usually a column header, it's the value you're charting
- **m** is your margins: top, right, bottom, left
- **w** and **h** are width and height, this should match your CSS specs
- **div** is the id for the `<div>` in your HTML
- **hiColor** is the highlight color of your choosing!

Then call the `d3PieChart()` function with your **data** and **options**.

```JAVASCRIPT
Sheetsee.d3PieChart(data, pieOptions)
```
