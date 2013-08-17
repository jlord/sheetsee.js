build:
	browserify js/sheetsee.js -s Sheetsee | uglifyjs - > dist/sheetsee.js
	browserify js/sheetsee.full.js -s Sheetsee | uglifyjs - > dist/sheetsee.full.js
	
.PHONY: build