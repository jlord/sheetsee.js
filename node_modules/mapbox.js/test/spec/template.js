describe('L.mapbox.template', function() {
    it('renders a moustache template', function() {
        expect(L.mapbox.template('Name: {{name}}', {name: 'John'})).to.equal('Name: John');
    });
});
