describe("L.mapbox.gridControl", function() {
    var element, map, gridLayer;

    beforeEach(function() {
        element = document.createElement('div');
        map = L.mapbox.map(element);
        gridLayer = L.mapbox.gridLayer().addTo(map);
    });

    describe('mouseover data area', function() {
        it('adds map-clickable class to map container', function() {
            L.mapbox.gridControl(gridLayer).addTo(map);
            gridLayer.fire('mouseover', {data: 'data'});
            expect(element.className).to.match(/map-clickable/);
        });

        it('shows teaser content', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__teaser__}}Name: {{name}}{{/__teaser__}}'
            }).addTo(map);
            gridLayer.fire('mouseover', {data: {name: 'John'}});
            expect(control._contentWrapper.innerHTML).to.equal('Name: John');
        });

        it('does not show empty content', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: ''
            }).addTo(map);
            gridLayer.fire('mouseover', {data: {name: 'John'}});
            expect(control._container.style.display).to.equal('none');
            expect(control._contentWrapper.innerHTML).to.equal('');
        });

        it('does not change teaser content when pinned', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__teaser__}}Name: {{name}}{{/__teaser__}}'
            }).addTo(map);
            control._pinned = true;
            gridLayer.fire('mouseover', {data: {name: 'John'}});
            expect(control._contentWrapper.innerHTML).to.equal('');
        });
    });

    describe('location formatter', function() {
        it('navigates on click', function(done) {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__location__}}{{{name}}}{{/__location__}}'
            }).addTo(map);
            control._navigateTo = function(url) {
                expect(url).to.equal('http://google.com/');
                done();
            };
            gridLayer.fire('click', {data: {name: 'http://google.com/'}});
        });

        it('rejects xss', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__location__}}{{{name}}}{{/__location__}}'
            }).addTo(map);
            control._navigateTo = function(url) {
                expect(true).to.equal(false);
            };
            gridLayer.fire('click', {data: {name: 'javascript://alert("oh no")'}});
        });
    });

    describe('mouseover dataless area', function() {
        it('removes map-clickable class from map container', function() {
            L.mapbox.gridControl(gridLayer).addTo(map);
            L.DomUtil.addClass(element, 'map-clickable');
            gridLayer.fire('mouseover', {data: null});
            expect(element.className).not.to.match(/map-clickable/);
        });

        it('hides content', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__full__}}Name: {{name}}{{/__full__}}'
            }).addTo(map);
            gridLayer.fire('mouseover', {data: {name: 'John'}});
            gridLayer.fire('mouseover', {data: null});
            expect(control._container.style.display).to.equal('none');
            expect(control._contentWrapper.innerHTML).to.equal('');
        });
        it('does not hide when pinned', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__teaser__}}Name: {{name}}{{/__teaser__}}'
            }).addTo(map);
            gridLayer.fire('mouseover', {data: {name: 'John'}});
            control._pinned = true;
            gridLayer.fire('mouseover', {data: null});
            expect(control._container.style.display).to.equal('block');
            expect(control._contentWrapper.innerHTML).to.equal('Name: John');
        });
    });

    describe('click data area', function() {
        it('pins full content', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__full__}}Name: {{name}}{{/__full__}}'
            }).addTo(map);
            gridLayer.fire('click', {data: {name: 'John'}});
            expect(control._contentWrapper.innerHTML).to.equal('Name: John');
            expect(control._pinned).to.equal(true);
        });

        it('does a teaser fallback on touch', function() {
            L.Browser.touch = true;
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__teaser__}}Name: {{name}}{{/__teaser__}}'
            }).addTo(map);
            gridLayer.fire('click', {data: {name: 'John'}});
            expect(control._contentWrapper.innerHTML).to.equal('Name: John');
            expect(control._pinned).to.equal(true);
            L.Browser.touch = false;
        });

        it('does not teaser fallback on non touch', function() {
            L.Browser.touch = false;
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__teaser__}}Name: {{name}}{{/__teaser__}}'
            }).addTo(map);
            gridLayer.fire('click', {data: {name: 'John'}});
            expect(control._contentWrapper.innerHTML).to.equal('');
            expect(control._pinned).to.equal(false);
            L.Browser.touch = false;
        });

        it('does not teaser fallback when disabled', function() {
            L.Browser.touch = true;
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__teaser__}}Name: {{name}}{{/__teaser__}}',
                touchTeaser: false
            }).addTo(map);
            gridLayer.fire('click', {data: {name: 'John'}});
            expect(control._contentWrapper.innerHTML).to.equal('');
            expect(control._pinned).to.equal(false);
            L.Browser.touch = false;
        });

        it('does not show empty content', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: ''
            }).addTo(map);
            gridLayer.fire('click', {data: {name: 'John'}});
            expect(control._container.style.display).to.equal('none');
            expect(control._contentWrapper.innerHTML).to.equal('');
        });
    });

    describe('click dataless area', function() {
        it('unpins content', function() {
            var control = L.mapbox.gridControl(gridLayer, {
                template: '{{#__teaser__}}Name: {{name}}{{/__teaser__}}'
            }).addTo(map);
            gridLayer.fire('click', {data: {name: 'John'}});
            gridLayer.fire('click', {data: null});
            expect(control._container.style.display).to.equal('none');
            expect(control._contentWrapper.innerHTML).to.equal('');
        });
    });

    describe('#_template', function() {
        it('defaults to the template from the gridControl TileJSON', function() {
            var control = L.mapbox.gridControl(gridLayer);
            gridLayer._setTileJSON({template: '{{#__teaser__}}Name: {{name}}{{/__teaser__}}'});
            expect(control._template('teaser', {name: 'John'})).to.equal('Name: John');
        });

        it('prefers a custom template', function() {
            var control = L.mapbox.gridControl(gridLayer);
            gridLayer._setTileJSON({template: '{{#__teaser__}}Name 1: {{name}}{{/__teaser__}}'});
            control.setTemplate('{{#__teaser__}}Name 2: {{name}}{{/__teaser__}}');
            expect(control._template('teaser', {name: 'John'})).to.equal('Name 2: John');
        });
    });

    it('sanitizes its content', function() {
        var control = L.mapbox.gridControl(gridLayer, {
            template: '{{#__full__}}<script></script>{{/__full__}}'
        }).addTo(map);

        gridLayer.fire('click', {latLng: L.latLng(0, 0), data: 'data'});
        expect(control._currentContent).to.equal('');
    });

    it('supports a custom sanitizer', function() {
        var control = L.mapbox.gridControl(gridLayer, {
            template: '{{#__full__}}<script></script>{{/__full__}}',
            sanitizer: function(_) { return _; }
        }).addTo(map);

        gridLayer.fire('click', {latLng: L.latLng(0, 0), data: 'data'});
        expect(control._currentContent).to.equal('<script></script>');
    });
});
