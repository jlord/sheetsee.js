# Updates! Updates! 

 I'm building the changes to sheetsee.js. Through a Knight-Mozilla Open News Grant I'll be making lots of improvements and working with WBEZ to make a sheetssee awesome. Newness will include: stripping it of all CfA project-specific idiosyncrasies and making it really easy to understand and stand up, more out of the box vizualization options, sortable tables of data, data caching and documentation galore!

 This branch will remain for now and branch `twoOh` will be the working one I'll be making updates on. 

 Woo!

# Hi!

Sheetsee.js is a javascript library mashup that allows you to fill a website with content from a Google Spreadsheet. The web content and visualizations will update with every auto save by Google. That's cool. No pushing or uploading changes. 

It was created and is the intregal part of my Code for America project, [See Penny Work](http://www.seepennywork.in). This is a tool-kit for cities to easily visualize budgets and manage the data through a Google Spreadsheet (open data!). Check out the [illustrated readme](http://www.github.com/codeforamerica/wp-splost) for that project to get a sense of the potential. 

Because it was created for my CfA project, it's really customized to that project's needs  but I hope to be generalizing it soon. There is all kinds of stuff you can do once you have data in a Google Spreadsheet. I'm also using it on my own website [here](http://www.jlord.us/dashboard).

![diagram](https://raw.github.com/jllord/sheetsee.js/master/images/sheetsee_diagram.png)

### Set it and forget it. 

Once you've hooked up your spreadsheet and your website through sheetsee.js, all you'll need to interact with is the spreadsheet. Think of it as a super simple CMS. 

You can view a working sample of the bits in action at [jllord.github.com/sheetsee.js/](http://jllord.github.com/sheetsee.js/)

## The bits

It all starts with [tabletop.js](http://builtbybalance.com/Tabletop/). With that you can pile on any other library to style and visualize your data. 

You can feed [d3.js](http://d3js.org/) the data it needs to make charts. 

You can feed [leaflet.js](http://leaflet.cloudmade.com/) the data it needs to make maps.

Use [mustache.js](http://mustache.github.com/) to create templates for the data in your spreadsheet.


## More on how to set it up

For now, check out the [readme](http://www.github.com/codeforamerica/wp-splost) for my CfA project which talks about the set up. 

## License 

This repo is BSD Licensed, read more in [license.md](https://github.com/jllord/sheetsee.js/blob/master/license.md).

# Updates

### 4 Oct 2012

I may have done some funky merging, but things appear to be ok. 

### 25 Nov 2012 

I've made many changes in sheetsee.js while developing it's parent project (the CfA project mentioned in this readme) and haven't refelcted that in this separate repo - until now! Fresh update with sheetsee.js the way it is in the larger project.
