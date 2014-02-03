# Sheetsee-charts

_[View Demo](/demos/demo-chart.html)_

Sheetsee.js provides three [d3.js](http://d3js.org/) chart options to use with your spreadsheet data: a bar chart, line chart and pie graph. You can also plug in your own custom d3.js chart to sheetsee, read about that [here](custom-charts.md).

## Make a Chart

Sheetsee.js comes with a d3.js bar, pie and line chart. Each requires your data be an _array of objects_, with objects containing "label" and "units" key/value pairs. See the section above on Your Data to learn about formatting.

Experiment with the charts to find the correct size your `<div>` will need to be to hold the chart with your data in it nicely.

You can also make your own d3 chart in a separate .js file, link to that and pass your data on to it. Information [here](docs/custom-charts.md) on using your own chart.

### Bar Chart

To create a bar chart you'll need to add a placeholder `<div>` in your HTML with an id.

```HTML
<div id="barChart"></div>
```

In your CSS, give it dimensions.

```CSS
barChart {height: 400px; max-width: 600px; background: #F8CDCD;}
```

In a `<script>` tag set up your options.

```javascript
var barOptions = {labels: "name", units: "cuddleability", m: [60, 60, 30, 150], w: 600, h: 400, div: "#barChart", xaxis: "no. of pennies", hiColor: "#FF317D"}
```

* **labels** is a string, usually a column header, it's what you call what you're charting
* **units** is a string, usually a column header, it's the value you're charting
* **m** is margins: top, right, bottom, left
* **w** and **h** are width and height, this should match your CSS specs
* **div** is the id for the `<div>` in your HTML
* **xaxis** is optional text label for your x axis
* **hiColor** is the highlight color of your choosing!

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

In a `<script>` tag set up your options.

```
var lineOptions = {labels: "name", units: "cuddleability", m: [80, 100, 120, 100], w: 600, h: 400, div: "#lineChart", yaxis: "no. of pennies", hiColor: "#14ECC8"}
```

* **labels** is a string, usually a column header, it's what you call what you're charting
* **units** is a string, usually a column header, it's the value you're charting
* **m** is your margins: top, right, bottom, left
* **w** and **h** are width and height, this should match your CSS specs
* **div** is the id for the `<div>` in your HTML
* **yaxis** is optional text label for your y axis
* **hiColor** is the highlight color of your choosing!

Then call the `d3LineChart()` function with your **data** and **options**.

```
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

In a `<script>` tag set up your options.

```javascript
var pieOptions = {labels: "name", units: "units", m: [80, 80, 80, 80], w: 600, h: 400, div: "#pieChart", hiColor: "#14ECC8"}
```

* **labels** is a string, usually a column header, it's what you call what you're charting
* **units** is a string, usually a column header, it's the value you're charting
* **m** is your margins: top, right, bottom, left
* **w** and **h** are width and height, this should match your CSS specs
* **div** is the id for the `<div>` in your HTML
* **hiColor** is the highlight color of your choosing!

Then call the `d3PieChart()` function with your **data** and **options**.

```javascript
Sheetsee.d3PieChart(data, pieOptions)
```
