---
layout: post
title: "My Contribution to FuelUX"
date: 2013-07-08 20:49:09
tags:
- open-source
- FuelUX
- bootstrap
- javascript
- programming
summary: I finally made my first open-source contribution that I am proud of. Well not my first contribution and I'm proud of most of my work, but this was the first "real" one for me. <a href="https://twitter.com/ExactTarget" target="_blank">@ExactTarget</a> (where I work) we use FuelUX for our front-end components 
---

I finally made my first open source contribution that I am proud of. Well not my first contribution and I'm proud of most of my work, but this was the first "real" one for me.

At [ExactTarget][1] (where I work) we use [FuelUX][2] for our front-end components. FuelUX extends [Bootstrap][3], adding UI components that I/we use in our everyday development.

While I was working on a project something frustrated me. It frustrated me so much I knew I needed to do something. So I forked our repo and went to work.

###The Problem...

...is that Bootstrap's dropdown menus always display themselves below the clicked element. When an element is positioned near the bottom of the page or the dropdown is too big, it will run off the page.

For [our datagrid][4] this is a **HUGE** problem (since most of them are stretched to the bottom of the page).

###My Solution

To combat this "problem" I created a javascript file that highjacks the click events on the elements with `data-toggle="dropdown"`. After highjacking the click, it makes a few calculations and will decide where to place the dropdown.

My first working-draft made calculations using the `window` as the containing element. But, what happens when a containing element has an overflow value not set to "visible"? Using the window would not work in this case.

To fix this, I cycle through the clicked element's parents, choose the closest element whose CSS overflow value is not "visible," and set this to be the container which the calculations are based on.

###How to enable

1. Include the JS and LESS files (gists below)
2. Add `data-direction` to the same element that has `data-toggle` and set it to a value below:
    * `up` = _will place dropdown above clicked element_
    * `down` = _will place dropdown below clicked element (falls back to default bootstrap behavior)_
    * `auto` = _will intelligently decide where to place dropdown based on height of dropdown and distances above and below the clicked element_

I put the gists below, or you could check it out the [FuelUX repo][2] _(2.4.0-wip branch)_. 

Maybe this will end up in Bootstrap one day. Or, maybe not since Bootstrap 3 will be mobile first. I guess we'll see.

__NOTE:__ If the clicked element's parent's position is set to _static_ this will _ALTER_ the styles. This is because my positioning won't work correctly in this situation so I overwrite it to _relative_.

__NOTE 2:__ This code could probably be cleaned up a little more, but that's for a later time.

###Gists

{% gist 82c02b8fed1877368d7a/intelligent-dropdown.js %}

{% gist 82c02b8fed1877368d7a/intelligent-dropdown.less %}

[1]: http://www.exacttarget.com
[2]: https://github.com/ExactTarget/fuelux
[3]: https://github.com/twitter/bootstrap
[4]: http://exacttarget.github.io/fuelux/#datagrid
[5]: https://github.com/ExactTarget/fuelux/tree/2.4.0-wip