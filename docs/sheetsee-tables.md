# Sheetsee-tables

_[View Demo](/demos/demo-table.html)_

With this module you can create tables of your data that are sortable, searchable and paginate-able.

You'll need a placeholder `<div>` in your html, a `<script>` mustache template and a `<script>` that initiates the table.

## Your HTML Placeholder `<div>`

This is as simple as an empty `<div>` with an id. This id should match the script template id in the next section.

```HTML
<div id="siteTable"></div>
```

## Your `<script>` Template

Your template is the mockup of what you'd like your table to look like and what content it should show. The style is up to you!

### Sorting

If you want users to be able to click on headers and sort that column, your template must include table headers with the class `tHeader`.

*Example*

_The variables inside the {{}} must match the column headers in your spreadsheet. They should be lowercase and remember spaces are omitted, so "Place Name" will become "placename"._

```HTML
<script id="siteTable" type="text/html">
    <table>
    <tr><th class="tHeader">City</th><th class="tHeader">Place Name</th><th class="tHeader">Year</th><th class="tHeader">Image</th></tr>
      {{#rows}}
        <tr><td>{{city}}</td><td>{{placename}}</td><td>{{year}}</td><td>{{image}}</td></tr>
      {{/rows}}
  </table>
</script>
```

#### Your `<script>` Execution

```javascript
<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function() { // IE6 doesn't do DOMContentLoaded
        Sheetsee.makeTable(gData, "#siteTable", 10)
        Sheetsee.initiateTableFilter(gData, "#tableFilter", "#siteTable")
    })
</script>
```

To create another table, simply repeat the steps except for `initiateTableFilter()`

```HTML
<div id="secondTable"></div>
<script id="secondTable"> // your table template here </script>
<script>Sheetsee.makeTable(otherData, "#secondTable", 10)</script>
```

Learn more about the things you can do with [mustache.js](http://mustache.github.io/).

### Sheetsee.makeTable(data, targetDiv, pagination)

You'll call this to make a table out of a **data** and tell it what **targetDiv** in the html to render it in (this should also be the same id as your script template id) and how many **rows** you want it to show per "page" of the table. If you don't include the pagination number, it will default to showing all rows on one page.

```javascript
Sheetsee.makeTable(gData, "#siteTable", 10)
```

#### Pagination

If you do not put in a number for pagination, by default it will show all of the data at once. With pagination, at the bottom of your table it will add this for naviagtion, which you can style in your CSS:

HTML:

```HTML
<div id='Pagination' currentPage class='table-pagination'>
  Showing page currentPage of totalPages
  <a class='pagination-pre'>Previous</a><a class='pagination-next'>Next</a>
</div>
```

CSS:

```CSS
<style>
  body {font-family: Helvetica Neue; Helvetica, Arial, sans-serif; }
  #Pagination {background: #eee;}
  .pagination-next, .pagination-pre {cursor: hand;}
  .no-pag {color: #acacac;}
</style>
```

## Table Filter/Search

If you want to have an input to allow users to search/filter the data in the table, you'll add an input to your HTML. Give it an ide and if you want, placeholder text:

```javascript
<input id="tableFilter" type="text" placeholder="filter by.."></input>
```

### Sheetsee.initiateTableFilter(data, filterDiv, tableDiv)

You will then call this function to make that input live:

```javascript
Sheetsee.initiateTableFilter(gData, "#TableFilter", "#siteTable")
```

It will connect that input to your data as well as inject this HTML for a button, which you can style yourself in your CSS:

```HTML
<span class="clear button">Clear</span>
<span class="noMatches">no matches</span>
```
