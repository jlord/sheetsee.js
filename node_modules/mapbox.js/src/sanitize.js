'use strict';

var html_sanitize = require('../ext/sanitizer/html-sanitizer-bundle.js');

// https://bugzilla.mozilla.org/show_bug.cgi?id=255107
function cleanUrl(url) {
    if (/^https?/.test(url.getScheme())) return url.toString();
    if ('data' == url.getScheme() && /^image/.test(url.getPath())) {
        return url.toString();
    }
}

function cleanId(id) {
    return id;
}

module.exports = function(_) {
    if (!_) return '';
    return html_sanitize(_, cleanUrl, cleanId);
};
