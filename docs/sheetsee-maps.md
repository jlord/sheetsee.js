# Sheetsee-maps

_[View Demo](/demos/demo-map.html)_

Sheetsee.js uses [Mapbox.js](http://mapbox.com/mapbox.js) and [Leaflet.js](http://leafletjs.com/) to make maps of your **points**, **polygons**, **lines** or **multipolygons** (all coordinate based). Details on what that actually looks like [here](http://leafletjs.com/examples/geojson.html).

You'll create a placeholder `<div>` in your HTML, CSS giving it a size and fire up a map from within `<script>` tags. You can also customize your popup content.

## Your HTML Placeholder `<div>`

Create an empty `<div>` in your HTML, with an id (name). Add CSS to give it dimensions

```HTML
<div id="map"></div>
```
_CSS_

```CSS
#map {width: 500px; height: 500px;}
```

## Your `<script>` Functions

Next you'll need to create geoJSON out of your data so that it can be mapped.

### Sheetsee.createGeoJSON(data, optionsJSON)

This takes in your **data** and the parts of your data, **optionsJSON**,  that you plan on including in your map's popups. These will be column headers in your spreadsheet. If you're not going to have popups on your markers, don't worry about it then and just pass in your data (by default it will use all the row's information).

```javascript
var optionsJSON = ["name", "breed", "cuddlability"]
var geoJSON = Sheetsee.createGeoJSON(gData, optionsJSON)
```

It will return an _array_ in the special geoJSON format that map making things love.

```JAVASCRIPT
[{
  "geometry": {"type": "Point", "coordinates": [long, lat]},
  "properties": {
    "marker-size": "small",
    "marker-color": lineItem.hexcolor
  },
  "opts": {},
}}
```

### Sheetsee.loadMap(mapDiv)

To create a simple map, with no data, you simply call `.loadMap()` and pass in a _string_ of the **mapDiv** (with no '#') from your HTML.

```javascript
var map = Sheetsee.loadMap("map")
```

### Sheetsee.addTileLayer(map, tileLayer)

To add a tile layer (aka a custom map scheme/design/background) you'll use this function which takes in your **map** and the source of the **tileLayer**. This source can be a Mapbox id, a URL to a TileJSON or your own generated TileJSON. See [Mapbox's Documentation](http://mapbox.com/mapbox.js/api/v1.0.2/#L.mapbox.tileLayer) for more information.

```javascript
Sheetsee.addTileLayer(map, 'examples.map-20v6611k')
```

You can add tiles from awesome mapmakers like [Stamen](examples.map-20v6611k) or create your own in Mapbox's [Tilemill](http://www.mapbox.com/tilemill) or [online](https://tiles.mapbox.com/newmap#3.00/0.00/0.00).

### Sheetsee.addMarkerLayer(geoJSON, map)

To add makers, lines or shapes to your map, use this function and pass in your **geoJSON** so that it can get the coordinates and your **map** so that it places the markers there. You can customize what the content in your marker's popup looks like with a **popupTemplate**, which is an ICanHaz.js template in HTML and can reference the column headers you included in your optionsJSON.

```javascript
var markerLayer = Sheetsee.addMarkerLayer(geoJSON, map, popupTemplate)
```

Example template:

```javascript
var popupTemplate = "<h4>Hello {{name}}</h4>"
```

#### Source from the [map demo](/demos/demo-map.html):

```JavaScript
<script type="text/javascript">
  document.addEventListener('DOMContentLoaded', function() {
    var gData
    var URL = "0Ao5u1U6KYND7dGN5QngweVJUWE16bTRob0d2a3dCbnc"
    Tabletop.init( { key: URL, callback: showInfo, simpleSheet: true } )
  })

  function showInfo(data) {
    gData = data
    var optionsJSON = ["placename", "photo-url"]
    var template = "<ul><li><a href='{{photo-url}}' target='_blank'>"
                 + "<img src='{{photo-url}}'></a></li>"
                 + "<li><h4>{{placename}}</h4></li></ul>"
    var geoJSON = Sheetsee.createGeoJSON(gData, optionsJSON)
    var map = Sheetsee.loadMap("map")
    Sheetsee.addTileLayer(map, 'examples.map-20v6611k')
    var markerLayer = Sheetsee.addMarkerLayer(geoJSON, map, template)
  }
</script>
```
