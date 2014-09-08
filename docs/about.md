# About

Sheetsee.js began as a part of my [Code for America](http://www.codeforamerica.org) 2012 Fellowship project, [See Penny Work](http://www.seepennywork.in). The idea and original code was to enable cities to easily publish and maintain themselves their budget data. The original sheetsee.js was built into Wordpress templates so that with the See Penny Work template, you could create pages that you only had to name and they would be populated with maps, charts and tables based on the page name corelating with a project in the spreadsheet.

In early 2013, after the CfA Fellowship, I recieved a grant from [Mozilla Open News](http://opennews.org/) to pull out the sheetsee.js bits and make it a standalone open source library. That brought us to version 2.

The present version makes the project modular, customizable and with more maping and table features.

## Built on top of Tabletop.js
Sheetsee pairs with [tabletop.js](https://github.com/jsoma/tabletop) a library that handles the messy interactions with the Google Spreadsheets API for you and returns a lovely array of your data. Every instance of Sheetsee begins with running tabletop.js. Well, actually, if you have some data on hand already in JSON format, you can use Sheetsee too :)

### Sheetsee.js + Mapbox.js + d3.js
Once you've got the data, you're ready to Sheetsee. You can now decide if you want to map, chart or display your data in a table. Sheetsee's table module, **sheetsee-tables**, comes with sorting, filtering and pagination. Tables use [icanhaz.js](http://www.icanhazjs.com) for very mustache.js-like templating. 

**Sheetsee-maps** is built ontop of [Leaflet.js](http://leafletjs.com/) and [Mapbox.js](https://www.mapbox.com/mapbox.js/) and allows you to customize colors and popups of points, lines, polygons or multipolygons. 

Finally, **Sheetee-charts** comes with three basic [d3.js](http://d3js.org) charts: bar, circle and line. It is difficult to make a chart that can suit many types of data, but it is easy to choose your own d3 chart and plug it in to sheetsee. Documentation for creating a d3 module is [here](docs/custom-chart.md).

## Hacked on Openly
- Sheetsee.js is open source software with a [BSD license](docs/license.md).
- Sheetsee.js is a labor of love by [jlord](http://www.github.com/jlord) ([twitter](http://www.twitter.com/jllord)) with support from [contributors](https://github.com/jlord/sheetsee.js/graphs/contributors).

## Contact & Contribute
- File a [new issue](https://github.com/jlord/sheetsee.js/issues/new) for ideas and bug reports.
- If your issue falls specifically with one of the modules, you can file it on its particular repo:
 - [sheetsee](http://www.github.com/jlord/sheetsee/issues/new)
 - [sheetsee-core](http://www.github.com/jlord/sheetsee-core/issues/new)
 - [sheetsee-tables](http://www.github.com/jlord/sheetsee-tables/issues/new)
 - [sheetsee-maps](http://www.github.com/jlord/sheetsee-maps/issues/new)
 - [sheetsee-charts](http://www.github.com/jlord/sheetsee-charts/issues/new)
- [@jllord](http://www.twitter.com/jllord) on Twitter.

## Big Time Thanks

Thanks to [Code for America](http://www.codeforamerica.org) for providing the platform me to build the first version of sheetsee.js for Macon, Georgia.

Thanks to [Dan Sinker](http://www.twitter.com/dansinker) at [Open News](http://www.mozillaopennews.org/) for having faith and getting things together to make this Code Sprint happen and thanks to [Matt Green](https://twitter.com/whatsnewmedia) at WBEZ for being a willing partner.

Thanks to [Max Ogden](http://www.twitter.com/maxogden) for emotional support, teaching me JavaScript and answering lots of questions.

Thanks to all the authors and contributors to Tabletop.js, [Mapbox.js](https://www.mapbox.com/mapbox.js/), [Leaflet.js](http://leafletjs.com/), jQuery, [ICanHas.js](http://icanhazjs.com/) and [d3.js](http://d3js.org). Thanks to Google and the Internet for existing and to all those who've written tutorials or asked or answered a question on StackOverflow.

Thanks to Mom and Dad for getting a computer in 1996 and the mIRC scripts I started writing that I suppose would eventually lead me here.
