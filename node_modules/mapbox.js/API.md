# Getting Started

This API documentation covers the MapBox Javascript API, an API for adding
MapBox maps to webpages.

## Prerequisites

In order to use this API, you'll need to understand basic Javascript and mapping concepts.
If you'd like to learn Javascript, start with [an interactive course](http://www.codecademy.com/tracks/javascript),
[a book](http://eloquentjavascript.net/) or [a printed book](http://www.amazon.com/dp/0596517742/?tag=stackoverfl08-20).
If you'd like to learn more about maps, [we've provided a helpful article explaining how web maps work](http://mapbox.com/developers/guide/).

## MapBox.js & Leaflet

The Javascript API is implemented as a [Leaflet](http://leafletjs.com/) plugin. Leaflet
is an open-source library that provides the basic ability to embed a map, like
a MapBox map or a map from OpenStreetMap, into a page. [The Leaflet API](http://leafletjs.com/reference.html)
handles much of the fundamental operations of using maps, so this API documentation is
meant to be used in conjunction with the [Leaflet](http://leafletjs.com/reference.html) API
reference.

The MapBox API includes Leaflet and makes it easier to integrate Leaflet with MapBox's
maps and services.

## Getting Started with the API

Here's a simple page that you can set up with MapBox.js:

    <html>
    <head>
      <link href='//api.tiles.mapbox.com/mapbox.js/v1.2.0/mapbox.css' rel='stylesheet' />
      <!--[if lte IE 8]>
        <link href='//api.tiles.mapbox.com/mapbox.js/v1.2.0/mapbox.ie.css' rel='stylesheet' />
      <![endif]-->
      <script src='//api.tiles.mapbox.com/mapbox.js/v1.2.0/mapbox.js'></script>
      <style>
      #map {
        width:600px;
        height:400px;
      }
      </style>
    </head>
    <body>
      <div id='map' class='dark'></div>
      <script type='text/javascript'>
      var map = L.mapbox.map('map', 'examples.map-y7l23tes')
          .setView([37.9, -77], 5);
      </script>
    </body>
    </html>

The necessary Javascript and CSS files for the map are hosted on MapBox's servers, so they're
served from a worldwide content-distribution network. There's no API key required to include
the Javascript API - you'll identify with MapBox's services simply by using your own custom
maps.

## Reading this Documentation

This documentation is organized by _methods_ in the Javascript API. Each method
is shown with potential arguments, and their types. For instance, the `setFilter`
method on `L.mapbox.markerLayer` is documented as:

    markerLayer.setFilter(filter: function)

The format `filter: function` means that the single argument to `setFilter`, a filter
function, should be a Javascript function. Other kinds of arguments include
`object`, `string`, or `Element`.

When the API has a Javascript constructor function that returns an object, the constructor
is documented with its full name and the functions on the object are named with just
the type of the object. For instance, `L.mapbox.markerLayer` documents a function that
returns a layer for markers. The methods on that object are then documented as
`markerLayer.setFilter`, `markerLayer.getGeoJSON`, and so on.

## The `ready` Event

Like many other Javascript libraries, some of what the MapBox.js plugin does
is [asynchronous](http://recurial.com/programming/understanding-callback-functions-in-javascript/) - when
you create a layer like `L.mapbox.tileLayer('examples.foo')`, the layer
doesn't immediately know which tiles to load and its attribution information.
Instead, it loads this information with an [AJAX](http://en.wikipedia.org/wiki/AJAX)
call.

For most things you'll write, this isn't a problem, since MapBox.js does a good
job of handling these on-the-fly updates. If you're writing code that needs
to know when layers and other dynamically-loaded objects are ready, you can
use the `ready` event to listen for their ready state. For instance:

    var layer = L.mapbox.tileLayer('examples.map-0l53fhk2');
    layer.on('ready', function() {
        // the layer has been fully loaded now, and you can
        // call .getTileJSON and investigate its properties
    });

Similarly, dynamically-loaded objects produce an `error` event if something
goes wrong, like if the map ID you provide is a 404:

    var layer = L.mapbox.tileLayer('examples.map-0l53fhk2');
    layer.on('error', function(err) {
        // for some reason, this layer didn't load.
        // you can find out more with the 'err' argument
        // passed to this function
    });

## TileJSON & UTFGrid

This library takes advantage of several open specifications, including
[TileJSON](http://mapbox.com/developers/tilejson/) and
[UTFGrid](http://mapbox.com/developers/utfgrid/).

For the purposes of this API, TileJSON is used as a way to _describe
maps and resources_, so it
is the configuration format given to layers, maps, and controls. UTFGrid
is _a fast way to interact with maps_ with tooltips and customizable behaviors,
and is easy to define and produce in [TileMill](http://mapbox.com/tilemill/).

## GeoJSON

The MapBox marker API and the `L.mapbox.markers` interface use [GeoJSON](http://www.geojson.org/),
a simple, open standard for geo-data based on [JSON](http://en.wikipedia.org/wiki/JSON)
and simple features, like Points and Polygons.

## Mobile

MapBox.js is optimized for mobile devices and small screens by default. There are however best practices to make sure your map always looks its best.

### Retina

Having the ability to use retina tiles when the device supports them is easy. When creating the map, use the `detectRetina` to verify if retina is available and `retinaVersion` to use a tilelayer which is designed for retina screens.

    var map = L.mapbox.map('map', 'examples.map-y7l23tes', {
        detectRetina: true,
        retinaVersion: 'examples.map-zswgei2n'
      }).setView([40, -74.50], 9);

### Viewport

Modern mobile browsers now support scaling of webpages by leveraging the meta tag `viewport`. This enlarges the window making your map look better on a mobile device. Simply include this in the head of your document:

<meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />

### Scrolling

If you're planning on having a page that has large amounts of scrolling, try to avoid a large map height. Having a 'tall' map can cause the user to get stuck on the map while scrolling. Another way around this is to disable `dragging` for mobile devices: `map.dragging.disable();`

## Standalone MapBox.js

By default, MapBox.js includes a bundled version of Leaflet that MapBox has ensured
is compatible. However, a standalone version of MapBox.js is also available without
Leaflet included, which you can use if you would like to supply your own version of
Leaflet. You will need to include Leaflet's JavaScript and CSS files, and Leaflet 0.6
or greater is required.

Here's an example of using standalone MapBox.js:

    <html>
    <head>
      <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6/leaflet.css" />
      <link href='//api.tiles.mapbox.com/mapbox.js/v1.2.0/mapbox.standalone.css' rel='stylesheet' />
      <!--[if lte IE 8]>
        <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6/leaflet.ie.css" />
      <![endif]-->
      <script src="http://cdn.leafletjs.com/leaflet-0.6/leaflet.js"></script>
      <script src='//api.tiles.mapbox.com/mapbox.js/v1.2.0/mapbox.standalone.js'></script>
      <style>
      #map {
        width:600px;
        height:400px;
      }
      </style>
    </head>
    <body>
      <div id='map' class='dark'></div>
      <script type='text/javascript'>
      var map = L.mapbox.map('map', 'examples.map-y7l23tes')
          .setView([37.9, -77], 5);
      </script>
    </body>
    </html>

# Map

## L.mapbox.map(element: Element, id: string | url: string | tilejson: object, [options: object])

Create and automatically configure a map with layers, markers, and
interactivity.

_Arguments_:

The first argument is required and must be the id of an element, or a DOM element
reference.

The second argument is optional and can be:

* A map `id` string `examples.map-foo`
* A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`
* A [TileJSON](http://mapbox.com/wax/tilejson.html) object, from your own Javascript code

The third argument is optional. If provided, it is the same options
as provided to [L.Map](http://leafletjs.com/reference.html#map-options)
with the following additions:

* `tileLayer` (boolean | object). If true, a `L.mapbox.tileLayer` is added to
  the map based on the TileJSON. The value can also be an object which specifies
  options for the tileLayer. Default: `true`.
* `markerLayer` (boolean | object). If true, a `L.mapbox.markerLayer` is added to
  the map based on the TileJSON. The value can also be an object which specifies
  options for the markerLayer. Default: `true`.
* `gridLayer` (boolean | object). If true, a `L.mapbox.gridLayer` is added to
  the map based on the TileJSON. The value can also be an object which specifies
  options for the gridLayer. Default: `true`.
* `legendControl` (boolean | object). If true, a `L.mapbox.legendControl` is added to
  the map. The value can also be an object which specifies options for the legendControl.
  Default: `true`.

_Example_:

    // map refers to a <div> element with the ID map
    // examples.map-4l7djmvo is the ID of a map on MapBox.com
    var map = L.mapbox.map('map', 'examples.map-4l7djmvo');

    // map refers to a <div> element with the ID map
    // This map will have no layers initially
    var map = L.mapbox.map('map');

_Returns_: a map object

## map.getTileJSON()

Returns this map's TileJSON object which determines its tile source,
zoom bounds and other metadata.

_Arguments_: none

_Returns_: the TileJSON object

# Layers

## L.mapbox.tileLayer(id: string | url: string | tilejson: object, [options: object])

You can add a tiled layer to your map with `L.mapbox.tileLayer()`, a simple
interface to layers from MapBox and elsewhere.

_Arguments_:

The first argument is required and must be:

* An `id` string `examples.map-foo`
* A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`
* A TileJSON object, from your own Javascript code

The second argument is optional. If provided, it is the same options
as provided to [L.TileLayer](http://leafletjs.com/reference.html#tilelayer)
with one addition:

* `retinaVersion`, if provided, is an alternative value for the first argument
  to `L.mapbox.tileLayer` which, if retina is detected, is used instead.

_Example_:

    // the second argument is optional
    var layer = L.mapbox.tileLayer('examples.map-20v6611k');

    // you can also provide a full url to a tilejson resource
    var layer = L.mapbox.tileLayer('http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json');

    // if provided,you can support retina tiles
    var layer = L.mapbox.tileLayer('examples.map-20v6611k', {
        detectRetina: true,
        // if retina is detected, this layer is used instead
        retinaVersion: 'examples.map-zswgei2n'
    });

_Returns_ a `L.mapbox.tileLayer` object.

### tileLayer.getTileJSON()

Returns this layer's TileJSON object which determines its tile source,
zoom bounds and other metadata.

_Arguments_: none

_Example_:

    var layer = L.mapbox.tileLayer('examples.map-20v6611k')
        // since layers load asynchronously through AJAX, use the
        // `.on` function to listen for them to be loaded before
        // calling `getTileJSON()`
        .on('load', function() {
        // get TileJSON data from the loaded layer
        var TileJSON = layer.getTileJSON();
    });

_Returns_: the TileJSON object

### tileLayer.setFormat(format: string)

Set the image format of tiles in this layer. You can use lower-quality tiles
in order to load maps faster

_Arguments_:

1. `string` an image format. valid options are: 'png', 'png32', 'png64', 'png128', 'png256', 'jpg70', 'jpg80', 'jpg90'

_Example_:

    // Downsample tiles for faster loading times on slow
    // internet connections
    var layer = L.mapbox.tileLayer('examples.map-20v6611k', {
        format: 'jpg70'
    });

_Returns_: the layer object

## L.mapbox.gridLayer(id: string | url: string | tilejson: object, [options: object])

An `L.mapbox.gridLayer` loads [UTFGrid](http://mapbox.com/developers/utfgrid/) tiles of
interactivity into your map, which you can easily access with `L.mapbox.gridControl`.

_Arguments_:

The first argument is required and must be:

* An `id` string `examples.map-foo`
* A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`
* A TileJSON object, from your own Javascript code

_Example_:

    // the second argument is optional
    var layer = L.mapbox.gridLayer('examples.map-20v6611k');

_Returns_ a `L.mapbox.gridLayer` object.


### gridLayer.getTileJSON()

Returns this layer's TileJSON object which determines its tile source,
zoom bounds and other metadata.

_Arguments_: none

_Example_:

    var layer = L.mapbox.gridLayer('examples.map-20v6611k')
        // since layers load asynchronously through AJAX, use the
        // `.on` function to listen for them to be loaded before
        // calling `getTileJSON()`
        .on('load', function() {
        // get TileJSON data from the loaded layer
        var TileJSON = layer.getTileJSON();
    });

_Returns_: the TileJSON object

### gridLayer.getData(latlng: LatLng, callback: function)

Load data for a given latitude, longitude point on the map, and call the callback
function with that data, if any.

_Arguments_:

1. `latlng` an L.LatLng object
2. `callback` a function that is called with the grid data as an argument

_Returns_: the L.mapbox.gridLayer object

## L.mapbox.markerLayer(id: string | url: string | tilejson: object, [options: object])

`L.mapbox.markerLayer` provides an easy way to integrate [GeoJSON](http://www.geojson.org/)
from MapBox and elsewhere into your map.

_Arguments_:

1. required and must be:

* An `id` string `examples.map-foo`
* A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`
* A GeoJSON object, from your own Javascript code

The second argument is optional. If provided, it is the same options
as provided to [L.FeatureGroup](http://leafletjs.com/reference.html#featuregroup), as
well as:

* `filter`: A function that accepts a feature object and returns `true` or `false`
  to indicate whether it should be displayed on the map. This can be changed
  later using `setFilter`.
* `sanitizer`: A function that accepts a string containing tooltip data, and returns a
  sanitized result for HTML display. The default will remove dangerous script content,
  and is recommended.

_Example_:

    var markerLayer = L.mapbox.markerLayer(geojson)
        .addTo(map);

_Returns_ a `L.mapbox.markerLayer` object.

### markerLayer.loadURL(url: string)

Load GeoJSON data for this layer from the URL given by `url`.

_Arguments_:

1. `string` a URL referencing a GeoJSON resource

_Example_:

    var markerLayer = L.mapbox.markerLayer()
        .addTo(map);

    markerLayer.loadURL('my_local_markers.geojson');

_Returns_: the layer object

### markerLayer.loadID(id: string)

Load marker GeoJSON data from a map with the given `id` on MapBox.

_Arguments_:

1. `string` a map id

_Example_:

    var markerLayer = L.mapbox.markerLayer()
        .addTo(map);

    // loads markers from the map `examples.map-0l53fhk2` on MapBox,
    // if that map has markers
    markerLayer.loadID('examples.map-0l53fhk2');

_Returns_: the layer object

### markerLayer.setFilter(filter: function)

Sets the filter function for this data layer.

_Arguments_:

1. a function that takes GeoJSON features and
  returns true to show and false to hide features.

_Example_:

    var markerLayer = L.mapbox.markerLayer(geojson)
        // hide all markers
        .setFilter(function() { return false; })
        .addTo(map);

_Returns_ the markerLayer object.

### markerLayer.getFilter()

Gets the filter function for this data layer.

_Arguments_: none

_Example_:

    var markerLayer = L.mapbox.markerLayer(geojson)
        // hide all markers
        .setFilter(function() { return false; })
        .addTo(map);

    // get the filter function
    var fn = markerLayer.getFilter()

_Returns_ the filter function.

### markerLayer.setGeoJSON(geojson: object)

Set the contents of a markers layer: run the provided
features through the filter function and then through the factory function to create elements
for the map. If the layer already has features, they are replaced with the new features.
An empty array will clear the layer of all features.

_Arguments:_

* `features`, an array of [GeoJSON feature objects](http://geojson.org/geojson-spec.html#feature-objects),
  or omitted to get the current value.

_Example_:

    var markerLayer = L.mapbox.markerLayer(geojson)
        .addTo(map);
    // a simple GeoJSON featureset with a single point
    // with no properties
    markerLayer.setGeoJSON({
        type: "FeatureCollection",
        features: [{
            type: "Feature",
            geometry: {
                type: "Point",
                coordinates: [102.0, 0.5]
            },
            properties: { }
        }]
    });

_Returns_ the markerLayer object

### markerLayer.getGeoJSON()

Get the contents of this layer as GeoJSON data.

_Arguments:_ none

_Returns_ the GeoJSON represented by this layer

# Geocoding

## L.mapbox.geocoder(id: string | url: string)

A low-level interface to geocoding, useful for more complex uses and
reverse geocoding.

1. (required) must be:

* An `id` string `examples.map-foo`
* A URL `string` that points to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`

_Returns_ a `L.mapbox.geocoder` object.

### geocoder.query(queryString: string, callback: function)

Queries the geocoder with a query string, and returns its result, if any.

_Arguments_:

1. (required) a query, expressed as a string, like 'Arkansas'
2. (required) a callback

The callback is called with arguments

1. An error, if any
2. The result. This is an object with the following members:

        { results: // raw results
        latlng: // a map-friendly latlng array
        bounds: // geojson-style bounds of the first result
        lbounds: // leaflet-style bounds of the first result
        }

_Returns_: the geocoder object. The return value of this function is not useful - you must use a callback to get results.

### geocoder.reverseQuery(location: object, callback: function)

Queries the geocoder with a location, and returns its result, if any.

_Arguments_:

1. (required) a query, expressed as an object:

         [lon, lat] // an array of lon, lat
         { lat: 0, lon: 0 } // a lon, lat object
         { lat: 0, lng: 0 } // a lng, lat object

The first argument can also be an array of objects in that
form to geocode more than one item.

2. (required) a callback

The callback is called with arguments

1. An error, if any
2. The result. This is an object of the raw result from MapBox.

_Returns_: the geocoder object. The return value of this function is not useful - you must use a callback to get results.

# Controls

## L.mapbox.legendControl(options: object)

A map control that shows legends added to maps in MapBox. Legends are auto-detected from active layers.

_Arguments_:

1. (optional) an options object. Beyond the default options for map controls,
   this object has one special parameter:

* `sanitizer`: A function that accepts a string containing legend data, and returns a
  sanitized result for HTML display. The default will remove dangerous script content,
  and is recommended.

_Example_:

    var map = L.mapbox.map('map').setView([38, -77], 5);
    map.addControl(L.mapbox.legendControl());

_Returns_: a `L.mapbox.legendControl` object.

## L.mapbox.gridControl(layer L.mapbox.gridLayer, options: object)

Interaction is what we call interactive parts of maps that are created with
the powerful [tooltips & regions system](http://mapbox.com/tilemill/docs/crashcourse/tooltips/)
in [TileMill](http://mapbox.com/tilemill/). Under the hood, it's powered by
the [open UTFGrid specification.](https://github.com/mapbox/utfgrid-spec).

_Arguments_:

* The first argument must be a layer created with `L.mapbox.gridLayer()`
* The second argument can be an options object. Valid options are:

* `sanitizer`: A function that accepts a string containing interactivity data, and returns a
  sanitized result for HTML display. The default will remove dangerous script content,
  and is recommended.
* `template`: A string in the [Mustache](http://mustache.github.io/) template
  language that will be evaluated with data from the grid to produce HTML for the
  interaction.
* `follow`: Whether the tooltip should follow the mouse in a constant
  relative position, or should be fixed in the top-right side of the map.
  By default, this is `false` and the tooltip is stationary.
* `pinnable`: Whether clicking will 'pin' the tooltip open and expose a
  'close' button for the user to close the tooltip. By default, this is `true`.
* `touchTeaser`: On touch devices, show the `teaser` formatter if there is
  no output from the `full` formatter. By default, this is `true`.
* `location`: Evaluate the `location` formatter on click events, and if it
  provides output, navigate to that location. By default, this is `true`.

_Example_:

    var map = L.mapbox.map('map').setView([38, -77], 5);
    var gridLayer = L.mapbox.gridLayer('examples.map-8ced9urs');
    map.addLayer(L.mapbox.tileLayer('examples.map-8ced9urs'));
    map.addLayer(gridLayer);
    map.addControl(L.mapbox.gridControl(gridLayer));

_Returns_: a `L.mapbox.gridControl` object.

## L.mapbox.geocoderControl(id: string | url: string)

Adds geocoder functionality as well as a UI element to a map. This uses
the [MapBox Geocoding API](http://mapbox.com/developers/api/#geocoding).

This function is currently in private beta:
[contact MapBox](http://mapbox.com/about/contact/) before using this functionality.

_Arguments_:

1. (required) either:

* An `id` string `examples.map-foo`
* A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`

_Example_

    var map = L.map('map')
        .setView([37, -77], 5)
        .addControl(L.mapbox.geocoderControl('examples.map-vyofok3q'));

_Returns_ a `L.mapbox.geocoderControl` object.

### geocoderControl.setURL(url: string)

Set the url used for geocoding.

_Arguments_:

1. a geocoding url

_Returns_: the geocoder control object

### geocoderControl.setID(id: string)

Set the map id used for geocoding.

_Arguments_:

1. a map id to geocode from

_Returns_: the geocoder control object

### geocoderControl.setTileJSON(tilejson: object)

Set the TileJSON used for geocoding.

_Arguments_:

1. A TileJSON object

_Returns_: the geocoder object

### geocoderControl.on(event: string, callback: function)

Bind a listener to an event emitted by the geocoder control. Supported
additional events are

* `found`: success in finding a location. Called with a single argument,
  the result.
* `error`: failure to find a location. Called with the raw HTTP error from
  MapBox.

## L.mapbox.shareControl(id: string | url: string, options: object)

Adds a "Share" button to the map, which can be used to share the map to Twitter
or Facebook, or generate HTML for a map embed.

_Arguments_:

1. (optional) either:

* An `id` string `examples.map-foo`
* A URL to TileJSON, like `http://a.tiles.mapbox.com/v3/examples.map-0l53fhk2.json`

  If not supplied, the TileJSON from the map is used.

2. (optional) Options for [L.Control](http://leafletjs.com/reference.html#control).

Also accepts the following options:

* `url`: the URL of a page to which the share control will link instead of the URL
  of the current page or that specified in TileJSON data.

_Example_

    var map = L.map('map', 'examples.map-vyofok3q')
        .setView([37, -77], 5)
        .addControl(L.mapbox.shareControl());

_Returns_ a `L.mapbox.shareControl` object.

# Markers

## L.mapbox.marker.icon(feature: object)

A core icon generator used in `L.mapbox.marker.style`

_Arguments_:

1. A properties object from a GeoJSON feature object

_Returns_:

A `L.Icon` object with custom settings for `iconUrl`, `iconSize`, `iconAnchor`,
and `popupAnchor`.

## L.mapbox.marker.style(feature: object, latlon: object)

An icon generator for use in conjunction with `pointToLayer` to generate
markers from the [MapBox Markers API](http://mapbox.com/developers/api/#markers)
and support the [simplestyle-spec](https://github.com/mapbox/simplestyle-spec) for
features.

_Arguments_:

1. A GeoJSON feature object
2. The latitude, longitude position of the marker

_Examples_:

    L.geoJson(geoJson, {
        pointToLayer: L.mapbox.marker.style,
    });

_Returns_:

A `L.Marker` object with the latitude, longitude position and a styled marker

# Utility

## L.mapbox.sanitize(text: string)

A HTML sanitization function, with the same effect as the default value
of the `sanitizer` option of `L.mapbox.markerLayer`, `L.mapbox.gridControl`,
and `L.mapbox.legendControl`.

## L.mapbox.template(template: string, data: object)

A [mustache](http://mustache.github.io/) template rendering function, as used
by the templating feature provided by `L.mapbox.gridControl`.

_Example_:

    var output = L.mapbox.template('Name: {{name}}', {name: 'John'});
    // output is "Name: John"

# Theming

## Dark theme

Mapbox.js implements a simple, light style on all interaction elements. A dark theme
is available by applying `class="dark"` to the map div.

_Example_:

    <div id="map" class="dark"></div>

