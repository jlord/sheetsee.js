# About

Sheetsee.js began as a part of a [Code for America](http://www.codeforamerica.org) 2012 Fellowship project. The original idea was to make a way for cities to easily publish and maintain budget data themselves. Originally, the JavaScript was part of a WordPress theme that could be connected to a spreadsheet, allowing new pages to be created with charts, maps and tables automatically generated from the data.

In early 2013, after the CfA Fellowship and through a grant from [Mozilla Open News](http://opennews.org), the JavaScript bits were pulled out to make it a standalone open source library: sheetsee.js.

Since then there have been a few updates to the library but it was not until 2017 when Sheetsee got it's next major upgrade.

In Spring of 2017 Sheetsee was cleaned up and downsized. Charting support and some dependencies were removed to make maintenance and overall size better.

## Dependencies

Sheetsee comes into play after you use [Tabletop.js](https://github.com/jsoma/tabletop), a library that handles the messy interactions with the Google Spreadsheets API for you and returns a lovely array of your data. At the end of the day, however, Sheetsee just wants an array of JSON data, if you have some on hand already, you can use Sheetsee too :)

### Mustache, Leaflet

Sheetsee uses the [Mustache.js](https://mustache.github.io) library for templates in `sheetsee-tables` and map popups in `sheetsee-maps`. The maps are generated using the [Leaflet.js](http://leafletjs.com) library.

## Hacked on Openly
- Sheetsee.js is open source software with a [BSD license](docs/license.md).
- Sheetsee.js is a labor of love by [jlord](http://www.github.com/jlord) ([Twitter](http://www.twitter.com/jllord))

## Contact & Contribute
Issues with this website can be opened on the [sheetsee.js repository](https://github.com/jlord/sheetsee/issues/new). Otherwise, if your issue falls specifically with one of the modules, you can file it on its particular repo:
 - [sheetsee (CLI)](http://www.github.com/jlord/sheetsee/issues/new)
 - [sheetsee-core](http://www.github.com/jlord/sheetsee-core/issues/new)
 - [sheetsee-tables](http://www.github.com/jlord/sheetsee-tables/issues/new)
 - [sheetsee-maps](http://www.github.com/jlord/sheetsee-maps/issues/new)

## Thanks, y'all

Thanks to [Code for America](http://www.codeforamerica.org) for providing the platform me to build the first version of sheetsee.js for Macon, Georgia.

Thanks to [Dan Sinker](http://www.twitter.com/dansinker) at [Open News](http://www.mozillaopennews.org/) for having faith and getting things together to make this Code Sprint happen and thanks to [Matt Green](https://twitter.com/whatsnewmedia) at WBEZ for being a willing partner.

Thanks to [Max Ogden](http://www.twitter.com/maxogden) for emotional support, teaching me JavaScript and answering lots of questions.

Thanks to all the authors and contributors to [Tabletop.js](https://github.com/jsoma/tabletop), [Leaflet.js](http://leafletjs.com) and [Mustache.js](https://mustache.github.io). Thanks to Google and the Internet for existing and to all those who've written tutorials or asked or answered a question on StackOverflow.

Thanks to Mom and Dad for getting a computer in 1996 and the mIRC scripts I started writing that I suppose would eventually lead me here.
