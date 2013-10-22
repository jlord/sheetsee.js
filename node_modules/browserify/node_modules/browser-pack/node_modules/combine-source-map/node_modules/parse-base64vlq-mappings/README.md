# parse-base64vlq-mappings [![build status](https://secure.travis-ci.org/thlorenz/parse-base64vlq-mappings.png)](http://travis-ci.org/thlorenz/parse-base64vlq-mappings)

Parses out base64 VLQ encoded mappings.

The code is mostly lifted from [mozilla's source-map module](https://github.com/mozilla/source-map) in order to separate
out the parse function into its own module.

```js
var parse = require('parse-base64vlq-mappings');

var mappings = parse('AAAA;AACA;AACA;AACA;AACA');
console.log(mappings);
```

```
[ { generated: { line: 1, column: 0 },
    original: { line: 1, column: 0 } },
  { generated: { line: 2, column: 0 },
    original: { line: 2, column: 0 } },
  { generated: { line: 3, column: 0 },
    original: { line: 3, column: 0 } },
  { generated: { line: 4, column: 0 },
    original: { line: 4, column: 0 } },
  { generated: { line: 5, column: 0 },
    original: { line: 5, column: 0 } } ]
```

## Caveat

Main intended use is either for testing generated mappings or to add offsets to existing mappings.

Therefore is is assumed that all mappings relate to the same generated/original file, i.e. only information about
generated line and column vs. original line and column is preserved.

Additionally all name information is disregarded during the parse.
