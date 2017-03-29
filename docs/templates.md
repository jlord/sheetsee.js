# Templates

Here are partially set up projects to get you going!

## Glitch

<img src="../img/glitch.png" style="width: 100px;">

The [spreadsheet.glitch.me](https://spreadsheet.glitch.me) site will give you an endpoint to use that will return your spreadsheet to you as JSON. The [sheetsee.glitch.me](https://sheetsee.glitch.me) site provides template to get started with Sheetsee; it's already set up with a server so that your data is backed up.

## Fork-n-Go

<img src="https://raw.githubusercontent.com/jlord/forkngo/gh-pages/badges/sky.png" style="width: 200px;">

A Fork-n-Go project is a project on GitHub that in a few clicks, starting with a fork, gives another user a live website that they control with an easy to swap-for-your-own Google Spreadsheet database.

Two awesome things that make this possible: **Forking**, the tool on GitHub that allows you to copy a public repository onto your account, and [**GitHub Pages**](http://pages.github.com), GitHub's free web hosting service for every repository, account and organization.

I've built a whole other website on the idea with lots of examples: [jlord.github.io/forkngo](http://jlord.github.io/forkngo)

### How

To have a website for a repository hosted by GitHub Pages all you need is to have webfiles uploaded and to tell GitHub the name of the branch you want it to host (in your repository's settings).

So Sheetsee.js projects, hosted on GitHub, can easily be forked and connected to another spreadsheet giving another user a live website of their own—with data they control—really easily.

### Example

A Fork-n-Go example from my [blog post](http://jlord.github.io/blog/fork-n-go) on the topic:

#### Hack Spots Fork-n-Go

I made this website to collect hack spots all over the world from friends and friends of friends (the spreadsheet is wide open, so you can add some, too!). It’s using sheetsee to power the table, map and other elements of the page. Its source is in this repo, with just a gh-pages branch. To create an instance of this site for yourself all you need to do:

- Create a Google spreadsheet with the same headers (just copy and paste header row from the original). Click File > Publish to Web, then Start Publishing.
- Fork the original repository.
- Edit the HTML file directly on GitHub.com to replace the original spreadsheet’s unique key with your spreadsheet’s key (found in your spreadsheet’s URL).
Commit your change.

Now you have the same site connected to a spreadsheet that you manage — it’s live and can be found at yourGitHubName.github.io/theReposName.

![forkcommit](http://jlord.s3.amazonaws.com/wp-content/uploads/forkcommit1.png)
