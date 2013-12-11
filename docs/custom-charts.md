# Custom Charts

It's easy to take a d3 chart of your own and use it with Sheetsee. If you make it into a module, anyone can use your chart, too!

Sheetsee charts currently work by taking in some options, like so:

```javascript
var pieOptions = {labels: "name", units: "units", m: [80, 80, 80, 80], w: 600, h: 400, div: "#pieChart", hiColor: "#14ECC8"}
```

The _labels_ represent the, the actual thing you're charting and _units_ are how many of those things. Margin, width and height are _m, w, h_ and the div to build your chart in is _div_. Finally, you can supply a highlight color if you want.

So, your chart could take the same options, but map them into your d3 code with the correct variables. For instance if what sheetsee calls _labels_ you call _itemID_ you just add at the top of your code:

```javascript
labels = itemID
```
