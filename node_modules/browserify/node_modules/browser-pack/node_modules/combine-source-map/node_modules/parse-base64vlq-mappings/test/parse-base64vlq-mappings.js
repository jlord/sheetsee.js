'use strict';
/*jshint asi: true */

var test = require('tap').test
  , parse = require('..')
  , Generator = require('source-map').SourceMapGenerator


test('parsing generated one to one mappings with last line having no original', function (t) {
  var gen = new Generator({ file: 'foo.js' })
  var add = [ 
    { generated: { line: 1, column: 0 },
      original: { line: 1, column: 0 },
      source: 'foo.js',
      name: null },
    { generated: { line: 2, column: 0 },
      original: { line: 2, column: 0 },
      source: 'foo.js',
      name: null },
    { generated: { line: 3, column: 0 },
      original: { line: 3, column: 0 },
      source: 'foo.js',
      name: null },
    { generated: { line: 4, column: 0 },
      original: { line: 4, column: 0 },
      source: 'foo.js',
      name: null },
    { generated: { line: 5, column: 0 },
      original: { line: 5, column: 0 },
      source: 'foo.js',
      name: null },
    { generated: { line: 6, column: 0 } } ]

  add.forEach(gen.addMapping.bind(gen))
  var addedMappings = add.map(function (m) { return m.original ? { generated: m.generated, original: m.original } : { generated: m.generated } })

  var mappings = gen.toJSON().mappings
    , parsed = parse(mappings)

  t.deepEqual(parsed, addedMappings, 'parses out added mappings')
  t.end()
});

test('parsing generated offset mappings with last line having no original', function (t) {
  var gen = new Generator({ file: 'foo.js' })
  var add = [ 
      { generated: { line: 21, column: 0 },
        original: { line: 1, column: 0 },
        source: 'foo.js',
        name: null },
      { generated: { line: 22, column: 3 },
        original: { line: 2, column: 0 },
        source: 'foo.js',
        name: null },
      { generated: { line: 23, column: 0 },
        original: { line: 3, column: 2 },
        source: 'foo.js',
        name: null },
      { generated: { line: 24, column: 0 },
        original: { line: 4, column: 5 },
        source: 'foo.js',
        name: null },
      { generated: { line: 25, column: 0 } } ]

  add.forEach(gen.addMapping.bind(gen))
  var addedMappings = add.map(function (m) { return m.original ? { generated: m.generated, original: m.original } : { generated: m.generated } })

  var mappings = gen.toJSON().mappings
    , parsed = parse(mappings)

  t.deepEqual(parsed, addedMappings, 'parses out added mappings')
  t.end()
});

