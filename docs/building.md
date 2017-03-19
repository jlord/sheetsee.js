# Right-sizing

You can customize your Sheetsee build with just the parts you want to use, for example to only include the mapping module or only the tables module. If you want to just use the full version, you can grab it here at [github.com/jlord/sheetsee.js](https://github.com/jlord/sheetsee.js/blob/master/js/sheetsee.js).

All builds come with [Mustache.js](https://mustache.github.io) and [Leaflet.js](http://leafletjs.com). Additionally, you'll need to link to [Tabletop.js](https://github.com/jsoma/tabletop) your HTML head like so:

```HTML
<script src="https://cdnjs.cloudflare.com/ajax/libs/tabletop.js/1.5.1/tabletop.min.js"></script>
<script src="js/sheetsee.js"></script>
```

**To build a custom Sheetsee you'll need [Node.js](http://www.nodejs.org) on your computer familiarity with the command line.**

Download Node.js from [nodejs.org/download](http://nodejs.org/download). For most users you can just download the Mac _.pkg_ or Windows _.msi_. Follow the install instructions; both include npm. Then install `sheetsee`.

## Install `sheetsee` from npm
The `sheetsee` (with no '.js') module is the tool for building custom Sheetsee builds. Install `sheetsee` globally and then run it within the folder of your soon-to-be Sheetsee project.

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
- `--save` to write out the file*

_* otherwise, defaults to standard out on your console which you can_ `| pbcopy`

So for instance, `sheetsee -m --save` will build you a Sheetsee with the basic **data** functions and the **map** section, leaving out the tables section. It will save it as a file named '**sheetsee.js**'. Running `sheetsee -m | pbcopy` will save the output to your clipboard.
