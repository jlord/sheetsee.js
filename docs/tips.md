# Tips

A few things to think about beyond maps and tables.

## Mustache

You can use templates for more than just tables. Use them to create lists `ol`, `ul`; array of images... You'll need a placeholder `<div>` in your HTML, a `<script>` for your template. In your Tabletop.js callback use Mustache to pass your data into the template and add it to the DOM.

_HTML_

```HTML
<div id="divID"></div>
```

_Template_

```JavaScript
<script id="divID_template" type="text/html">
  {{#rows}}
    <div><img class="photo" src="{{some-variable}}"></div>
  {{/rows}}
</script>
```

_Script_

```JavaScript
<script type="text/html">
  document.addEventListener('DOMContentLoaded', function() {
    var URL = 'YOURSPREADSHEETSKEYHERE'
    Tabletop.init({key: URL, callback: showData, simpleSheet: true})
  })

  function showData (data) {
    var template = document.querySelector('divID_template').innerHTML
    var html = Sheetsee.Mustache.render(template, {'rows': data})
    document.getElementByID('divID').innerHTML = html
  }
</script>
```

_non-table example_

![lib](http://jlord.s3.amazonaws.com/wp-content/uploads/lending-ss.png)

## Query Strings

If your spreadsheet contains address information, using templates (Sheetsee uses Mustache.js), you can embed those elements into a query string (aka a search URL) like Google Maps URL or Yelp. If you search for a location in Google Maps, you'll notice it creates a URL for that search.

So, if you have information in your spreadsheet that would go inside a query string, make a template for inserting them into a link on your page.

The basic elements are: a spreadsheet with address info + HTML template to create the query string.

The Sheetsee [Hack-Spots](jlord.github.io/hack-spots) is an example that does such a thing. Here is the spreadsheet, with address information:

![img](http://jlord.s3.amazonaws.com/wp-content/uploads/Screen-Shot-2013-09-15-at-6.49.19-PM.png)

In the HTML template for the table on the [Hack-Spots](jlord.github.io/hack-spots) page, the button’s links look like this:

```HTML
<a class="button" href="https://maps.google.com/maps?q={{address}},{{city}},{{state}}" target="_blank">View in Google Maps</a>
<a class="button" href="http://www.yelp.com/search?find_desc={{name}}&find_loc={{city}},{{state}}" target="_blank">Find on Yelp</a>
```

Above we're inserting the address, city, and state details from the spreadsheet into the structure of a query string for Google maps and Yelp. You can figure out the query string of a service by just using it (type in an address in Google Maps) and looking at the resulting URL.

With a some CSS and such, the resulting website has a table with the hack spots and a button for viewing in Google Maps or Yelp:

![img](http://jlord.s3.amazonaws.com/wp-content/uploads/Screen-Shot-2013-09-15-at-6.43.54-PM.png)

When the page builds, it creates the correct link for each row. When someone clicks on the buttons it takes them directly to the Google Map search result for that address. BAM!

## IFTTT

[Ifttt.com](http://www.ifttt.com) offers lots of options sending data from your actions (Twitter, Instagram, GitHub, Pocket...) to Google Spreadsheets.

## Row Numbers

When Tabletop.js returns your spreadsheet data, it adds a key/value of `rownumber`. This is great to use when you need to uniquely match or find a row in your data.

## Images

Your spreadsheet can contain URLs to images which you can use to display the images on the page you build. Your template would look something like this:

```HTML
<img src='{{imgurl}}'/>
```

## Data as Classes

You can use your data as classes to style with CSS. For instance, if you had data about recipes and a column called 'Taste' that contained either 'savory' or 'sweet'. In a table of the recipes you could do something like:

```HTML
<tr><td class="{{taste}}"></tr>
```

Then in your CSS:

```CSS
td .savory {}
td .sweet {}
```
