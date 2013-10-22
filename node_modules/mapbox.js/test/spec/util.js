describe("util", function() {
    describe('#lbounds', function() {
        it('generates a L.LLatLngBounds object', function() {
            expect(private.util.lbounds([0, 1, 2, 3])).to.be.a(L.LatLngBounds);
        });
    });

    describe('#strict', function() {
        it('throws an error on object/string', function() {
            expect(function() {
                private.util.strict({}, 'string');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: string expected');
            });
            expect(function() {
                private.util.strict('foo', 'object');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: object expected');
            });
        });
        it('throws an error on string/number', function() {
            expect(function() {
                private.util.strict(5, 'string');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: string expected');
            });
            expect(function() {
                private.util.strict('5', 'number');
            }).to.throwException(function(e) {
                expect(e.message).to.eql('Invalid argument: number expected');
            });
        });
    });
});
