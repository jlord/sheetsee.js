// basic test for commonJS version for running with node.js
// can be run with nodeunit

var ich = require('../ICanHaz');

exports.testAddUseTemplate = function (test) {
    ich.addTemplate('favoriteColor', 'Red. No, Blue. Aieee! {{color}}');
    test.ok(ich.favoriteColor);
    test.equal(ich.favoriteColor({color: 'chartreuse'}), 'Red. No, Blue. Aieee! chartreuse');
    test.done();
};

exports.testClearAndReAdd = function (test) {
    ich.addTemplate('newTemplate', '{{something}}');
    test.ok(ich.newTemplate);
    test.ok(ich.templates.newTemplate);
    ich.clearAll();
    test.ok(!ich.newTemplate);
    test.ok(!ich.templates.newTemplate);
    test.done();
};

exports.testTaken = function (test) {
    ich.addTemplate('something', '{{something}}');
    test.ok(ich.something);
    ich.addTemplate('something', '{{somethingElse}}');
    test.done();
};

exports.testAddingObjects = function (test) {
    var templates = {
            first: "first {{person}}",
            second: "second {{person}}",
        },
        obj = {
            person: "bob"
        };
    ich.addTemplate(templates);
    test.equal(ich.first(obj), 'first bob');
    test.ok(ich.second(obj), 'second bob');
    test.done();
};