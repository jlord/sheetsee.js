SHELL = /bin/bash

VERSION = $(shell cat version.txt;)

ICH = ICanHaz.js
ICH_MIN = ICanHaz.min.js
ICH_NOMS = ICanHaz-no-mustache.js
ICH_NOMS_MIN = ICanHaz-no-mustache.min.js
MAIN_FILE = source/main.js
MUSTACHE_FILE ?= vendor/mustache/mustache.js
BASE_FILES = $(MUSTACHE_FILE) $(MAIN_FILE)

all: $(ICH) $(ICH_MIN) $(ICH_NOMS) $(ICH_NOMS_MIN)

$(ICH): $(BASE_FILES)
	@@echo
	@@echo "Building" $(ICH) "..."
	@@cat source/intro.js | sed -e 's/@VERSION@/$(VERSION)/' > $(ICH)
	@@echo "(function () {" >> $(ICH)
	@@cat $(BASE_FILES) | sed -e 's/@VERSION@/$(VERSION)/' >> $(ICH)
	@@echo "})();" >> $(ICH)
	@@echo $(ICH) "built."

$(ICH_NOMS): $(MAIN_FILE)
	@@echo
	@@echo "Building" $(ICH_NOMS) "..."
	@@cat source/intro.js | sed -e 's/@VERSION@/$(VERSION)/' > $(ICH_NOMS)
	@@echo "(function () {" >> $(ICH_NOMS)
	@@cat $(MAIN_FILE) | sed -e 's/@VERSION@/$(VERSION)/' >> $(ICH_NOMS)
	@@echo "})();" >> $(ICH_NOMS)
	@@echo $(ICH_NOMS) "built."

$(ICH_MIN): $(ICH)
	@@echo "Building" $(ICH_MIN) "..."
	@@curl -s --data-urlencode 'js_code@ICanHaz.js' --data-urlencode 'output_format=text' --data-urlencode 'output_info=compiled_code' http://closure-compiler.appspot.com/compile > $@

$(ICH_NOMS_MIN): $(ICH_NOMS)
	@@echo "Building" $(ICH_NOMS_MIN) "..."
	@@curl -s --data-urlencode 'js_code@ICanHaz-no-mustache.js' --data-urlencode 'output_format=text' --data-urlencode 'output_info=compiled_code' http://closure-compiler.appspot.com/compile > $@

clean:
	@rm -f $(ICH) $(ICH_MIN) $(ICH_NOMS) $(ICH_NOMS_MIN)
