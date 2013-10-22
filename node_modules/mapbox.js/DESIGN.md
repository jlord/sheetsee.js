## MapBox.js Design

This document covers some of the basics of mapbox.js v1's style and direction.
It's not set in stone.

### Code Style

We use the [Airbnb style for Javascript](https://github.com/airbnb/javascript) with
only one difference:

**4 space soft tabs always for Javascript, not 2.**

No aligned `=`, no aligned arguments, spaces are either indents or the 1
space between expressions. No hard tabs, ever. Javascript code should pass
through [JSHint](http://www.jshint.com/) with no warnings.

### Functions, Naming

Controls are named with `Control` in their name. Layers are named with
`Layer` in their name. For example: `L.mapbox.gridLayer`, `L.mapbox.geocoderControl`.

Getter/setter methods are named `getFoo` and `setFoo`. Magic d3-style getter/setters
like `foo([optional])` are not supported in the core.

Unless `setFoo` needs to have a return value, it returns the object so that
calls can be chained.

We use [camelCase](http://en.wikipedia.org/wiki/CamelCase) and preserve
the uppercaseness of acronyms. That is, `setTileJSON()`, not `setTileJson()`.

### Constructors

Do as little in constructors as possible: it should always be possible
to change values you provide in a constructor.

The public facing API of mapbox.js should not require `new` anywhere.
