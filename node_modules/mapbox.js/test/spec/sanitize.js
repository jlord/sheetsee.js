describe('L.sanitize', function() {
    it('sanitizes a simple string', function() {
        expect(L.mapbox.sanitize('foo bar')).to.eql('foo bar');
    });

    it('sanitizes data urls', function() {
        expect(L.mapbox.sanitize('<a href="data:foo/bar">foo</a>'))
            .to.eql('<a>foo</a>');
    });

    it('permits http and https urls', function() {
        expect(L.mapbox.sanitize('<a href="http://example.com">foo</a>'))
            .to.eql('<a href="http://example.com">foo</a>');
        expect(L.mapbox.sanitize('<a href="https://example.com">foo</a>'))
            .to.eql('<a href="https://example.com">foo</a>');
    });

    it('does not sanitize image urls', function() {
        var png = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAAAeCAYAAADO4udXAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAHFSURBVHic7dpBbsIwEAXQoZpbwKKz8Bm66EFyjUicI1KuwUF6Ci/cBbmFJbqoLbluJezgMSn8JyGhJMRAvmZiw+5yuRBAay/3fgPwmBAsUIFggQoEC1QgWKACwQIVCBaoQLCgiIiMIjKWHo9gbVy4oJ/po9e42fPiUBERcemBxpiD935i5qO19ly6rzUR+SAics69a46zFc65WUSIKi9sA2MYN449O+fm0hcXVyzv/UREb977kzHmELeHUJ3Cvqn0fDfYhwfoi5WqKlREFRWLmY8hQPsQroGIKG4jooWZjzWDw3VJG4oXtnflWqU4WNbaszFmSMMVdsVQDdpt8NmkoYoVI2lPPY0iQjVVa1f774ak9cV2pBqqcE91rfUtre+57jGuiIxJgFa3oS0orljQxU03zGv8NeNzzr3eet6qipVVqyVs7toK43S7xYffmmwpoVulysPV4rstnhXmoWLmgZkH+g7YPp8twnOrXW74UZ2stecsXD2WG55F1Ur3Wtmss1mFrF1u+LUImswWp07LDcv1Q/6n3u1dc9ZZPSuExxErosa9HIIFKvAjNKhAsEAFggUqECxQgWCBCgQLVCBYoALBAhVfpi7sxwlEhWYAAAAASUVORK5CYII=';
        var html = '<img src="' + png + '">';
        expect(L.mapbox.sanitize(html)).to.eql(html);
    });
});
