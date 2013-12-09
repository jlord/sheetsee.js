You can customize your sheetsee build with just the parts you want to use. If you want to just use the full version, you can grab it here in [js/sheetsee.js]().

**To build your sheetsee you'll need [Node.js]() on your computer and a command line**

## Install sheetsee from NPM
The sheetsee module contains the basic sorting, organizing data functions and the script for building on the other modules. Create a folder for you new project and `cd` into it. Then install `sheetsee`.

```cd myNewProject```
```npm install sheetsee```

Once you've decided which modules you want run this command `sheetsee ` adding:

- `-m` or `-maps` for maps
- `-t` or `-tables` for tables
- `-c` or `-charts` for charts
- `--save` to write out the file*

* _defaults to standardout on your console which you can `| pbcopy`

So for instance, `sheetsee -m -t --save` will build you a sheetsee with the map and tables sections built in and save it as a file named sheetsee.js.
