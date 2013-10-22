/*!
ICanHaz.js version 0.10.2 -- by @HenrikJoreteg
More info at: http://icanhazjs.com
*/
(function () {
/*!
  ICanHaz.js -- by @HenrikJoreteg
*/
/*global  */
(function () {
    function trim(stuff) {
        if (''.trim) return stuff.trim();
        else return stuff.replace(/^\s+/, '').replace(/\s+$/, '');
    }

    // Establish the root object, `window` in the browser, or `global` on the server.
    var root = this;

    var ich = {
        VERSION: "0.10.2",
        templates: {},

        // grab jquery or zepto if it's there
        $: (typeof window !== 'undefined') ? window.jQuery || window.Zepto || null : null,

        // public function for adding templates
        // can take a name and template string arguments
        // or can take an object with name/template pairs
        // We're enforcing uniqueness to avoid accidental template overwrites.
        // If you want a different template, it should have a different name.
        addTemplate: function (name, templateString) {
            if (typeof name === 'object') {
                for (var template in name) {
                    this.addTemplate(template, name[template]);
                }
                return;
            }
            if (ich[name]) {
                console.error("Invalid name: " + name + ".");
            } else if (ich.templates[name]) {
                console.error("Template \"" + name + "  \" exists");
            } else {
                ich.templates[name] = templateString;
                ich[name] = function (data, raw) {
                    data = data || {};
                    var result = Mustache.to_html(ich.templates[name], data, ich.templates);
                    return (ich.$ && !raw) ? ich.$(trim(result)) : result;
                };
            }
        },

        // clears all retrieval functions and empties cache
        clearAll: function () {
            for (var key in ich.templates) {
                delete ich[key];
            }
            ich.templates = {};
        },

        // clears/grabs
        refresh: function () {
            ich.clearAll();
            ich.grabTemplates();
        },

        // grabs templates from the DOM and caches them.
        // Loop through and add templates.
        // Whitespace at beginning and end of all templates inside <script> tags will
        // be trimmed. If you want whitespace around a partial, add it in the parent,
        // not the partial. Or do it explicitly using <br/> or &nbsp;
        grabTemplates: function () {
            var i,
                l,
                scripts = document.getElementsByTagName('script'),
                script,
                trash = [];
            for (i = 0, l = scripts.length; i < l; i++) {
                script = scripts[i];
                if (script && script.innerHTML && script.id && (script.type === "text/html" || script.type === "text/x-icanhaz")) {
                    ich.addTemplate(script.id, trim(script.innerHTML));
                    trash.unshift(script);
                }
            }
            for (i = 0, l = trash.length; i < l; i++) {
                trash[i].parentNode.removeChild(trash[i]);
            }
        }
    };

    // Export the ICanHaz object for **Node.js**, with
    // backwards-compatibility for the old `require()` API. If we're in
    // the browser, add `ich` as a global object via a string identifier,
    // for Closure Compiler "advanced" mode.
    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = ich;
        }
        exports.ich = ich;
    } else {
        root['ich'] = ich;
    }

    if (typeof document !== 'undefined') {
        if (ich.$) {
            ich.$(function () {
                ich.grabTemplates();
            });
        } else {
            document.addEventListener('DOMContentLoaded', function () {
                ich.grabTemplates();
            }, true);
        }
    }

})();
})();
