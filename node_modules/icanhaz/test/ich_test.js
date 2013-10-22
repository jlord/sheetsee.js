function isEmptyObject( obj ) {
    for ( var name in obj ) {
        return false;
    }
    return true;
}

function raw( ich ) {
		return ich.$ === undefined
}

function first( results ) {
		return results instanceof Object ? results.get(0).outerHTML : results
}

module("ICanHaz");

test("creates function for template", function() {
  expect(1);
  ok(ich.test1, "test1 template exists");
});

test("renders non-parameterized templates", function() {
  expect(1);
  equal(first(ich.test1({}, raw(ich))), "<p>This is a test of the emergency broadcast system.</p>"); // raw text
});

test("renders parameterized templates", function() {
  expect(1);
  equal(first(ich.test2({prey:'wabbits'}, raw(ich))), "<span>Be vewwy vewwy quiet, we're hunting wabbits.</span>");
});

test("renders leading whitespace templates", function() {
  expect(1);
  notEqual(first(ich.trim({}, raw(ich))).indexOf("<span>Where's the BEEF!</span>"), -1);
});

test("renders ad hoc templates", function() {
  ich.addTemplate('favoriteColor', '<p>Red. No, Blue. Aieee!</p>');
  expect(1);
  equal(first(ich.favoriteColor({}, raw(ich))), '<p>Red. No, Blue. Aieee!</p>');
});

// Newly added support for partials
test("renders partials", function() {
  // partials example from the Mustache README
  expect(1);
  var view = {
      name: "Joe",
      winnings: {
        value: 1000,
        taxed_value: function() {
          return this.value - (this.value * 0.4);
        }
      }
  };
  equal(first(ich.welcome(view, raw(ich))), "<p>Welcome, Joe! You just won $1000 (which is $600 after tax)</p>");
});

test("renders partials added at runtime", function() {
  // partials example from the Mustache README
  ich.addTemplate('winnings2', "You just won ${{value}} (which is ${{taxed_value}} after tax)");
  ich.addTemplate('welcome2', "<p>Welcome, {{name}}! {{>winnings2}}</p>");
  expect(1);
  var view = {
      name: "Joe",
      winnings2: {
        value: 1000,
        taxed_value: function() {
          return this.value - (this.value * 0.4);
        }
      }
  };
  equal(first(ich.welcome2(view, raw(ich))), '<p>Welcome, Joe! You just won $1000 (which is $600 after tax)</p>');
});

test("clearAll should wipe 'em out", function () {
    ich.clearAll();

    ok(isEmptyObject(ich.templates));
    ok(isEmptyObject(ich.partials));

    equal(ich.welcome2, undefined, "welcome2 template gone?");
});

test("grabTemplates that are loaded in later", function () {
    // not recommended use, but should work nonetheless
    var el = document.createElement('script');
    el.id = "flint";
    el.type = "text/html";
    el.text = "<p>yabba {{ something }} doo!</p>";
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(el);

    ich.grabTemplates();
    equal(first(ich.flint({something: 'dabba'}, raw(ich))), "<p>yabba dabba doo!</p>", "should have new template");
});

test("refresh should empty then grab new", function () {
    // not recommended use, but should work nonetheless
    var el = document.createElement('script');
    el.id = "mother";
    el.type = "text/html";
    el.text = "<p>your mother was a {{ something }}...</p>";
    var head = document.getElementsByTagName('head')[0];
    head.appendChild(el);

    ich.refresh();

    equal(first(ich.mother({something: 'hampster'}, raw(ich))), "<p>your mother was a hampster...</p>", "should have new template");
    equal(ich.hasOwnProperty('flint'), false, "flint template should be gone");
});

test("can add multiple templates at once", function () {
    var templates = {
            first: "<p>first {{person}}</p>",
            second: "<p>second {{person}}</p>"
        },
        obj = {
            person: "bob"
        };
    ich.addTemplate(templates);
    equal(first(ich.first(obj, raw(ich))), '<p>first bob</p>');
    ok(first(ich.second(obj, raw(ich))), '<p>second bob</p>');
});
