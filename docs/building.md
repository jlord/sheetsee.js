# Right-sizing

You can customize your sheetsee.js build with just the parts you want to use. If you want to just use the full version, you can grab it here at [github.com/jlord/sheetsee.js](https://github.com/jlord/sheetsee.js/blob/master/js/sheetsee.js).

All bundle comes with [mapbox.js]() and [handlebars.js]() (since both are available on [NPM](http://www.npmjs.org)). Additionally you'll need to also include [tabletop.js](https://github.com/jsoma/tabletop) and [jQuery](http://www.jquery.com) in your HTML head like so:

```HTML
<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.0.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.1.0/tabletop.min.js"></script>
```

**To build your Sheetsee you'll need [Node.js](http://www.nodejs.org) and [NPM](http://www.npmjs.org) (the latter comes with the former in most installs) on your computer and a command line.**

#### Get Node/NPM

Download Node.js from [nodejs.org/download](http://nodejs.org/download). For most users you can just download the Mac _.pkg_ or Windows _.msi_. Follow the install instructions, both include NPM. Once they're installed, proceed:

## Install `sheetsee` from NPM
The `sheetsee` (with no '.js') module is the tool for building custom Sheetsee.js builds. Install `sheetsee` globally and then run it within the folder of your soon-to-be sheetsee.js project.

_Install globally_

```bash
npm install -g sheetsee
```

_Run from within a project folder_

```bash
sheetsee [options]
```

Here are the options for the different modules. If you want save the generated file as _sheetsee.js_ then add the `--save` option.

- `-m` or `-maps` for maps
- `-t` or `-tables` for tables
- `-c` or `-charts` for charts
- `--save` to write out the file*

_* otherwise, defaults to standardout on your console which you can_ `| pbcopy`

So for instance, `sheetsee -m -t --save` will build you a Sheetsee.js with the basic **data** functions, the **map** and **tables** sections built in and save it as a file named **sheetsee.js**. Running `sheetsee -m -t | pbcopy` will save the output to your clipboard.
