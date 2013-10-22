'use strict';

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

var base64VLQ = require('./base64-vlq');

module.exports = function parse(str_) {
  var generatedLine           =  1
    , previousGeneratedColumn =  0
    , previousOriginalLine    =  0
    , previousOriginalColumn  =  0
    , mappingSeparator = /^[,;]/
    , mappings = []
    , str = str_ 
    , mapping
    , temp;

  while (str.length > 0) {
    if (str.charAt(0) === ';') {
      generatedLine++;
      str = str.slice(1);
      previousGeneratedColumn = 0;
    }
    else if (str.charAt(0) === ',') {
      str = str.slice(1);
    }
    else {
      mapping = { generated: { } };
      mapping.generated.line = generatedLine;

      // Generated column.
      temp = base64VLQ.decode(str);
      mapping.generated.column = previousGeneratedColumn + temp.value;
      previousGeneratedColumn = mapping.generated.column;
      str = temp.rest;

      if (str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
        // Original source.
        temp = base64VLQ.decode(str);

        str = temp.rest;
        if (str.length === 0 || mappingSeparator.test(str.charAt(0))) {
          throw new Error('Found a source, but no line and column');
        }

        // Original line.
        temp = base64VLQ.decode(str);
        mapping.original = { };
        mapping.original.line = previousOriginalLine + temp.value;
        previousOriginalLine = mapping.original.line;
        // Lines are stored 0-based
        mapping.original.line += 1;
        str = temp.rest;
        if (str.length === 0 || mappingSeparator.test(str.charAt(0))) {
          throw new Error('Found a source and line, but no column');
        }

        // Original column.
        temp = base64VLQ.decode(str);
        mapping.original.column = previousOriginalColumn + temp.value;
        previousOriginalColumn = mapping.original.column;
        str = temp.rest;

        // XXX: all name information is currently lost which may not be desirable
        /*if (str.length > 0 && !mappingSeparator.test(str.charAt(0))) {
          // Original name.
          temp = base64VLQ.decode(str);
          mapping.name = this._names.at(previousName + temp.value);
          previousName += temp.value;
          str = temp.rest;
        }*/
      }

      mappings.push(mapping);
    }
  }
  return mappings;
};
