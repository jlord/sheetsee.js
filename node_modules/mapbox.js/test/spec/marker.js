describe('L.mapbox.marker', function() {
    describe('#style', function() {
        it("produces a small marker", function() {
            var marker = L.mapbox.marker.style({
                properties: {
                    'marker-size': 'small'
                }
            });
            expect(marker.options.icon.options.iconUrl).to.contain('pin-s');
        });

        it("produces a medium marker", function() {
            var marker = L.mapbox.marker.style({
                properties: {
                    'marker-size': 'medium'
                }
            });
            expect(marker.options.icon.options.iconUrl).to.contain('pin-m');
        });

        it("produces a red marker", function() {
            var marker = L.mapbox.marker.style({
                properties: {
                    'marker-color': 'f00'
                }
            });
            expect(marker.options.icon.options.iconUrl).to.contain('f00');
        });

        it("sets a marker's title", function() {
            var marker = L.mapbox.marker.style({
                properties: {
                    title: 'test'
                }
            });
            expect(marker.options.title).to.equal('test');
        });

        it('integrates with leaflet', function() {
            expect(function() {
                L.geoJson(helpers.geoJson, {
                    pointToLayer: L.mapbox.marker.style
                });
            }).to.not.throwException();
        });
    });

    describe('#icon', function() {
        it("produces an icon", function() {
            var icon = L.mapbox.marker.icon({
                'marker-size': 'large'
            });
            expect(icon.options.iconUrl).to.contain('pin-l');
        });
    });

    describe('#createPopup', function() {
        it("returns an empty string for an undefined feature", function() {
            expect(L.mapbox.marker.createPopup({})).to.eql('');
            expect(L.mapbox.marker.createPopup({
                properties: { title: '' }
            })).to.eql('');
        });

        it("renders a title", function() {
            expect(L.mapbox.marker.createPopup({})).to.eql('');
            expect(L.mapbox.marker.createPopup({
                properties: { title: 'test' }
            })).to.eql('<div class="marker-title">test</div>');
        });

        it("renders a description", function() {
            expect(L.mapbox.marker.createPopup({})).to.eql('');
            expect(L.mapbox.marker.createPopup({
                properties: { description: 'test' }
            })).to.eql('<div class="marker-description">test</div>');
        });
    });
});
