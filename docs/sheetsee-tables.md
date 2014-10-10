# Sheetsee-tables

With this module you can create tables of your data that are sortable, searchable and paginate-able.

You'll need a placeholder `<div>` in your html, a `<script>` mustache template and a `<script>` that initiates the table.

## Your HTML Placeholder

This is as simple as an empty `<div>` with an id.

## Your Template

Your template is the mockup of what you'd like your table to look like and what content it should show. The style is up to you! It is an HTML template inside of `<script>` tags. **The id of the template should be the same as the HTML placeholder it corresponds to but with "_template" on the end. Unless you're using one template, for multiple divs, in which case, you'll pass in the template name in the options of `makeTable()`**

### Sorting

If you want users to be able to click on headers and sort that column, your template must include table headers with the class `tHeader`.

You can then style `.tHeader` in your CSS to make them look how you want.

## Your Script

You'll want to set your table options and pass them into `Sheetsee.makeTable()`. If you want to add a search/filter, pass your options into `Sheetsee.initiateTableFilter()`

## Funtions

### Sheetsee.makeTable(tableOptions)

You pass in an object containing:

- `data` your data array
- `pagination` how many rows displayed at one time, defaults to all
- `tableDiv` the <div> placeholder in your HTML
- `filterDiv` the `<div>` containing your `<input>` filter if using search
- `templateID` if you are reusing a template, use it's name here (if you don't include this, it will assume it matches `tableDiv` + `_template`)

```javascript
var tableOptions = {
                    "data": gData,
                    "pagination": 10,
                    "tableDiv": "#fullTable",
                    "filterDiv": "#fullTableFilter",
                    "templateID": "fullTable"
                    }
Sheetsee.makeTable(tableOptions)
```

#### Pagination

If you do not put in a number for pagination, by default it will show all of the data at once. With pagination, HTML will be added at the bottom of your table for naviagtion, which you can style in your CSS:

_HTML_

```HTML
<div id='Pagination' currentPage class='table-pagination'>
  Showing page {{currentPage}} of {{totalPages}}
  <a class='pagination-pre'>Previous</a><a class='pagination-next'>Next</a>
</div>
```

_CSS_

```CSS
#Pagination {background: #eee;}
.pagination-next, .pagination-pre {cursor: pointer;}
.no-pag {color: #acacac;}
```

## Table Filter/Search

If you want to have an input to allow users to search/filter the data in the table, you'll add an input to your HTML. Give it an id and if you want, placeholder text:

```javascript
<input id="tableFilter" type="text" placeholder="filter by.."></input>
```

### Sheetsee.initiateTableFilter(tableOptions)

You will then call this function with your `tableOptions` to make that input live and connected to your table:

```javascript
Sheetsee.initiateTableFilter(tableOptions)
```

It will connect that input to your data as well as inject this HTML for a button, which you can style yourself in your CSS:


```HTML
<span class="clear button">Clear</span>
<span class="noMatches">no matches</span>
```

## Example

_HTML_

```HTML
<div id="siteTable"></div>
<input id="siteTableFilter" type="text"></input>
```

_Template_

```JavaScript
<script id="tableTemplate" type="text/html">
    <table>
    <tr><th class="tHeader">City</th><th class="tHeader">Place Name</th><th class="tHeader">Year</th><th class="tHeader">Image</th></tr>
      {{#rows}}
        <tr><td>{{city}}</td><td>{{placename}}</td><td>{{year}}</td><td>{{image}}</td></tr>
      {{/rows}}
  </table>
</script>
```

_JavaScript_

```javascript
<script type="text/javascript">
    document.addEventListener('DOMContentLoaded', function() {
      var tableOptions = {
                          "data": gData,
                          "pagination": 10,
                          "tableDiv": "#siteTable",
                          "filterDiv": "#siteTableFilter",
                          "templateID": "tableTemplate"
                          }
      Sheetsee.makeTable(tableOptions)
      Sheetsee.initiateTableFilter(tableOptions)
    })
</script>
```

To create another table, simply repeat the steps above (abreviated here below).

_HTML_
```HTML
<div id="secondTable"></div>
<input id="secondFilter" type="text"></input>
```
_Template_

```JavaScript
<script text="text/javascript" id="secondTable">
  // Template here
</script>
```

_JavaScript_

```JavaScript
<script>
  var secondTableOpts = {} // the options
  Sheetsee.makeTable(secondTableOpts)
  Sheetsee.initiateTableFilter(secondTableOpts)
</script>
```

Learn more about the things you can do with [ICanHaz.js](http://icanhazjs.com).

_[View Demo](/demos/demo-table.html)_
