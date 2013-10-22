UGLIFY = node_modules/.bin/uglifyjs
BROWSERIFY = node_modules/.bin/browserify

# the default rule when someone runs simply `make`
all: \
	dist/mapbox.js \
	dist/mapbox.private.js \
	dist/mapbox.standalone.js \
	dist/mapbox.css \
	dist/mapbox.ie.css \
	dist/mapbox.standalone.css \
	dist/images

node_modules/.install: package.json
	npm install && npm install leaflet-hash && touch node_modules/.install

mapbox%js:
	@cat $(filter %.js,$^) > $@

dist:
	mkdir -p dist

dist/mapbox.css: node_modules/leaflet/dist/leaflet.css \
	theme/style.css
	cat node_modules/leaflet/dist/leaflet.css \
		theme/style.css > dist/mapbox.css

dist/mapbox.standalone.css: theme/style.css
	cat theme/style.css > dist/mapbox.standalone.css

dist/images:
	cp -r node_modules/leaflet/dist/images/ dist/images

dist/mapbox.ie.css: node_modules/leaflet/dist/leaflet.ie.css
	cp node_modules/leaflet/dist/leaflet.ie.css dist/mapbox.ie.css

# assemble an uncompressed but complete library for development
dist/mapbox.uncompressed.js: node_modules/.install dist $(shell $(BROWSERIFY) --list index.js)
	$(BROWSERIFY) --debug index.js > $@

# assemble an uncompressed library without bundled leaflet
dist/mapbox.standalone.uncompressed.js: node_modules/.install dist $(shell $(BROWSERIFY) --list mapbox.js)
	$(BROWSERIFY) --debug mapbox.js > $@

# assemble an uncompressed but complete library for development
dist/mapbox.private.js: node_modules/.install dist $(shell $(BROWSERIFY) --list private.js)
	$(BROWSERIFY) --debug private.js > $@

# compress mapbox.js with [uglify-js](https://github.com/mishoo/UglifyJS),
# with name manging (m) and compression (c) enabled
dist/mapbox.js: dist/mapbox.uncompressed.js
	$(UGLIFY) $< -c -m -o $@

# compress mapbox.standalone.js
dist/mapbox.standalone.js: dist/mapbox.standalone.uncompressed.js
	$(UGLIFY) $< -c -m -o $@

clean:
	rm -rf dist/*
