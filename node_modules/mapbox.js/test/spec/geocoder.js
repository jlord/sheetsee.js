describe('L.mapbox.geocoder', function() {
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

    var revJson = {
        "query":[-97.7,30.3],
        "results":[[{
            "bounds":[-97.9383829999999,30.098659,-97.5614889999999,30.516863],
            "lat":30.3071816,
            "lon":-97.7559964,
            "name":"Austin",
            "score":600000790107194.8,
            "type":"city",
            "id":"mapbox-places.4201"
        }]],"attribution":{"mapbox-places":"<a href='http://mapbox.com/about/maps' target='_blank'>Terms & Feedback</a>"}};

    describe('#setURL', function() {
        it('returns self', function() {
            var g = L.mapbox.geocoder();
            expect(g.setTileJSON(helpers.tileJSON)).to.eql(g);
        });

        it('sets URL', function() {
            var g = L.mapbox.geocoder();
            g.setURL('url');
            expect(g.getURL()).to.eql('url');
        });

        it('converts a jsonp URL', function() {
            var g = L.mapbox.geocoder();
            g.setURL('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.jsonp');
            expect(g.getURL()).to
                .eql('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.json');
        });
    });

    describe('#setTileJSON', function() {
        it('returns self', function() {
            var g = L.mapbox.geocoder();
            expect(g.setTileJSON(helpers.tileJSON)).to.eql(g);
        });

        it('validates its argument', function() {
            var g = L.mapbox.geocoder();
            expect(function() {
                g.setTileJSON('foo');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: object expected');
            });
        });

        it('sets URL based on geocoder property', function() {
            var g = L.mapbox.geocoder();
            g.setTileJSON({geocoder: 'http://example.com/geocode/{query}.json'});
            expect(g.getURL()).to.eql('http://example.com/geocode/{query}.json');
        });

        it('converts a jsonp URL', function() {
            var g = L.mapbox.geocoder();
            g.setTileJSON({geocoder: 'http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.jsonp'});
            expect(g.getURL()).to
                .eql('http://a.tiles.mapbox.com/v3/examples.map-8ced9urs/geocode/{query}.json');
        });
    });

    describe('#setID', function() {
        it('returns self', function() {
            var g = L.mapbox.geocoder();
            expect(g.setID('foo.bar')).to.eql(g);
        });

        it('sets URL', function() {
            var g = L.mapbox.geocoder();
            g.setID('foo.bar');
            expect(g.getURL()).to
                .eql('http://a.tiles.mapbox.com/v3/foo.bar/geocode/{query}.json');
        });
    });

    describe('#query', function() {
        it('performs forward geolocation', function() {
            var g = L.mapbox.geocoder('http://api.tiles.mapbox.com/v3/examples.map-vyofok3q/geocode/{query}.json');

            server.respondWith('GET',
                'http://api.tiles.mapbox.com/v3/examples.map-vyofok3q/geocode/austin.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify(json)]);

            g.query('austin', function(err, res) {
                expect(res.latlng).to.be.near({ lat: 30.3, lng: -97.7 }, 1e-1);
            });

            server.respond();
        });
    });

    describe('#reverseQuery', function() {
        it('performs reverse geolocation', function() {
            var g = L.mapbox.geocoder('http://api.tiles.mapbox.com/v3/examples.map-vyofok3q/geocode/{query}.json');

            server.respondWith('GET',
                'http://api.tiles.mapbox.com/v3/examples.map-vyofok3q/geocode/-97.7%2C30.3.json',
                [200, { "Content-Type": "application/json" }, JSON.stringify(revJson)]);

            g.reverseQuery({ lat: 30.3, lng: -97.7 }, function(err, res) {
                expect(res).to.eql(revJson);
            });

            server.respond();
        });
    });
});
