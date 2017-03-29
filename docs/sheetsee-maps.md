# sheetsee-maps

Sheetsee uses this module to handle maps in your projects. This module uses (and includes) [Leaflet.js](http://leafletjs.com) to make maps of your **points**, **polygons**, **lines** or **multipolygons** (all coordinate based). Details on what that actually looks like [here](http://leafletjs.com/examples/geojson.html). It uses (and includes) [Mustache.js](https://mustache.github.io) templates for marker popups.

You'll need to include Leaflet's map CSS in your HTML's head:

```html
<head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.0.3/dist/leaflet.css" />
</head>
```

## Maps: Polygons and Lines

Sheetsee-maps supports polygons and lines; so long as you have the correct coordinate structure in your cells. More details for coordinates of lines and polygons in geoJSON are [here](http://leafletjs.com/examples/geojson.html), but briefly:

**Must use lowercase spreadsheet column headers: 'lat' and 'long'.**

**A linestring:**

```text
[-122.41722106933594, 37.7663045891584], [-122.40477561950684, 37.77695634643178]
```

**A polygon:**

```text
[-122.41790771484375, 37.740381166384914], [-122.41790771484375, 37.74520008134973], [-122.40966796874999, 37.74520008134973],[-122.40966796874999, 37.740381166384914], [-122.41790771484375, 37.740381166384914]
```

**A Multipolygon:**

```text
[[-122.431640625, 37.79106586542567], [-122.431640625, 37.797441398913286], [-122.42666244506835, 37.797441398913286],[-122.42666244506835, 37.79106586542567], [-122.431640625, 37.79106586542567]],
[[-122.43352890014648, 37.78197638783258], [-122.43352890014648, 37.789031004883654], [-122.42443084716797, 37.789031004883654], [-122.42443084716797, 37.78197638783258], [-122.43352890014648, 37.78197638783258]]
```

## To Use

This module is used as a part of [Sheetsee.js](http://jlord.us/sheetsee.js). You can download the [full version](https://github.com/jlord/sheetsee.js/blob/master/js/sheetsee.js) or build your own with a [command line tool](https://github.com/jlord/sheetsee).

You'll create a little bit of HTML and then some JavaScript in your HTML to use this. You can customize marker color, popup content and enable/disable clustering in your map.

## Methods

Here are the functions you can use!

### `Sheetsee.createGeoJSON(data, optionsJSON)`

- **data** _JSON array_ of data
- **optionsJSON** _array_ of strings, spreadsheet column title

If you'd like to just generate geoJSON from a spreadsheet you can use this method.

This takes in your spreadsheet **data** in JSON format (which you can get with [Tabletop.js]())and the parts of your data, **optionsJSON**,  that you plan on including in your map's popups. These will be column headers in your spreadsheet in an array of strings.

If you're not going to have popups on your markers, don't worry about it then and just pass in your data (by default it will use all the row's information).

```javascript
var optionsJSON = ['name', 'breed', 'cuddlability']
var geoJSON = Sheetsee.createGeoJSON(data, optionsJSON)
```

It will return an _array_ in the special [geoJSON format](http://geojson.org) that map making things love.

### `Sheetsee.loadMap(options)`

This method will generate a map for you on the page (it also generates the geoJSON for the map).

- **options**  _object_ **required**
  - `data` your spreadsheet data array **required**
  - `mapDiv` the `id` of the `div` in your HTML to contain the map **required**
  - `geoJSONincludes` array of strings of column headers to include in popups
  - `template` HTML/[Mustache](https://mustache.github.io) template for popups
  - `cluster` a true/false boolean, do you want your markers clustered
  - `hexcolor` pick one color for your markers

```js
var mapOptions = {
  data: data, // required
  mapDiv: 'map', //required
  geoJSONincludes: ['Name', 'Animal', 'Rating'], // optional
  template: '<p>{{Name}}—{{Animal}}—{{Rating}}</p>', // optional
  cluster: true, // optional
  hexcolor: '#e91e63' // optional
}
Sheetsee.loadMap(mapOptions)
```

**Breaking Changes** The latest version of Sheetsee replaces three methods ('loadMap', 'addTileLayer', 'addMarkerLayer') with one `loadMap` which takes in an object of map options.

#### Marker colors

If you create a column title `hexcolor` in your spreadsheet and fill each cell with hex color codes, those will be used to color your markers. If you define a color for `hexcolor` in the options you pass to your map it will override colors in the spreadsheet data.

_[View Demo](http://jlord.us/sheetsee.js/demos/demo-maps.html)_
_[Visit Site](http://jlord.us/sheetsee.js)_
