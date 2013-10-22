describe('L.mapbox.markerLayer', function() {
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    it('loads data from a GeoJSON source', function() {
        var layer = L.mapbox.markerLayer(helpers.geoJson),
            marker = layer.getLayers()[0];
        expect(marker instanceof L.Marker).to.equal(true);
        expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
    });

    it('loads data from a GeoJSON URL', function() {
        var url = 'http://api.tiles.mapbox.com/v3/examples.map-zr0njcqy/markers.geojson',
            layer = L.mapbox.markerLayer(url);

        server.respondWith("GET", url,
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geoJson)]);
        server.respond();

        var marker = layer.getLayers()[0];
        expect(marker instanceof L.Marker).to.equal(true);
        expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
    });

    it('loads data for a map ID', function() {
        var id = 'examples.map-zr0njcqy',
            url = 'http://a.tiles.mapbox.com/v3/examples.map-zr0njcqy/markers.geojson',
            layer = L.mapbox.markerLayer(id);

        server.respondWith("GET", url,
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geoJson)]);
        server.respond();

        var marker = layer.getLayers()[0];
        expect(marker instanceof L.Marker).to.equal(true);
        expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
    });

    it('replaces jsonp URLs with the equivalent json URL', function() {
        var url = 'http://api.tiles.mapbox.com/v3/examples.map-zr0njcqy/markers.geojson',
            layer = L.mapbox.markerLayer(url + 'p');

        server.respondWith("GET", url,
            [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geoJson)]);
        server.respond();

        var marker = layer.getLayers()[0];
        expect(marker instanceof L.Marker).to.equal(true);
        expect(marker.getLatLng()).to.be.near({lng: -77.0203, lat: 38.8995}, 0);
    });

    describe("#loadURL", function() {
        it('returns self', function() {
            var layer = L.mapbox.markerLayer();
            expect(layer.loadURL('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json')).to.eql(layer);
        });

        it('emits a ready event', function(done) {
            var layer = L.mapbox.markerLayer();

            layer.on('ready', function() {
                done();
            });

            layer.loadURL('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json');

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.geoJson)]);
            server.respond();
        });

        it('emits an error event', function(done) {
            var layer = L.mapbox.markerLayer();

            layer.on('error', function(e) {
                expect(this).to.equal(layer);
                expect(e.error.status).to.equal(400);
                done();
            });

            layer.loadURL('http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json');

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/mapbox.map-0l53fhk2.json",
                [400, { "Content-Type": "application/json" }, JSON.stringify({error: 'error'})]);
            server.respond();
        });
    });

    describe("#setGeoJSON", function() {
        it("sets GeoJSON", function() {
            var layer = L.mapbox.markerLayer();
            layer.setGeoJSON(helpers.geoJson);
            expect(layer.getGeoJSON()).to.eql(helpers.geoJson);
        });

        it("removes existing layers", function() {
            var layer = L.mapbox.markerLayer(helpers.geoJson);
            layer.setGeoJSON([]);
            expect(layer.getLayers()).to.be.empty();
        })
    });

    describe("#getFilter", function() {
        it("returns the filter option when not given an argument", function() {
            var filter = function () {},
                layer = L.mapbox.markerLayer(null, {filter: filter});
            expect(layer.getFilter()).to.equal(filter);
        });
    });

    describe("#setFilter", function() {
        it("filters features to those for which the function returns true", function() {
            var layer = L.mapbox.markerLayer(helpers.geoJson);

            var fooFilter = function (f) { return f.properties.title === 'foo'; };
            expect(layer.setFilter(fooFilter)).to.eql(layer);
            expect(layer.getFilter()).to.eql(fooFilter);
            expect(layer.getLayers().length).to.equal(1);

            layer.setFilter(function (f) { return f.properties.title !== 'foo'; });
            expect(layer.getLayers().length).to.equal(0);
        });
    });

    var unsanitary = {
        type: 'Feature',
        properties: {
            title: '<script></script>',
            description: '<script></script>'
        },
        geometry: {
            type: 'Point',
            coordinates: [0, 0]
        }
    };

    it('sanitizes marker content', function() {
        var layer = L.mapbox.markerLayer(unsanitary);

        expect(layer.getLayers()[0]._popup._content).not.to.match(/<script>/);
    });

    it('supports a custom sanitizer', function() {
        var layer = L.mapbox.markerLayer(unsanitary, {
            sanitizer: function(_) { return _; }
        });

        expect(layer.getLayers()[0]._popup._content).to.match(/<script>/);
    });
});
