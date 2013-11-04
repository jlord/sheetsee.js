build:
	browserify index.js -s Sheetsee > dist/sheetsee.js
	uglifyjs dist/sheetsee.js > dist/sheetsee.min.js
	
.PHONY: build