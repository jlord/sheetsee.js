describe('L.mapbox.shareControl', function() {

    var map, element;

    beforeEach(function() {
        element = document.createElement('div');
        document.body.appendChild(element);
        element.style.width = '256px';
        element.style.height = '256px';
        map = L.mapbox.map(element);
    });

    afterEach(function() {
        element.parentNode.removeChild(element);
    });

    it('can be constructed', function() {
        expect(L.mapbox.shareControl()).to.be.ok();
    });

    it('can be added to a map', function() {
        var shareControl = L.mapbox.shareControl();
        expect(shareControl.addTo(map)).to.eql(shareControl);
    });

    it('adds its element to a map', function() {
        var shareControl = L.mapbox.shareControl();
        expect(shareControl.addTo(map)).to.eql(shareControl);
        expect(element
            .getElementsByClassName('leaflet-control-mapbox-share').length)
                .to.eql(1);
    });

    it('shows a share dialog when clicked', function() {
        map.setView([0,0],0);
        var shareControl = L.mapbox.shareControl();
        expect(shareControl.addTo(map)).to.eql(shareControl);

        happen.click(element
            .getElementsByClassName('mapbox-share')[0]);

        expect(element
            .getElementsByClassName('mapbox-share-popup').length)
                .to.eql(1);
    });

    it('can accept a custom url', function() {
        map.setView([0,0],0);
        var shareControl = L.mapbox.shareControl(null, { url: 'foobar' });
        expect(shareControl.addTo(map)).to.eql(shareControl);

        happen.click(element
            .getElementsByClassName('mapbox-share')[0]);

        expect(element
            .getElementsByClassName('mapbox-share-popup')[0].innerHTML)
                .to.contain('foobar');
    });
});
