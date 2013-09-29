build:
	browserify js/sheetsee.js -s Sheetsee > dist/sheetsee.js
	browserify js/sheetsee.full.js -s Sheetsee > dist/sheetsee.full.js
	uglifyjs dist/sheetsee.js > dist/sheetsee.min.js
	uglifyjs dist/sheetsee.full.js > dist/sheetsee.full.min.js
	
.PHONY: build