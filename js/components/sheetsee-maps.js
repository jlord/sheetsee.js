var mapbox = require('mapbox.js')

module.exports = {
  buildOptionObject: function(optionsJSON, lineItem) {
    var newObj = {}
    optionsJSON.forEach(function(option) {
      newObj[option] = lineItem[option]
    })
    return newObj
  },

  // for geocoding: http://mapbox.com/tilemill/docs/guides/google-docs/#geocoding
  // create geoJSON from your spreadsheet's coordinates
  createGeoJSON: function(data, optionsJSON) {
    var geoJSON = []
    data.forEach(function(lineItem){
      // skip if there are no coords
      if (!lineItem.long || !lineItem.lat) return
      if (optionsJSON) var optionObj = Sheetsee.buildOptionObject(optionsJSON, lineItem)
      var feature = {
        type: 'Feature',
        "geometry": {"type": "Point", "coordinates": [lineItem.long, lineItem.lat]},
        "properties": {
          "marker-size": "small",
          "marker-color": lineItem.hexcolor
        },
        "opts": optionObj,
      }
      geoJSON.push(feature)
    })
    return geoJSON
  },

  // load basic map with tiles
  loadMap: function(mapDiv) {
    var map = L.mapbox.map(mapDiv)
    // map.setView(, 4)
    // map.addLayer(L.tileLayer('http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png'))
    map.touchZoom.disable()
    map.doubleClickZoom.disable()
    map.scrollWheelZoom.disable()
    return map
  },

  addTileLayer: function(map, tileLayer) {
   var layer = L.mapbox.tileLayer(tileLayer)
   layer.addTo(map) 
  },

  addMarkerLayer: function(geoJSON, map, zoomLevel) {
    var viewCoords = [geoJSON[0].geometry.coordinates[1], geoJSON[0].geometry.coordinates[0]]
    var markerLayer = L.mapbox.markerLayer(geoJSON)
    markerLayer.setGeoJSON(geoJSON)
    map.setView(viewCoords, zoomLevel)
    // map.fitBounds(geoJSON)
    markerLayer.addTo(map)
    return markerLayer
  }

  // moved to be used on the .html page for now
  // until I find a better way for users to pass in their
  // customized popup html styles
  // function addPopups(map, markerLayer, popupContent) {
  //   markerLayer.on('click', function(e) {
  //     var feature = e.layer.feature
  //     var popupContent = '<h2>' + feature.opts.city + '</h2>' +
  //                         '<h3>' + feature.opts.placename + '</h3>'
  //     e.layer.bindPopup(popupContent,{closeButton: false,})
  //   })
  // }
}