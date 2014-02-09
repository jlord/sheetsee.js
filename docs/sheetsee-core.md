# Sheetsee-core

This is the core module in sheetsee and is included in all builds. It contains the functions for building your custom file as well as the basic data manipulation functions.

## Working With Your Data

Tabletop.js will fetch the data from your spreadsheet and return it as an _array of objects_. Sheetsee.js has functions built in to help you filter or reorganize the data if you'd like.

### Sheetsee.getGroupCount(data, groupTerm)

This takes in your data, an _array of objects_, and searches for a _string_, **groupTerm**, in each piece of your **data** (formerly the cells of your spreadsheet). It returns the number of times it found the **groupTerm**.

```JAVASCRIPT
getGroupCount(data, "cat")
// returns a number
```

### Sheetsee.getColumnTotal(data, column)

Given your **data**, an _array of objects_, and a _string_ **column** header, this functions sums each cell in that column(so this collumn you mention best have numbers).

```JAVASCRIPT
getColumnTotal(data, "cuddlability")
// returns number
```

### Sheetsee.getAveragefromColumn(data, column)

A really simple function that builds on `getColumnTotal()` by returning the average number in a **column** of numbers.

```JAVASCRIPT
getColumnAverage(data, "cuddlability")
// returns number
```

### Sheetsee.getMin(data, column)

This will return an _array_ of _object_ or _objects_ (if there is a tie) of the element with the lowest _number_ value in the **column** you specify from your **data**.

```JAVASCRIPT
getMin(data, "cuddlability")
// returns array
```

### Sheetsee.getMax(data, column)

This will return an _array_ of _object_ or _objects_ (if there is a tie) of the element with the highest _number_ value in the **column** you specify from your **data**.

```JAVASCRIPT
getMin(data, "cuddlability")
// returns array
```

### Don't Forget JavaScript Math

Create variables that are the sums, differences, multiples and so forth of others. Lots of info on that [here on MDN](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math).

```JAVASCRIPT
var profit09 = Sheetsee.getColumnTotal(data, "2009")
var profit10 = Sheetsee.getColumnTotal(data, "2010")
var difference = profit09 - profit10
```

#### What These Little Bits are Good For

You don't have to just create tables of your data. You can have other portions of your page that show things like, "The difference taco consumption between last week and this week is..." These are easy to create with JavaScript math functions and knowing a little bit more about [icanhaz.js](http://icanhazjs.com/).

### Sheetsee.getMatches(data, filter, category)

Takes **data** as an _array of objects_, a _string_ you'd like to **filter** and a _string_ of the **category** you want it to look in (a column header from your spreadsheet).

```JAVASCRIPT
getMatches(data, "dog", "kind")
```

Returns an _array of objects_ matching the category's filter.

```JAVASCRIPT
[{"name": "coco", "kind": "dog"...}, {"name": "wolfgang", "kind": "dog"...},{"name": "cooc", "kind": "dog"...} ]
```

### Sheetsee.getOccurance(data, category)

Takes **data** as an _array of objects_ and a _string_ for **category** (a column header from your spreadsheet) you want tally how often an element occured.

```JAVASCRIPT
getOccurance(data, "kind")
```

Returns an object with keys and values for each variation of the category and its occurance.

```JAVASCRIPT
{"dog": 3, "cat": 3}
```

### Sheetsee.makeColorArrayOfObject(data, colors)

If you use `getOccurance()` and want to then chart that data with d3.js, you'll need to make it into an _array_ (instead of an object) and add colors back in (since the hexcolor column applies to the datapoints in your original dataset and not this new dataset).

This function takes in your data, as an _object_, and an _array_ of hexidecimal color strings which you define.

```JAVASCRIPT
var kinds = getOccurance(data, "kind")
var kindColors = ["#ff00ff", "#DCF13C"]

var kindData = makeColorArrayOfObjects(mostPopBreeds, breedColors)
```

It will return an array of objects formatted to go directly into a d3 chart with the appropriate _units_ and _label keys_, like so:

```JAVASCRIPT
[{"label": "dog", "units": 2, "hexcolor": "#ff00ff"}, {"label": "cat", "units": 3, "hexcolor": "#DCF13C"}]
```

If you pass in an array of just one color it will repeat that color for all items. If you pass fewer colors than data elements it will repeat the sequences of colors for the remainder elements.

### Sheetsee.addUnitsLabels(arrayObj, oldLabel, oldUnits)

If you're using data, the data directly from Tabletop, you'll need to format it before you use the d3 charts. You'll need to determine what part of your data you want to chart - what will be your label, what your charting, and what will be your units, how many of them are there (this should be a number).

```JAVASCRIPT
var data =  [{"name": "coco", "kind": "dog", "cuddablity": 5}, {"name": "unagi", "kind": "cat", "cuddlability": 0}]
```

For istance, if from our original data above we want to chart the age of each cat, we'll use:

```JAVASCRIPT
Sheetsee.addUnitsLabels(data, "name", "cuddlability")
```

Which will return an array, ready for the d3 charts:

```JAVASCRIPT
[{"label": "coco", "kind": "dog", "units": 5}, {"label": "unagi", "kind": "cat", "units": 0}]
```
