'use strict';

function utfDecode(c) {
    if (c >= 93) c--;
    if (c >= 35) c--;
    return c - 32;
}

module.exports = function(data) {
    return function(x, y) {
        if (!data) return;
        var idx = utfDecode(data.grid[y].charCodeAt(x)),
            key = data.keys[idx];
        return data.data[key];
    };
};
