# Fork-n-Go

A Fork-n-Go project is a project on GitHub that in a few clicks and starting with a fork, gives another user a live website that they control with an easy to swap-for-your-own Google Spreadsheet database.

To awesome things that make this possible: **Forking** and [**GitHub Pages**](http://pages.github.com).

On GitHub, a **fork** is a full copy of a repository, on your account, that you can manage and edit. It's done with the click of a button.

**GitHub Pages** is the hosting service that GitHub provides free to all users, organizations _and_ repositories. This means everyone of these entities or project can have it's own website at a predictable domain:

- **organizations**: orgname.github.io
- **users**: username.github.io
- **repositories**: username.github.io/repositoryname

To have a website for a repository all you need is a branch named `gh-pages`. GitHub will then look in that branch for web files and serve them up at the address.

What all of this means is that Sheetsee.js projects, hosted on gh-pages branches on GitHub, can easily be forked and connected to another spreadsheet giving another user a live website of their own really easily.

A Fork-n-Go example from my [blog post](http://jlord.us/fork-n-go/) on the topic:

### Hack Spots Fork-n-Go
 
I made this website to collect hack spots all over the world from friends and friends of friends (the spreadsheet is wide open, so you can add some, too!). It’s using sheetsee to power the table, map and other elements of the page. Its source is in this repo, with just a gh-pages branch. To create an instance of this site for yourself all you need to do:

- Create a Google spreadsheet with the same headers (just copy and paste header row from the original). Click File > Publish to Web, then Start Publishing.
- Fork the original repository.
- Edit the HTML file directly on GitHub.com to replace the original spreadsheet’s unique key with your spreadsheet’s key (found in your spreadsheet’s URL).
Commit your change.

Now you have the same site connected to a spreadsheet that you manage — it’s live and can be found at yourGitHubName.github.io/theReposName.

![forkcommit](http://jlord.s3.amazonaws.com/wp-content/uploads/forkcommit1.png)