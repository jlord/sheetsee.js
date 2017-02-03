
![sheetseeimg](https://raw.github.com/jlord/sheetsee-cache/master/img/sheetsee-03.png)

### Sheetsee.js is a client-side library for connecting Google Spreadsheets to a website and visualizing the information in tables, maps and charts.

---

**This repository is for the [project website](http://jlord.github.io/sheetsee.js) and provides a [compiled version sheetsee.js](./js/sheetsee.js).** Use the compiled version if you want _all_ of what is available in Sheetsee. If you want just the parts that you're going to use in your project and nothing more, you can [build a custom version](./docs/building.md).

**Each part of Sheetsee has its own repository and issues should be opened there.** General issues/pull requests for the site are OK here.

## Repositories for Sheetsee Components

| Component              | Description                                                                                            | Repo                         |
| ------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------- |
| `sheetsee-core`   | **Included in every build**. Gets you started and has the working-with-your-data functions.           | [jlord/sheetsee-core](https://github.com/jlord/sheetsee-core)   |
| `sheetsee-tables` | Contains everything you'll need to create a table including sortable columns, pagination and search.| [jlord/sheetsee-tables](https://github.com/jlord/sheetsee-tables) |
| `sheetsee-maps`   | For making maps with your point, line or polygon spreadsheet data. Built on Mapbox.js.              | [jlord/sheetsee-maps](https://github.com/jlord/sheetsee-maps)   |
| `sheetsee-charts` | Includes 3 basic d3 charts: bar, line and pie. You can also [use your own](docs/custom-charts.md).  | [jlord/sheetsee-charts](https://github.com/jlord/sheetsee-charts) |
