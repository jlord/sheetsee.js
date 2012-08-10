var map
var defaultZoom = 13

function loadMap() {
 	map = new L.Map('map');
	var cloudmade = new L.TileLayer('http://tile.stamen.com/toner/{z}/{x}/{y}.png', {
	    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
	    maxZoom: 18
	});
 map.addLayer(cloudmade);
}

function displayAddress(data) {
	var markerLocation = new L.LatLng(data.lat, data.long);
	setCenter(markerLocation)
	var marker = new L.Marker(markerLocation);
	map.addLayer(marker);
}
	
function setCenter(markerLocation) {
	map.setView(markerLocation, defaultZoom)
}	

document.addEventListener('DOMContentLoaded', runWebsite)

function runWebsite() {
  loadMap()
  var public_spreadsheet_url = 'https://docs.google.com/spreadsheet/pub?key=0Aj3c4mZCQQaMdGE2TVphOWlXMUMyclRXa2Z1c0g5MGc&single=true&gid=1&output=html';

  Tabletop.init( { key: public_spreadsheet_url,
                   callback: showInfo,
                   simpleSheet: true } )

  function showInfo(data, tabletop) {
    data.forEach(displayAddress)      
  }
}