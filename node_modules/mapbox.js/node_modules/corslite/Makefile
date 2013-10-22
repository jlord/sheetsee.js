all: bundle.js

bundle.js: test/*.js corslite.js
	node_modules/.bin/browserify test/*.js > bundle.js
