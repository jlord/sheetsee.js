# sheetsee

![sheetsee](https://raw.github.com/jllord/sheetsee-cache/master/img/sheetsee-03.png)

This module contains the basic functions for sorting and munipulating data for use in your [sheetsee.js](http://jlord.github.io/sheetsee.js) endeavors. Below is the portion of the [sheetsee.js](http://jlord.github.io/sheetsee.js) readme that covers the use of these functions. For the complete documentation including genera what is sheetsee, go [here](http://jlord.github.io/sheetsee.js)!

---

## Working With Your Data

Tabletop.js will return all of your data and it will be passed into your site as an _array of objects_ called **gData**. Sheetsee.js has functions built in to help you filter or use that data in other ways if you'd like.

### Sheetsee.getGroupCount(data, groupTerm)

This takes in your data, an _array of objects_, and searches for a _string_, **groupTerm**, in each piece of your **data** (formerly the cells of your spreadsheet). It returns the number of times it found the **groupTerm**.

    getGroupCount(gData, "cat")
    // returns 2

### Sheetsee.getColumnTotal(data, column)

Given your **data**, an _array of objects_ and a _string_ **column** header, this functions sums each cell in that column, so they best be numbers.

    getColumnTotal(gData, "cuddlability")
    // returns 11

### Sheetsee.getAveragefromColumn(data, column)

A really simple function that builds on `getColumnTotal()` by returning the average number in a **column** of numbers.

    getColumnAverage(gData, "cuddlability")
    // returns 1.8333333333333333

### Sheetsee.getMin(data, column)

This will return an _array_ of _object_ or _objects_ (if there is a tie) of the element with the lowest number value in the **column** you specify from your **data**.

    getMin(gData, "cuddlability")
    // returns {breed: "Fat", cuddlability: "0", hexcolor: "#CDCF83"...}, {breed: "Grey", cuddlability: "0", hexcolor: "#9C9B9A"...}, {breed: "Creepy", cuddlability: "0", hexcolor: "#918376"...}

### Sheetsee.getMax(data, column)

This will return an _array_ of _object_ or _objects_ (if there is a tie) of the element with the highest number value in the **column** you specify from your **data**.

    getMin(gData, "cuddlability")
    // returns {breed: "Teacup Maltese", cuddlability: "5", hexcolor: "#ECECEC", kind: "Dog", lat: "37.74832", long: "-122.402158", name: "Coco"...}

### Don't Forget JavaScript Math

Create variables that are the sums, differences, multiples and so forth of others. Lots of info on that [here on MDN](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Math).

    var profit09 = Sheetsee.getColumnTotal(gData, "2009")
    var profit10 = Sheetsee.getColumnTotal(gData, "2010")
    var difference = profit09 - profit10

#### What These Little Bits are Good For

You don't have to just create tables of your data. You can have other portions of your page that show things like, "The difference taco consumption between last week and this week is..." These are easy to create with javascirpt math functions and knowing a little bit more about [icanhas.js](http://icanhazjs.com/). View source on this page to see how I created "Most Cuddlable".

### Sheetsee.getMatches(data, filter, category)

Takes **data** as an _array of objects_, a _string_ you'd like to **filter** and a _string_ of the **category** you want it to look in (a column header from your spreadsheet).

    getMatches(gData, "dog", "kind")

Returns an _array of objects_ matching the category's filter.

    [{"name": "coco", "kind": "dog"...}, {"name": "wolfgang", "kind": "dog"...},{"name": "cooc", "kind": "dog"...} ]


### Sheetsee.getOccurance(data, category)

Takes **data** as an _array of objects_ and a _string_ for **category** (a column header from your spreadsheet) you want tally how often an element occured.

    getOccurance(gData, "kind")

Returns an object with keys and values for each variation of the category and its occurance.

    {"dog": 3, "cat": 3}

### Sheetsee.makeColorArrayOfObject(data, colors)

If you use `getOccurance()` and want to then chart that data with d3.js, you'll need to make it into an _array_ (instead of an object) and add colors back in (since the hexcolor column applies to the datapoints in your original dataset and not this new dataset).

This function takes in your data, as an _object_, and an _array_ of hexidecimal color strings which you define.

    var kinds = getOccurance(gData, "kind")
    var kindColors = ["#ff00ff", "#DCF13C"]

    var kindData = makeColorArrayOfObjects(mostPopBreeds, breedColors)

It will return an array of objects formatted to go directly into a d3 chart with the appropriate _units_ and _label keys_, like so:

    [{"label": "dog", "units": 2, "hexcolor": "#ff00ff"}, {"label": "cat", "units": 3, "hexcolor": "#DCF13C"}]

If you pass in an array of just one color it will repeat that color for all items. If you pass fewer colors than data elements it will repeat the sequences of colors for the remainder elements.

### Sheetsee.addUnitsLabels(arrayObj, oldLabel, oldUnits)

If you're using gData, the data directly from Tabletop, you'll need to format it before you use the d3 charts. You'll need to determine what part of your data you want to chart - what will be your label, what your charting, and what will be your units, how many of them are there (this should be a number).

    var gData =  [{"name": "coco", "kind": "dog", "cuddablity": 5}, {"name": "unagi", "kind": "cat", "cuddlability": 0}]

For istance, if from our original data above we want to chart the age of each cat, we'll use:

    Sheetsee.addUnitsLabels(gData, "name", "cuddlability")

Which will return an array, ready for the d3 charts:

    [{"label": "coco", "kind": "dog", "units": 5}, {"label": "unagi", "kind": "cat", "units": 0}]