# sheetsee-maps

![sheetsee](https://raw.github.com/jllord/sheetsee-cache/master/img/sheetsee-03.png)

Module for creating maps with [sheetsee.js](http://jlord.github.io/sheetsee.js). It turns your spreadsheet data into geoJSON to use with mapbox.js. Below is the portion of the sheetsee.js documentation relevant to mapping. For all the documentation, go [here](http://jlord.github.io/sheetsee.js)!

---

## Make a Map

Sheetsee.js uses [Mapbox.js](http://mapbox.com/mapbox.js), a [Leaflet.js](http://leafletjs.com/) plugin, to make maps.

Create an empty `<div>` in your HTML, with an id.

    <div id="map"></div>

Next you'll need to create geoJSON out of your data so that it can be mapped.

### Sheetsee.createGeoJSON(data, optionsJSON)

This takes in your **data** and the parts of your data, **optionsJSON**,  that you plan in your map's popups. If you're not going to have popups on your markers, don't worry about it then and just pass in your data. 

    var optionsJSON = ["name", "breed", "cuddlability"]
    var geoJSON = Sheetsee.createGeoJSON(gData, optionsJSON)

It will return an _array_ in the special geoJSON format that map making things love. 

    [{
      "geometry": {"type": "Point", "coordinates": [long, lat]},
      "properties": {
        "marker-size": "small",
        "marker-color": lineItem.hexcolor
      },
      "opts": {the options you pass in},
    }}


### Sheetsee.loadMap(mapDiv)

To create a simple map, with no data, you simply call `.loadMap() and pass in a _string_ of the **mapDiv** (with no #) from your HTML.

    var map = Sheetsee.loadMap("map")

### Sheetsee.addTileLayer(map, tileLayer)

To add a tile layer, aka a custom map scheme/design/background, you'll use this function which takes in your **map** and the source of the **tileLayer**. This source can be a Mapbox id, a URL to a TileJSON or your own generated TileJSON. See [Mapbox's Documentation](http://mapbox.com/mapbox.js/api/v1.0.2/#L.mapbox.tileLayer) for more information.

    Sheetsee.addTileLayer(map, 'examples.map-20v6611k')

You can add tiles from awesome mapmakers like [Stamen](examples.map-20v6611k) or create your own in Mapbox's [Tilemill](http://www.mapbox.com/tilemill) or [online](https://tiles.mapbox.com/newmap#3.00/0.00/0.00).

### Sheetsee.addMarkerLayer(geoJSON, map)

To add makers to your map, use this function and pass in your **geoJSON** so that it can get the coordinates and your **map** so that it places the markers there.

    var markerLayer = Sheetsee.addMarkerLayer(geoJSON, map)

### Sheetsee.addPopups(map, markerLayer)

To customize the marker popup content in your map use this function and pass in your **map** and **markerLayer**.

     Sheetsee.addPopups(map, markerLayer)
