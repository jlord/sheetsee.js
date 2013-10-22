var test = require('tape'),
    xhr = require('../');

var response = '{"attribution":"GTOPO30","bounds":[-146.9531,37.1603,-95.2734,70.7869],"center":[-115.8398,52.0525,3],"description":"","download":"http://a.tiles.mapbox.com/v3/tmcw.dem.mbtiles","filesize":575362048,"id":"tmcw.dem","legend":null,"maxzoom":10,"minzoom":0,"name":"Northwest Elevation","scheme":"xyz","tilejson":"2.0.0","tiles":["http://a.tiles.mapbox.com/v3/tmcw.dem/{z}/{x}/{y}.png","http://b.tiles.mapbox.com/v3/tmcw.dem/{z}/{x}/{y}.png","http://c.tiles.mapbox.com/v3/tmcw.dem/{z}/{x}/{y}.png","http://d.tiles.mapbox.com/v3/tmcw.dem/{z}/{x}/{y}.png"],"version":"1.0.0","webpage":"http://tiles.mapbox.com/tmcw/map/dem"}';

test('loading a tileset', function (t) {
    t.plan(2);
    xhr('http://b.tiles.mapbox.com/v3/tmcw.dem.json', function(err, resp) {
        t.equal(err, null);
        t.equal(resp.responseText, response);
    }, true);
});

test('loading a grid', function (t) {
    t.plan(2);
    xhr('http://b.tiles.mapbox.com/v3/tmcw.kathmandu/13/6037/3439.grid.json', function(err, resp) {
        t.equal(err, null);
        t.equal(resp.responseText.length, 15263);
    }, true);
});

test('handling a 404', function (t) {
    t.plan(2);
    xhr('http://b.tiles.mapbox.com/v3/foo.bar.json', function(err, resp) {
        t.equal(err.status, 404);
        t.equal(resp, null);
    }, true);
});

test('handling a DNS error', function (t) {
    t.plan(2);
    xhr('http://btiles.mapbox.com/v3/tmcw.dem.json', function(err, resp) {
        t.equal(err.type, 'error');
        t.equal(resp, null);
    }, true);
});
