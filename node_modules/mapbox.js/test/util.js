var helpers = {};

// permissive test of leaflet-like location objects
expect.Assertion.prototype.near = function(expected, delta) {
    if (this.obj.lat !== undefined) {
        expect(this.obj.lat).to
            .be.within(expected.lat - delta, expected.lat + delta);
        expect(this.obj.lng).to
            .be.within(expected.lng - delta, expected.lng + delta);
    } else {
        expect(this.obj[0]).to
            .be.within(expected.lat - delta, expected.lat + delta);
        expect(this.obj[1]).to
            .be.within(expected.lng - delta, expected.lng + delta);
    }
};

helpers.tileJSON = {
    "attribution":"Data provided by NatureServe in collaboration with Robert Ridgely",
    "bounds":[-180,-85.0511,180,85.0511],
    "center":[-98.976,39.386,4],
    "data":["http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/markers.geojsonp"],
    "description":"Bird species of North America, gridded by species count.",
    "geocoder":"http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.jsonp",
    "grids":["http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.grid.json",
        "http://b.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.grid.json",
        "http://c.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.grid.json",
        "http://d.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.grid.json"],
    "id":"examples.map-8ced9urs",
    "maxzoom":17,
    "minzoom":0,
    "name":"Bird species",
    "private":true,
    "scheme":"xyz",
    "template":"{{#__l0__}}{{#__location__}}{{/__location__}}{{#__teaser__}}<div class='birds-tooltip'>\n  <strong>{{name}}</strong>\n  <strong>{{count}} species</strong>\n  <small>{{species}}</small>\n  <div class='carmen-fields' style='display:none'>\n  {{search}} {{lon}} {{lat}} {{bounds}}\n  </div>\n</div>\n<style type='text/css'>\n.birds-tooltip strong { display:block; font-size:16px; }\n.birds-tooltip small { font-size:10px; display:block; overflow:hidden; max-height:90px; line-height:15px; }\n</style>{{/__teaser__}}{{#__full__}}{{/__full__}}{{/__l0__}}",
    "tilejson":"2.0.0",
    "tiles":["http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.png",
        "http://b.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.png",
        "http://c.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.png",
        "http://d.tiles.mapbox.com/v3/examples.map-8ced9urs/{z}/{x}/{y}.png"],
    "webpage":"http://tiles.mapbox.com/examples/map/map-8ced9urs"
};

helpers.geoJson = {
    type: 'FeatureCollection',
    features: [{
        type: 'Feature',
        properties: {
            title: 'foo',
            'marker-color': '#f00',
            'marker-size': 'large'
        },
        geometry: {
            type: 'Point',
            coordinates: [-77.0203, 38.8995]
        }
    }]
};

helpers.gridJson = { "grid": [
    "                                                    !!!#########",
    "                                                    !!!#########",
    "                                                   !!!!#########",
    "                                                   !!!##########",
    "                        !!                         !!!##########",
    "                                                    !!!#########",
    "                                                    !!######### ",
    "                            !                      !!! #######  ",
    "                                                       ###      ",
    "                                                        $       ",
    "                                                        $$    %%",
    "                                                       $$$$$$$%%",
    "                                                       $$$$$$$%%",
    "                                                     $$$$$$$$$%%",
    "                                                    $$$$$$$$$$%%",
    "                                                   $$$$$$$$$$$$%",
    "                                                   $$$$$$$$$%%%%",
    "                                                  $$$$$$$$$%%%%%",
    "                                                  $$$$$$$$%%%%%%",
    "                                                  $$$$$$$%%%%%%%",
    "                                                  $$$$%%%%%%%%%%",
    "                                                 $$$$%%%%%%%%%%%",
    "                                        # # #  $$$$$%%%%%%%%%%%%",
    "                                             $$$$$$$%%%%%%%%%%%%",
    "                                             $$$&&&&'%%%%%%%%%%%",
    "                                            $$$$&&&&'''%%%%%%%%%",
    "                                           $$$$'''''''''%%%%%%%%",
    "                                           $$$$'''''''''''%%%%%%",
    "                                          $$$$&''''''''((((%%%%%",
    "                                          $$$&&''''''''(((((%%%%",
    "                                         $$$&&'''''''''(((((((%%",
    "                                         $$$&&''''''''''(((((((%",
    "                                        $$$&&&''''''''''((((((((",
    "                                        ''''''''''''''''((((((((",
    "                                         '''''''''''''''((((((((",
    "                                         '''''''''''''''((((((((",
    "                                         '''''''''''''''((((((((",
    "                                         '''''''''''''''((((((((",
    "                                         '''''''''''''''((((((((",
    "                            )            '''''''''''''''((((((((",
    "                                         ***'''''''''''''(((((((",
    "                                         *****'''''''''''(((((((",
    "                              ))        ******'''(((((((((((((((",
    "                                        *******(((((((((((((((++",
    "                                        *******(((((((((((((++++",
    "                                        ********((((((((((((++++",
    "                                        ***,,-**((((((((((++++++",
    "                                         ,,,,-------(((((+++++++",
    "                                         ,,---------(((((+++++.+",
    "                                            --------(((((+++....",
    "                                             -///----0000000....",
    "                                             ////----0000000....",
    "                                             /////1---0000000...",
    "                                              ///11--0000000....",
    "                                                111110000000....",
    "                                                 11110000000....",
    "                                                  1111000000....",
    "                                                    1100     .  ",
    "                                                                ",
    "                                                                ",
    "                                                                ",
    "                                                                ",
    "                                                                ",
    "                                                                " ],
    "keys": [ "",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16" ],
    "data": { "1": { "admin": "Portugal" },
        "2": { "admin": "Spain" },
        "3": { "admin": "Morocco" },
        "4": { "admin": "Algeria" },
        "5": { "admin": "Western Sahara" },
        "6": { "admin": "Mauritania" },
        "7": { "admin": "Mali" },
        "8": { "admin": "Cape Verde" },
        "9": { "admin": "Senegal" },
        "10": { "admin": "Burkina Faso" },
        "11": { "admin": "Guinea Bissau" },
        "12": { "admin": "Guinea" },
        "13": { "admin": "Ghana" },
        "14": { "admin": "Sierra Leone" },
        "15": { "admin": "Ivory Coast" },
        "16": { "admin": "Liberia" } }
};
