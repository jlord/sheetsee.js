describe('grid', function () {
    it('returns data for a given coordinate', function () {
        var grid = private.grid(helpers.gridJson);
        expect(grid(63, 0)).to.eql({admin: "Spain"});
    });

    it('returns undefined where there is no data', function () {
        var grid = private.grid(helpers.gridJson);
        expect(grid(0, 0)).to.be(undefined);
    });
});
