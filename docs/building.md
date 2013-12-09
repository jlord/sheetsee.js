# Just Right

You can customize your sheetsee build with just the parts you want to use. If you want to just use the full version, you can grab it here at [github.com/jlord/sheetsee.js]().

**To build your sheetsee you'll need [Node.js](http://www.nodejs.org) and [NPM](http://www.npmjs.org) on your computer and a command line**

## Install sheetsee from NPM
The sheetsee module contains the basic sorting, organizing data functions and the script for building on the other modules. Create a folder for you new project and `cd` into it. Then install `sheetsee`.

```bash
cd myNewProject
npm install sheetsee
```

Here are the options for the different modules. If you want save the generated file as _sheetsee.js_ then add the `save` option.

- `-m` or `-maps` for maps
- `-t` or `-tables` for tables
- `-c` or `-charts` for charts
- `--save` to write out the file*

_* defaults to standardout on your console which you can_ `| pbcopy`

So for instance, `sheetsee -m -t --save` will build you a sheetsee with the basic **data** functions, the **map** and **tables** sections built in and save it as a file named **sheetsee.js**.
