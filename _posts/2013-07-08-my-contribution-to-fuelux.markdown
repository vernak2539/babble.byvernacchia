---
layout: post
title: "My first big open source contribution"
date: 2013-07-08 20:49:09
tags:
- open source
- FuelUX
- bootstrap
- javascript
summary: I ran into a problem yesterday when I started writing tests for a <a href="https://github.com/vernak2539/js-com-app-calulator" target="_blank">personal project</a>. I completed writing my tests, and then ran them in the browser. YES, they worked!! Hell yeah.
---

I **FINALLY** made my first open-source contribution that I am proud of. Well I'm proud of all my work, but this was the first "real" one for me.

At [ExactTarget][1] (where I work) we use [FuelUX][2] for our front-end components. This framework extends [Bootstrap][3], adding components that we use in our everyday development.

While I was working on a project something frustrated me. It frustrated me so much I knew I needed to do something. So I forked our repo and went to work.

###The Problem...

...is that Bootstrap's dropdown menus always display themselves below the clicked element. When something is positioned near the bottom of the page, or the dropdown is too big it will run off the page.

For [our datagrid][4] this is a **HUGE** problem (since most of them are stretched to the bottom of the page).

###My Solution

To combat this "problem" I created a javascript file that highjacks the click events on the elements with `data-toggle="dropdown"`. After highjacking the click, it makes a few calculations and will decide whether or not the dropdown should go above or below the clicked element.

When first starting, I used the window as the container for the dropdown (to base calculations off of). What happens when a container has an overflow that is not set to "visible"? Using the window as the container would not work in this case.

This script will cycle through all the clicked element's parents and choose the closest element whose CSS overflow value is not "visible" to be the container.

###How to enable

1. Include the JS and LESS files (gists below)
2. Add `data-direction` to the same element that has `data-toggle` and set it to a value below:
    * `up` = _will place dropdown above clicked element_
    * `down` = _will place dropdown below clicked element_
    * `auto` = _will intelligently decide where to place dropdown based on height of dropdown and distances above and below the clicked element_

I put the gists below. Maybe this will end up in Bootstrap one day. Or since Bootstrap 3 will be mobile first, maybe not. I guess we'll see.

{% gist 82c02b8fed1877368d7a/intelligent-dropdown.js %}

{% gist 82c02b8fed1877368d7a/intelligent-dropdown.less %}

[1]: http://www.exacttarget.com
[2]: https://github.com/ExactTarget/fuelux
[3]: https://github.com/twitter/bootstrap
[4]: http://exacttarget.github.io/fuelux/#datagrid