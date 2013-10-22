describe("url", function() {
    describe('#base', function() {
        it("returns 'http://a.tiles.mapbox.com/v3/'", function() {
            expect(private.url.base()).to.equal('http://a.tiles.mapbox.com/v3/');
        });

        it("returns a subdomain based on the number", function() {
            expect(private.url.base(1)).to.equal('http://b.tiles.mapbox.com/v3/');
            expect(private.url.base(6)).to.equal('http://c.tiles.mapbox.com/v3/');
        });
    });
    describe('#secureFlag', function() {
        it('adds a json flag to urls when the page is secure', function() {
            private.url.isSSL = function() { return true; };
            expect(private.url.secureFlag('foo')).to.equal('foo?secure');
            expect(private.url.secureFlag('foo?foo=bar')).to.equal('foo?foo=bar&secure');
        });
        it('does not add an ssl flag when pages are not ssl', function() {
            private.url.isSSL = function() { return false; };
            expect(private.url.secureFlag('foo')).to.equal('foo');
            expect(private.url.secureFlag('foo?foo=bar')).to.equal('foo?foo=bar');
        });
    });
});
