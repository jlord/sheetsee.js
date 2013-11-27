More about Sheetsee's development and the libraries it's built on.

## In the Beginning
Sheetsee.js began as a part of my [Code for America]() 2012 Fellowship project, [See Penny Work](). The idea and original code was to enable cities to easily publish and maintain themselves their budget data. The original sheetsee.js was built into Wordpress templates so that with the See Penny Work template, you could create pages that you only had to name and they would be populated with maps, charts and tables based on the page name corelating with a project in the spreadsheet.

In early 2013, after the CfA Fellowship, I recieved a grant from Mozilla Open News to pull out the sheetsee.js bits and make it a standalone open source library. That brought us to version 2. 

The present version makes the project modular, customizable and with more maping and table features. View the [changelog]() for a timeline of features and states. 

## Built ontop of Tabletop.js
Sheetsee would not exist were it not for [tabletop.js]() a library built in ___ by ___ that handles the messy interactions with the Google Spreadsheets API for you and returns a lovely JSON of your data. Every instance of Sheetsee begins with running tabletop.js.

### Sheetsee.js + Mapbox.js + Leaflet.js + d3.js
Once you've got the data, the meat of Sheetsee comes into play. You can now decide if you want to map, chart or display your data in a table. Sheetsee's table module, sheetsee-tables, comes with sorting, filtering and pagination. Sheetsee-maps is built ontop of Leaflet.js and Mapbox.js and allows you to customize colors and popups of points, lines, polygons or multipolygons. Finally, Sheetee-charts comes with three basic [d3.js]() charts: bar, circle and line. It is difficult to make a chart that can suit many types of data, but it is easy to choose your own d3 chart and plug it in to sheetsee. Documentation for creating a d3 module is [here]().

## Hacked on Openly 
- Sheetsee.js is open source software with a [BSD license](docs/license.md).
- Sheetsee.js is built and maintained by [jlord](http://www.github.com/jlord) ([twitter](http://www.twitter.com/jllord)) with support from [contributors]() and a lot of support and knowledge passed on by [Max Ogden]().

## Contact
- File a [new issue]() for ideas and bug reports.
- If your issue falls specifically with one of the modules, you can file it on its particular repo:
 - [sheetsee](http://www.github.com/jlord/sheetsee)
 - [sheetsee-tables](http://www.github.com/jlord/sheetsee-tables)
 - [sheetsee-maps](http://www.github.com/jlord/sheetsee-maps)
 - [sheetsee-charts](http://www.github.com/jlord/sheetsee-charts)
- [jllord](http://www.twitter.com/jllord) on Twitter.
