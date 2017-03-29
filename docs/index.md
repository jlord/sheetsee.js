![sheetseeimg](img/next-sheetsee.png)

**Sheetsee.js** is a client-side library for connecting Google Spreadsheets to a website and visualizing the information in tables and maps.

<hr>

## Spreadsheets!?

Google Spreadsheets can be used as simple and collaborative databases, they make getting a data driven site going much easier than traditional databases. [Read more](./docs/basics.md) about using spreadsheets for databases.

## Modules

Each of Sheetsee's functions are divided into modules. Use just the parts you need; see docs on [building](./docs/building.md). If you don't want to build your own, you can just use the full library which includes all modules, it's [here on GitHub](http://www.github.com/jlord/sheetsee.js).

| Module              | Contains                                                                                            | Docs                         |
| ------------------- | --------------------------------------------------------------------------------------------------- | ---------------------------- |
| **sheetsee**   | Command line module for make a custom build of Sheetsee. | [Doc](./docs/building.md)   |
| **sheetsee-core**   | **Included in all builds**. Has helpful working-with-your-data functions.           | [Doc](./docs/sheetsee-core.md)   |
| **sheetsee-tables** | Contains everything you'll need to create a table including sortable columns, pagination and search.| [Doc](./docs/sheetsee-tables.md) |
| **sheetsee-maps**   | For making maps with your point, line or polygon spreadsheet data. Built with Leaflet.js.              | [Doc](./docs/sheetsee-maps.md)   |

<div class="new-news">New News!</div>

## Get your Spreadsheet as JSON or Try Sheetsee with Glitch!

The [spreadsheet.glitch.me](https://spreadsheet.glitch.me) site will give you an endpoint to use that will return your spreadsheet to you as JSON. The [sheetsee.glitch.me](https://sheetsee.glitch.me) site provides template to get started with Sheetsee; it's already set up with a server so that your data is backed up.

### Or Fork a Site!

There are site templates hooked up to Sheetsee that are ready to be forked on GitHub and used by you, check out the [Fork-n-go site](http://jlord.us/forkngo).

## Sheetsee Updates

Sheetsee has just been re-written and there are some breaking changes. Also some nice ones, like dependencies removed. The API for maps with Sheetsee have changed, [see the docs](https://github.com/jlord/sheetsee-maps#sheetseeloadmapoptions).

<hr>

## Resources & Documentation

More resources on using Sheetsee:

| Getting Started | Ideas | Demos | Use |
| --- | --- | --- | --- |
| [About Sheetsee](./docs/about.md) | [Templates](./docs/templates.md) | [Table Demo](./demos/demo-table.html) | [Sheetsee-core](./docs/sheetsee-core.md) |
| [Building Sheetsee](./docs/building.md) | [Tips!](./docs/tips.md) |  [Map Demo](./demos/demo-map.html) | [Sheetsee-tables](./docs/sheetsee-tables.md) |
| [Basics](./docs/basics.md) | | | [Sheetsee-maps](./docs/sheetsee-maps.md) |
