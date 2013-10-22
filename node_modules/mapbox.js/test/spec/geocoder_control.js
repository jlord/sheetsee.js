describe('L.mapbox.geocoderControl', function() {
    var server;

    beforeEach(function() {
        server = sinon.fakeServer.create();
    });

    afterEach(function() {
        server.restore();
    });

    var json = {
        "query": ["austin"],
        "results": [[{
            "bounds": [-97.9383829999999, 30.098659, -97.5614889999999, 30.516863],
            "lat": 30.3071816,
            "lon": -97.7559964,
            "name": "Austin",
            "score": 600000790107194.8,
            "type": "city",
            "id": "mapbox-places.4201"
        }]]};

    it('performs forward geolocation, centering the map on the first result', function() {
        var map = new L.Map(document.createElement('div')),
            control = L.mapbox.geocoderControl('http://api.tiles.mapbox.com/v3/examples.map-vyofok3q/geocode/{query}.json').addTo(map);

        server.respondWith('GET',
            'http://api.tiles.mapbox.com/v3/examples.map-vyofok3q/geocode/austin.json',
            [200, { "Content-Type": "application/json" }, JSON.stringify(json)]);

        control._input.value = 'austin';
        happen.once(control._form, { type: 'submit' });
        server.respond();

        expect(map.getCenter()).to.be.near({lat: 30.3, lng: -97.7}, 1e-1);
    });

    it('sets url based on an id', function() {
        var control = L.mapbox.geocoderControl('examples.map-vyofok3q');
        expect(control.getURL()).to.equal('http://a.tiles.mapbox.com/v3/examples.map-vyofok3q/geocode/{query}.json');
    });

    it('#setURL', function() {
        var control = L.mapbox.geocoderControl('examples.map-vyofok3q');
        control.setURL('foo/{query}.json');
        expect(control.getURL()).to.equal('foo/{query}.json');
    });

    it('#setID', function() {
        var control = L.mapbox.geocoderControl('examples.map-vyofok3q');
        expect(control.setID('foobar')).to.eql(control);
        expect(control.getURL()).to.equal('http://a.tiles.mapbox.com/v3/foobar/geocode/{query}.json');
    });

    it('#getID', function() {
        var control = L.mapbox.geocoderControl('examples.map-vyofok3q');
        expect(control.getURL()).to.equal('http://a.tiles.mapbox.com/v3/examples.map-vyofok3q/geocode/{query}.json');
        expect(control.setID('foobar')).to.eql(control);
        expect(control.getURL()).to.equal('http://a.tiles.mapbox.com/v3/foobar/geocode/{query}.json');
    });

    describe('events', function() {
        var map, control;

        beforeEach(function() {
            map = new L.Map(document.createElement('div'));
            control = L.mapbox.geocoderControl('http://example.com/{query}.json').addTo(map);
        });

        it('emits a "found" event when geocoding succeeds', function(done) {
            control.on('found', function(result) {
                expect(result.latlng).to.eql([30.3071816, -97.7559964]);
                done();
            });

            control._input.value = 'austin';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/austin.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify(json)]);
            server.respond();
        });

        it('emits an "error" event when geocoding fails', function(done) {
            control.on('error', function(e) {
                expect(e.error.status).to.eql(400);
                done();
            });

            control._input.value = 'austin';
            happen.once(control._form, { type: 'submit' });

            server.respondWith('GET', 'http://example.com/austin.json',
                [400, { "Content-Type": "application/json" }, JSON.stringify(json)]);
            server.respond();
        });
    });
});
