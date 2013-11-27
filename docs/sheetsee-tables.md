# sheetsee-tables

![sheetsee](https://raw.github.com/jllord/sheetsee-cache/master/img/sheetsee-03.png)

Module for creating tables with sheetsee.js. You should also (for now) require the [sheetsee-core](http://www.npmjs.org/sheetsee-core) module since it includes the templating library that this module uses. 

Below is the portion of the full sheetsee documentation that is relevant to making tables. See the full [documentation](http://jlord.github.io/sheetsee.js) here.

---

## Make a Table

Sheetsee.js supports making multiple tables or templates with IcanHas.js. It currently supports sorting, filtering and pagination. For each of these you'll need a `<div>` in your html, a `<script>` template and a `<script>` that calls table making functions.

#### Your HTML Placeholder `<div>`

This is as simple as an empty `<div>` with an id. This id should match the script tempate id in the next section.

     <div id="siteTable"></div>

#### Your `<script>` Template

Your template is the mockup of what you'd like your table to look like and what content it should show. Most of this is up to you but if you want users to be able to click on headers and sort that column you must make a table row with table headers with the class _tHeader_.

The variables inside the {{}} must match the column headers in your spreadsheet. Lowercase and remember spaces are ommited, so "Place Name" will become "placename".

    <script id="siteTable" type="text/html">
        <table>
        <tr><th class="tHeader">City</th><th class="tHeader">Place Name</th><th class="tHeader">Year</th><th class="tHeader">Image</th></tr>
          {{#rows}}
            <tr><td>{{city}}</td><td>{{placename}}</td><td>{{year}}</td><td>{{image}}</td></tr>
          {{/rows}}
      </table>
    </script>

#### Your `<script>` Execution

    <script type="text/javascript">
        document.addEventListener('DOMContentLoaded', function() { // IE6 doesn't do DOMContentLoaded
            Sheetsee.makeTable(gData, "#siteTable", 10)
            Sheetsee.initiateTableFilter(gData, "#tableFilter", "#siteTable")
        })
    </script>

To create another table, simply repeat the steps except for `initiateTableFilter()`

    <div id="secondTable"></div>
    <script id="secondTable"> // your table template here </script>
    <script>Sheetsee.makeTable(otherData, "#secondTable", 10)</script>

 Learn more about the things you can do with [mustache.js](http://mustache.github.io/).

### Sheetsee.makeTable(data, targetDiv)

You'll call this to make a table out of a **data** and tell it what **targetDiv** in the html to render it in (this should also be the same id as your script template id) and how many **rows** you want it to show per "page" of the table. If you don't include the pagination number, it will default to showing all rows on one page.

    Sheetsee.makeTable(gData, "#siteTable", 10)

## Table Filter/Search

If you want to have an input to allow users to search/filter the data in the table, you'll add this to your html:

    <input id="tableFilter" type="text" placeholder="filter by.."></input>
    <span class="clear button">Clear</span>
    <span class="noMatches">no matches</span>

### Sheetsee.initiateTableFilter(data, filterDiv, tableDiv)

You will then call this function to make that input live:

    Sheetsee.initiateTableFilter(gData, "#TableFilter", "#siteTable")
