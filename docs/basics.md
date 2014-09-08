# Spreadsheets as Databases

Spreadsheets are a great _lightweight_ databases. Google Spreadsheets in particular are easy to work with and share, making this unlike most traditional database setups. That being said, traditional databases are great for bigger, more secure jobs. If you're storing lots and lots and lots of information, or storing sensitive or complex information -- the spreadsheet is not for you. But if you're working on small to medium sized personal or community projects, try a spreadsheet!

## The Short & Sweet

1. Link to Sheetsee.js, [tabletop.js](https://github.com/jsoma/tabletop/) and [jQuery](http://www.jquery.org) in your HTML head.
2. Create a place holder `<div>` in your HTML for any chart, map or table you want to have.
3. Create templates for tables in `<script>` tags.
4. Inside of a `<script>` tag initialize Tabletop.js. It waits for the document to load and then initializes tabletop and calls back a function when it has returned with the spreadsheet data.
```JAVASCRIPT
document.addEventListener('DOMContentLoaded', function() {
    var gData
    var URL = "YOURSPREADSHEETSKEYHERE"
    Tabletop.init( { key: URL, callback: callback, simpleSheet: true } )
})
```
6. Define the function that Tabletop.js calls when it returns with the data. This function will contain all the Sheetsee.js functions that you use for the maps, charts and tables you desire. Style it up with some CSS.
```JAVASCRIPT
function callback(data) {
    // All the sheetsee things you want to do!
}
```
5. Set it and forget. Now all you need to do is edit the spreadsheet and visitors will get the latest information every time they load the page.

## Bare Minimum Setup

Ignoring some HTML things to conserve space, you get the point. This is a basic setup.

```HTML
<html>
  <head>
    <meta charset="utf-8">
    <script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
    <script type="text/javascript" src="js/tabletop.js"></script>
    <script type="text/javascript" src='js/sheetsee.js'></script>
    <link rel="stylesheet" type="text/css" href="css/sss.css">
  </head>
  <body>
  <div id="placeholder"></div>
  
  <script id="placeholder" type="text/html">
    // template if you so desire!
  </script>
  
  <script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function() {
        var URL = "YOURSPREADSHEETSKEYHERE"
        Tabletop.init( { key: URL, callback: myData, simpleSheet: true } )
    })
    function myData(data) {
        All the sheetsee things you want to do!
    }
  </script>
  </body>
</html>
```

## Your Data

![sheetsee](https://raw.github.com/jllord/sheetsee-cache/master/img/spreadsheettodata.png)

Your Google Spreadsheet should be set up with row one as your column headers. Row two and beyond should be your data.  Each header and row becomes an oject in the final array that Tabletop.js delivers of your data.

![sheetsee](https://raw.github.com/jllord/sheetsee-cache/master/img/nonos.png)

There shouldn't be any breaks or horizontal organization in the spreadsheet. But, feel free to format the style of your spreadsheet as you wish; borders, fonts and colors and such do not transfer or affect your data exporting.

    [{"name":"Coco","breed":"Teacup Maltese","kind":"Dog","cuddlability":"5","lat":"37.74832","long":"-122.402158","picurl":"http://distilleryimage8.s3.amazonaws.com/98580826813011e2bbe622000a9f1270_7.jpg","hexcolor":"#ECECEC","rowNumber":1}...]

### Hexcolor

![sheetsee](https://raw.github.com/jllord/sheetsee-cache/master/img/hexcolors.png)

You must add a column to your spreadsheet with the heading _hexcolor_ (case insensitive). The maps, charts and such use colors and this is the easiest way to standardize that. The color scheme is up to you, all you need to do is fill the column with hexidecimal color values. This [color picker](http://color.hailpixel.com/) by [Devin Hunt](https://twitter.com/hailpixel) is really nice. #Funtip: Coloring the background of the cell it's hexcolor brings delight!

### Geocoding

If you intend to map your data and only have addresses you'll need to geocode the addresses into lat/long coordinates. Mapbox built a [plugin](http://mapbox.com/tilemill/docs/guides/google-docs/#geocoding)
 that does this for you in Google Docs. You can also use websites like [latlong.net](http://www.latlong.net/) to get the coordinates and paste them into rows with column headers _lat_ and _long_.

### Publishing Your Spreadsheet

![sheetsee](https://raw.github.com/jllord/sheetsee-cache/master/img/publish.png)

You need to do this in order to generate a unique key for your spreadsheet, which Tabletop.js will use to get your spreadsheet data. In your Google Spreadsheet, click _File_ > _Publish to the Web_. Then in the next window click _Start Publishing_; it will then turn into a _Stop Publishing_ button.

![sheetsee](https://raw.github.com/jllord/sheetsee-cache/master/img/key.png)

You should have an address in a box at the bottom, your key is the portion between the = and the &. You'll retrieve this later when you hook up your site to the spreadsheet. _Actually, you technically can use the whole URL, but it's so long..._

### CSS

Sheetsee.js comes with a bare minimum stylesheet, `sss.css`, which contains elements you'll want to style when using the feature they correspond to.
