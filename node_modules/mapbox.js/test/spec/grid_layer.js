describe('L.mapbox.gridLayer', function() {
    var server, element, map;

    var grid = {
        grid: [],
        keys: ["", "1"],
        data: {"1": "data"}
    };

    for (var i = 0; i < 32; i++) {
        grid.grid[i] = "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
    }

    for (; i < 64; i++) {
        grid.grid[i] = "                                                                "
    }

    beforeEach(function() {
        server = sinon.fakeServer.create();
        element = document.createElement('div');
        document.body.appendChild(element);
        element.style.width = '256px';
        element.style.height = '256px';
        map = L.mapbox.map(element);
    });

    afterEach(function() {
        element.parentNode.removeChild(element);
        server.restore();
    });

    describe('constructor', function() {
        it('is initialized', function() {
            var layer = L.mapbox.gridLayer();
            expect(layer).to.be.ok();
        });

        it('is initialized with tilejson', function() {
            var layer = L.mapbox.gridLayer(helpers.tileJSON);
            expect(layer).to.be.ok();
            expect(layer.getTileJSON()).to.be.eql(helpers.tileJSON);
        });

        it('loads TileJSON from a URL', function(done) {
            var layer = L.mapbox.gridLayer('http://a.tiles.mapbox.com/v3/L.mapbox.map-0l53fhk2.json');

            layer.on('ready', function() {
                expect(this).to.equal(layer);
                expect(layer.getTileJSON()).to.eql(helpers.tileJSON);
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/L.mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });

        it('loads TileJSON from an ID', function(done) {
            var layer = L.mapbox.gridLayer('L.mapbox.map-0l53fhk2');

            layer.on('ready', function() {
                expect(this).to.equal(layer);
                expect(layer.getTileJSON()).to.eql(helpers.tileJSON);
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/L.mapbox.map-0l53fhk2.json",
                [200, { "Content-Type": "application/json" }, JSON.stringify(helpers.tileJSON)]);
            server.respond();
        });

        it('emits an error event', function(done) {
            var layer = L.mapbox.gridLayer('L.mapbox.map-0l53fhk2');

            layer.on('error', function(e) {
                expect(this).to.equal(layer);
                expect(e.error.status).to.equal(400);
                done();
            });

            server.respondWith("GET", "http://a.tiles.mapbox.com/v3/L.mapbox.map-0l53fhk2.json",
                [400, { "Content-Type": "application/json" }, JSON.stringify({error: 'foo'})]);
            server.respond();
        });
    });

    describe('#getTileJSON', function() {
        it('is by default empty', function() {
            var layer = L.mapbox.gridLayer();
            expect(layer.getTileJSON()).to.eql({});
        });
    });

    describe('#getData', function() {
        var layer;

        beforeEach(function() {
            map.setView([0, 0], 0);

            layer = L.mapbox.gridLayer({grids: ['{z}/{x}/{y}']})
                .addTo(map);
        });

        it('calls the callback (data already loaded)', function(done) {
            server.respondWith('GET', '0/0/0',
                [200, { "Content-Type": "application/json" }, JSON.stringify(grid)]);
            server.respond();

            expect(layer.getData(L.latLng(1, 0), function(data) {
                expect(data).to.equal('data');
                done();
            })).to.eql(layer);
        });

        it('calls the callback (data pending)', function(done) {
            layer.getData(L.latLng(1, 0), function(data) {
                expect(data).to.equal('data');
                done();
            });

            server.respondWith('GET', '0/0/0',
                [200, { "Content-Type": "application/json" }, JSON.stringify(grid)]);
            server.respond();
        });

        it('calls the callback (undefined data)', function(done) {
            server.respondWith('GET', '0/0/0',
                [200, { "Content-Type": "application/json" }, JSON.stringify(grid)]);
            server.respond();

            layer.getData(L.latLng(-1, 0), function(data) {
                expect(data).to.equal(undefined);
                done();
            });
        });
    });

    describe('tile loading', function() {
        function requestURLs() {
            return server.requests.map(function(request) {
                return request.url;
            });
        }

        it('requests tiles for the current view', function() {
            map.setView([0, 0], 0);

            L.mapbox.gridLayer({grids: ['{z}/{x}/{y}']})
                .addTo(map);

            expect(requestURLs()).to.eql(['0/0/0']);
        });

        it('requests no tiles for zooms less than the minimum', function() {
            map.setView([0, 0], 0);

            L.mapbox.gridLayer({grids: ['{z}/{x}/{y}'], minzoom: 1})
                .addTo(map);

            expect(requestURLs()).to.eql([]);
        });

        it('requests no tiles for zooms greater than the maximum', function() {
            map.setView([0, 0], 15);

            L.mapbox.gridLayer({grids: ['{z}/{x}/{y}'], maxzoom: 14})
                .addTo(map);

            expect(requestURLs()).to.eql([]);
        });

        it('requests no tiles outside of bounds', function() {
            map.setView([0, 0], 10);

            L.mapbox.gridLayer({grids: ['{z}/{x}/{y}'], bounds: [-10,-10,-5,-5]})
                .addTo(map);

            expect(requestURLs()).to.eql([]);
        });
    });

    describe('events', function() {
        var layer;

        beforeEach(function() {
            map.setView([0, 0], 0);

            layer = L.mapbox.gridLayer({grids: ['{z}/{x}/{y}']})
                .addTo(map);

            server.respondWith('GET', '0/0/0',
                [200, { "Content-Type": "application/json" }, JSON.stringify(grid)]);
            server.respond();
        });

        it('emits click when an area with data is clicked', function(done) {
            layer.on('click', function(e) {
                expect(e.data).to.equal("data");
                done();
            });

            map.fire('click', {latlng: L.latLng(1, 0)});
        });

        it('emits click with undefined data when an area without data is clicked', function(done) {
            layer.on('click', function(e) {
                expect(e.data).to.equal(undefined);
                done();
            });

            map.fire('click', {latlng: L.latLng(-1, 0)});
        });

        it('emits mouseover when entering an area with data', function(done) {
            layer.on('mouseover', function(e) {
                expect(e.data).to.equal("data");
                done();
            });

            map.fire('mousemove', {latlng: L.latLng(1, 0)});
        });

        it('emits no repetitive mouseover events', function() {
            var calls = 0;

            layer.on('mouseover', function(e) {
                calls += 1;
            });

            map.fire('mousemove', {latlng: L.latLng(1, 0)});
            map.fire('mousemove', {latlng: L.latLng(1, 0)});

            expect(calls).to.equal(1);
        });

        it('emits mousemove when moving in an area with data', function(done) {
            layer.on('mousemove', function(e) {
                expect(e.data).to.equal("data");
                done();
            });

            map.fire('mousemove', {latlng: L.latLng(1, 0)});
            map.fire('mousemove', {latlng: L.latLng(1, 0)});
        });

        it('emits mouseout when exiting an area with data', function(done) {
            layer.on('mouseout', function(e) {
                expect(e.data).to.equal("data");
                done();
            });

            map.fire('mousemove', {latlng: L.latLng(1, 0)});
            map.fire('mousemove', {latlng: L.latLng(-1, 0)});
        });

        it('emits no mouseout for dataless areas', function() {
            var calls = 0;

            layer.on('mouseout', function(e) {
                calls += 1;
            });

            map.fire('mousemove', {latlng: L.latLng(-1, 0)});
            map.fire('mousemove', {latlng: L.latLng(1, 0)});
        });
    })
});
