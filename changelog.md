## August 16, 2013
### The Browserify Boogie

* Sheetsee is now built with Browserify and split up into components. By editing one line, you can remove the d3 and mapbox components, or add your own for great spreadsheeting. 
* jQuery and Tabletop are no longer in the repository, so you must include them via your own means. Thankfully, both are available on major CDNs, which is what happens in both `index.html` and `demo.html`. The other libraries are included via the `package.json`, which means to populate the libraries, just run `npm install`.
* Sheetsee has been cleaned up, and exports like a good node module. jQuery is not included via npm because all the current packages are unofficial and outdated, and the official jQuery repository has yet to publish to npm. Tabletop is not included via npm due to it using `request` on Node, which is incompatible with Browserify.
* A makefile will handle the proper browserification and minifying. Just run `make` and look in the `dist` folder.
* Dependencies have been updated. Mapbox is now 1.3.1, icanhaz is now 0.10.3 and d3 is now 3.2.8.

## August 13, 2013
### Charting Intake

D3 charts need an array of objects, and something to chart: the thing itself (aka labels) and the corresponding value (aka units). Your data usually contains more than D3 needs to make the chart, so you have to tell it what to chart from your data to chart. 

Previously Sheetsee required you pass your data through a function, `addUnitsAndLabels()` which took in your data and the things you wanted to chart, reformatted your data for you so that you could pass it into one of the d3 charts. This is one more step than actually needs to happen.

Now Sheetsee just asks for what you want your _labels_ and _units_ to be in the options you give it when calling the chart function. It then sorts the data correctly on the inside of the chart function. Yay, easier! 

```
  var options = {
    labels: "name", 
    units: "cuddleability", 
    m: [60, 60, 30, 150], 
    w: 600, h: 400, 
    div: "#barChart", 
    xaxis: "no. of pennies", 
    hiColor: "#FF317D"
  }
```

Thanks @maxogden for the help with this.
