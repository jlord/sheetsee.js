
![sheetseeimg](https://raw.github.com/jlord/sheetsee-cache/master/img/sheetsee-03.png)

# Sheetsee.js

**Sheetsee.js** is a client-side library for connecting Google Spreadsheets to a website and visualizing the information in tables, maps and charts.

Google Spreadsheets can be used as simple and collaborative databases, they make getting a data driven site going much easier than traditional databases. Read more about using spreadsheets for databases [here](./docs/basics.md).

## Modules

Each of **sheetsee.js**'s features are divided into modules. Use just the parts you need; see docs on [building](./docs/building.md). If you don't want to build your own, you can just use the full library which includes all modules, it's [here on GitHub](http://www.github.com/jlord/sheetsee.js).


| Module              | Contains                                                                                            | Docs                         |
| ------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------- |
| **sheetsee-core**   | **Included in any build**. Gets you started and has the working-with-your-data functions.           | [Doc](./docs/sheetsee-core.md)   |
| **sheetsee-tables** | Contains everything you'll need to create a table including sortable columns, pagination and search.| [Doc](./docs/sheetsee-tables.md) |
| **sheetsee-maps**   | For making maps with your point, line or polygon spreadsheet data. Built on Mapbox.js.              | [Doc](./docs/sheetsee-maps.md)   |
| **sheetsee-charts** | Includes 3 basic d3 charts: bar, line and pie. You can also [use your own](docs/custom-charts.md).  | [Doc](./docs/sheetsee-charts.md) |


## In the Wild

What can you make with **Sheetsee.js**? Lots of things, here are some examples:

- [Hack-Spots](http://jlord.github.io/hack-spots)
- [Combine with IFTTT](http://jlord.us/instagram/)
- [Real Python Support Desk](http://www.realpython.com/support)

**List your sheetsee project here: file an [issue or pull request](http://www.github.com/jlord/sheetsee.js).**

# Resources & Documentation

More resources on using Sheetsee.js:

| Getting Started | Ideas | Use | Demos |
| --- | --- | --- | --- |
| [About Sheetsee.js](./docs/about.md)<br> [Building Sheetsee](./docs/building.md)<br> [Basics](./docs/basics.md) | [Fork-n-Go](./docs/fork-n-go.md)<br> [Tips!](./docs/tips.md)<br> [Custom charts](./docs/custom-charts.md) | [Sheetsee-core](./docs/sheetsee-core.md)<br> [Sheetsee-tables](./docs/sheetsee-tables.md)<br> [Sheetsee-maps](./docs/sheetsee-maps.md)<br> [Sheetsee-charts](./docs/sheetsee-charts.md) | [Table Demo](./demos/demo-table.html)<br> [Map Demo](./demos/demo-map.html)<br> [Chart Demo](./demos/demo-chart.html) |

## Note on New Google Spreadsheets

Google recently updated their Google Spreadsheets and the API. For a bit this was breaking things using the old API, including Tabletop. This has been fixed and the latest version of tabletop.js works on both old and new spreadsheets. **Be sure to include at least version 1.3.4 in your project.**

